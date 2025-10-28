<?php
/**
 * Coupons REST API Controller
 *
 * @package StorePOS\API
 */

namespace StorePOS\API;

class CouponsAPI extends RESTController {

    /**
     * Register routes
     */
    public function register_routes() {
        // Validate coupon
        register_rest_route($this->namespace, '/coupons/validate', [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'validate_coupon'],
            'permission_callback' => [$this, 'check_permission'],
            'args' => [
                'code' => [
                    'type' => 'string',
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'cart_total' => [
                    'type' => 'number',
                ],
            ],
        ]);

        // Get all coupons
        register_rest_route($this->namespace, '/coupons', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_coupons'],
            'permission_callback' => [$this, 'check_permission'],
        ]);
    }

    /**
     * Validate coupon
     */
    public function validate_coupon($request) {
        $code = $request->get_param('code');
        $cart_total = $request->get_param('cart_total') ?: 0;

        $coupon = new \WC_Coupon($code);

        if (!$coupon->get_id()) {
            return $this->error_response(__('Coupon not found.', 'store-pos'), 'invalid_coupon', 404);
        }

        // Check if coupon is valid
        $discounts = new \WC_Discounts();
        $valid = $discounts->is_coupon_valid($coupon);

        if (is_wp_error($valid)) {
            return $this->error_response($valid->get_error_message(), 'invalid_coupon');
        }

        return $this->success_response([
            'code' => $coupon->get_code(),
            'type' => $coupon->get_discount_type(),
            'amount' => $coupon->get_amount(),
            'description' => $coupon->get_description(),
            'minimum_amount' => $coupon->get_minimum_amount(),
            'maximum_amount' => $coupon->get_maximum_amount(),
            'free_shipping' => $coupon->get_free_shipping(),
            'expiry_date' => $coupon->get_date_expires() ? $coupon->get_date_expires()->date('Y-m-d') : null,
        ], __('Coupon is valid.', 'store-pos'));
    }

    /**
     * Get coupons
     */
    public function get_coupons($request) {
        $args = [
            'posts_per_page' => -1,
            'post_type' => 'shop_coupon',
            'post_status' => 'publish',
            'orderby' => 'title',
            'order' => 'ASC',
        ];

        $coupons = get_posts($args);
        $formatted_coupons = [];

        foreach ($coupons as $coupon_post) {
            $coupon = new \WC_Coupon($coupon_post->ID);
            $formatted_coupons[] = [
                'id' => $coupon->get_id(),
                'code' => $coupon->get_code(),
                'type' => $coupon->get_discount_type(),
                'amount' => $coupon->get_amount(),
                'description' => $coupon->get_description(),
                'minimum_amount' => $coupon->get_minimum_amount(),
                'maximum_amount' => $coupon->get_maximum_amount(),
                'usage_count' => $coupon->get_usage_count(),
                'usage_limit' => $coupon->get_usage_limit(),
                'expiry_date' => $coupon->get_date_expires() ? $coupon->get_date_expires()->date('Y-m-d') : null,
            ];
        }

        return $this->success_response($formatted_coupons);
    }

    /**
     * Prepare item for response
     */
    public function prepare_item_for_response($item, $request) {
        return rest_ensure_response($item);
    }
}
