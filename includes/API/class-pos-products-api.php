<?php
/**
 * Products REST API Controller
 *
 * @package StorePOS\API
 */

namespace StorePOS\API;

use StorePOS\Helpers\Utils;

class ProductsAPI extends RESTController {

    /**
     * Register routes
     */
    public function register_routes() {
        // Get products
        register_rest_route($this->namespace, '/products', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_products'],
            'permission_callback' => [$this, 'check_permission'],
            'args' => [
                'search' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'category' => [
                    'type' => 'integer',
                ],
                'per_page' => [
                    'type' => 'integer',
                    'default' => 20,
                ],
                'page' => [
                    'type' => 'integer',
                    'default' => 1,
                ],
            ],
        ]);

        // Get single product
        register_rest_route($this->namespace, '/products/(?P<id>[\d]+)', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_product'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Search by barcode
        register_rest_route($this->namespace, '/products/barcode/(?P<barcode>[a-zA-Z0-9-_]+)', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_product_by_barcode'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Get categories
        register_rest_route($this->namespace, '/products/categories', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_categories'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Update product stock
        register_rest_route($this->namespace, '/products/(?P<id>[\d]+)/stock', [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_stock'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'manage_pos');
            },
        ]);
    }

    /**
     * Get products
     */
    public function get_products($request) {
        $search = $request->get_param('search');
        $category = $request->get_param('category');
        $per_page = $request->get_param('per_page') ?: 20;
        $page = $request->get_param('page') ?: 1;

        $args = [
            'post_type' => 'product',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'post_status' => 'publish',
            'orderby' => 'title',
            'order' => 'ASC',
        ];

        if ($search) {
            $args['s'] = $search;
        }

        if ($category) {
            $args['tax_query'] = [
                [
                    'taxonomy' => 'product_cat',
                    'field' => 'term_id',
                    'terms' => $category,
                ]
            ];
        }

        $query = new \WP_Query($args);
        $products = [];

        foreach ($query->posts as $post) {
            $product = wc_get_product($post->ID);
            if ($product) {
                $products[] = $this->format_product($product);
            }
        }

        return $this->success_response([
            'products' => $products,
            'total' => $query->found_posts,
            'pages' => $query->max_num_pages,
            'current_page' => $page,
        ]);
    }

    /**
     * Get single product
     */
    public function get_product($request) {
        $id = $request->get_param('id');
        $product = wc_get_product($id);

        if (!$product) {
            return $this->error_response(__('Product not found.', 'store-pos'), 'not_found', 404);
        }

        return $this->success_response($this->format_product($product));
    }

    /**
     * Get product by barcode
     */
    public function get_product_by_barcode($request) {
        $barcode = $request->get_param('barcode');
        $barcode_field = get_option('store_pos_barcode_field', '_sku');

        if ($barcode_field === '_sku') {
            $product_id = wc_get_product_id_by_sku($barcode);
        } else {
            global $wpdb;
            $product_id = $wpdb->get_var($wpdb->prepare(
                "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = %s AND meta_value = %s LIMIT 1",
                $barcode_field,
                $barcode
            ));
        }

        if (!$product_id) {
            return $this->error_response(__('Product not found.', 'store-pos'), 'not_found', 404);
        }

        $product = wc_get_product($product_id);
        if (!$product) {
            return $this->error_response(__('Product not found.', 'store-pos'), 'not_found', 404);
        }

        return $this->success_response($this->format_product($product));
    }

    /**
     * Get product categories
     */
    public function get_categories($request) {
        $categories = get_terms([
            'taxonomy' => 'product_cat',
            'hide_empty' => false,
            'orderby' => 'name',
        ]);

        if (is_wp_error($categories)) {
            return $this->error_response(__('Failed to get categories.', 'store-pos'));
        }

        $formatted_categories = [];
        foreach ($categories as $category) {
            $formatted_categories[] = [
                'id' => $category->term_id,
                'name' => $category->name,
                'slug' => $category->slug,
                'parent' => $category->parent,
                'count' => $category->count,
            ];
        }

        return $this->success_response($formatted_categories);
    }

    /**
     * Update product stock
     */
    public function update_stock($request) {
        $id = $request->get_param('id');
        $quantity = $request->get_param('quantity');
        $operation = $request->get_param('operation') ?: 'set'; // set, increase, decrease

        $product = wc_get_product($id);
        if (!$product) {
            return $this->error_response(__('Product not found.', 'store-pos'), 'not_found', 404);
        }

        if (!$product->managing_stock()) {
            return $this->error_response(__('Stock management is not enabled for this product.', 'store-pos'));
        }

        $current_stock = $product->get_stock_quantity();

        switch ($operation) {
            case 'increase':
                $new_stock = $current_stock + $quantity;
                break;
            case 'decrease':
                $new_stock = $current_stock - $quantity;
                break;
            default:
                $new_stock = $quantity;
        }

        $product->set_stock_quantity($new_stock);
        $product->save();

        return $this->success_response([
            'product_id' => $id,
            'previous_stock' => $current_stock,
            'new_stock' => $new_stock,
        ], __('Stock updated successfully.', 'store-pos'));
    }

    /**
     * Format product for response
     */
    private function format_product($product) {
        $data = [
            'id' => $product->get_id(),
            'name' => $product->get_name(),
            'slug' => $product->get_slug(),
            'type' => $product->get_type(),
            'status' => $product->get_status(),
            'price' => $product->get_price(),
            'regular_price' => $product->get_regular_price(),
            'sale_price' => $product->get_sale_price(),
            'price_html' => $product->get_price_html(),
            'sku' => $product->get_sku(),
            'barcode' => Utils::get_product_barcode($product->get_id()),
            'stock_status' => $product->get_stock_status(),
            'stock_quantity' => $product->get_stock_quantity(),
            'manage_stock' => $product->managing_stock(),
            'image' => wp_get_attachment_image_url($product->get_image_id(), 'thumbnail'),
            'categories' => $this->get_product_categories($product->get_id()),
            'tax_class' => $product->get_tax_class(),
            'tax_status' => $product->get_tax_status(),
        ];

        // Add variations for variable products
        if ($product->is_type('variable')) {
            $data['variations'] = $this->get_product_variations($product);
        }

        return $data;
    }

    /**
     * Get product categories
     */
    private function get_product_categories($product_id) {
        $terms = get_the_terms($product_id, 'product_cat');
        if (!$terms || is_wp_error($terms)) {
            return [];
        }

        $categories = [];
        foreach ($terms as $term) {
            $categories[] = [
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug,
            ];
        }

        return $categories;
    }

    /**
     * Get product variations
     */
    private function get_product_variations($product) {
        $variations = [];
        $variation_ids = $product->get_children();

        foreach ($variation_ids as $variation_id) {
            $variation = wc_get_product($variation_id);
            if ($variation) {
                $variations[] = [
                    'id' => $variation->get_id(),
                    'sku' => $variation->get_sku(),
                    'price' => $variation->get_price(),
                    'regular_price' => $variation->get_regular_price(),
                    'sale_price' => $variation->get_sale_price(),
                    'stock_quantity' => $variation->get_stock_quantity(),
                    'stock_status' => $variation->get_stock_status(),
                    'attributes' => $variation->get_attributes(),
                    'image' => wp_get_attachment_image_url($variation->get_image_id(), 'thumbnail'),
                ];
            }
        }

        return $variations;
    }

    /**
     * Prepare item for response
     */
    public function prepare_item_for_response($item, $request) {
        return rest_ensure_response($item);
    }
}
