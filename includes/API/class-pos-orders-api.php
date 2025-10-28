<?php
/**
 * Orders REST API Controller
 *
 * @package StorePOS\API
 */

namespace StorePOS\API;

use StorePOS\Helpers\Utils;
use StorePOS\Models\Logger;

class OrdersAPI extends RESTController {

    /**
     * Register routes
     */
    public function register_routes() {
        // Create order
        register_rest_route($this->namespace, '/orders', [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'create_order'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Get orders
        register_rest_route($this->namespace, '/orders', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_orders'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Get single order
        register_rest_route($this->namespace, '/orders/(?P<id>[\d]+)', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_order'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Update order status
        register_rest_route($this->namespace, '/orders/(?P<id>[\d]+)/status', [
            'methods' => \WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_order_status'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Refund order
        register_rest_route($this->namespace, '/orders/(?P<id>[\d]+)/refund', [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'refund_order'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'manage_pos');
            },
        ]);
    }

    /**
     * Create order
     */
    public function create_order($request) {
        try {
            $items = $request->get_param('items');
            $customer_id = $request->get_param('customer_id') ?: 0;
            $payment_method = $request->get_param('payment_method') ?: 'cash';
            $payment_method_title = $request->get_param('payment_method_title') ?: 'Cash';
            $coupon_codes = $request->get_param('coupons') ?: [];
            $custom_discount = $request->get_param('custom_discount') ?: 0;
            $notes = $request->get_param('notes') ?: '';
            $outlet_id = $request->get_param('outlet_id');
            $drawer_id = $request->get_param('drawer_id');
            $drawer_session_id = $request->get_param('drawer_session_id');

            if (empty($items) || !is_array($items)) {
                return $this->error_response(__('No items provided.', 'store-pos'));
            }

            // Create order using HPOS-compatible method
            $order = wc_create_order(['customer_id' => $customer_id]);

            if (is_wp_error($order)) {
                return $this->error_response($order->get_error_message());
            }

            // Add items to order
            foreach ($items as $item) {
                $product_id = $item['product_id'];
                $quantity = $item['quantity'];
                $variation_id = isset($item['variation_id']) ? $item['variation_id'] : 0;

                $product = wc_get_product($variation_id ?: $product_id);
                if (!$product) {
                    continue;
                }

                $order->add_product($product, $quantity);
            }

            // Apply coupons
            if (!empty($coupon_codes)) {
                foreach ($coupon_codes as $coupon_code) {
                    $order->apply_coupon($coupon_code);
                }
            }

            // Apply custom discount (if manager)
            if ($custom_discount > 0) {
                $fee = new \WC_Order_Item_Fee();
                $fee->set_name(__('Manager Discount', 'store-pos'));
                $fee->set_amount(-abs($custom_discount));
                $fee->set_total(-abs($custom_discount));
                $order->add_item($fee);
            }

            // Calculate totals
            $order->calculate_totals();

            // Set payment method
            $order->set_payment_method($payment_method);
            $order->set_payment_method_title($payment_method_title);

            // Mark as paid
            $order->payment_complete();

            // Add order notes
            if ($notes) {
                $order->add_order_note($notes);
            }

            // Add POS metadata
            $order->update_meta_data('_pos_order', 'yes');
            $order->update_meta_data('_pos_cashier', get_current_user_id());
            $order->update_meta_data('_pos_cashier_name', wp_get_current_user()->display_name);
            
            if ($outlet_id) {
                $order->update_meta_data('_pos_outlet_id', $outlet_id);
            }
            if ($drawer_id) {
                $order->update_meta_data('_pos_drawer_id', $drawer_id);
            }
            if ($drawer_session_id) {
                $order->update_meta_data('_pos_drawer_session_id', $drawer_session_id);
            }

            $order->save();

            // Log order creation
            Logger::log('order_created', 'order', $order->get_id(), sprintf(
                'POS order created. Total: %s',
                $order->get_total()
            ));

            return $this->success_response([
                'order_id' => $order->get_id(),
                'order_number' => $order->get_order_number(),
                'total' => $order->get_total(),
                'status' => $order->get_status(),
            ], __('Order created successfully.', 'store-pos'), 201);

        } catch (\Exception $e) {
            return $this->error_response($e->getMessage());
        }
    }

    /**
     * Get orders
     */
    public function get_orders($request) {
        $per_page = $request->get_param('per_page') ?: 20;
        $page = $request->get_param('page') ?: 1;
        $outlet_id = $request->get_param('outlet_id');
        $drawer_session_id = $request->get_param('drawer_session_id');
        $cashier_id = $request->get_param('cashier_id');
        $date_from = $request->get_param('date_from');
        $date_to = $request->get_param('date_to');

        $args = [
            'limit' => $per_page,
            'page' => $page,
            'orderby' => 'date',
            'order' => 'DESC',
            'meta_query' => [
                [
                    'key' => '_pos_order',
                    'value' => 'yes',
                ]
            ]
        ];

        if ($outlet_id) {
            $args['meta_query'][] = [
                'key' => '_pos_outlet_id',
                'value' => $outlet_id,
            ];
        }

        if ($drawer_session_id) {
            $args['meta_query'][] = [
                'key' => '_pos_drawer_session_id',
                'value' => $drawer_session_id,
            ];
        }

        if ($cashier_id) {
            $args['meta_query'][] = [
                'key' => '_pos_cashier',
                'value' => $cashier_id,
            ];
        }

        if ($date_from) {
            $args['date_created'] = '>=' . $date_from;
        }

        if ($date_to) {
            $args['date_created'] = '<=' . $date_to;
        }

        $orders = wc_get_orders($args);
        $formatted_orders = [];

        foreach ($orders as $order) {
            $formatted_orders[] = $this->format_order($order);
        }

        // Get total count
        $count_args = $args;
        $count_args['limit'] = -1;
        $count_args['return'] = 'ids';
        $total = count(wc_get_orders($count_args));

        return $this->success_response([
            'orders' => $formatted_orders,
            'total' => $total,
            'pages' => ceil($total / $per_page),
            'current_page' => $page,
        ]);
    }

    /**
     * Get single order
     */
    public function get_order($request) {
        $id = $request->get_param('id');
        $order = wc_get_order($id);

        if (!$order) {
            return $this->error_response(__('Order not found.', 'store-pos'), 'not_found', 404);
        }

        return $this->success_response($this->format_order($order, true));
    }

    /**
     * Update order status
     */
    public function update_order_status($request) {
        $id = $request->get_param('id');
        $status = $request->get_param('status');

        $order = wc_get_order($id);
        if (!$order) {
            return $this->error_response(__('Order not found.', 'store-pos'), 'not_found', 404);
        }

        $order->update_status($status);

        Logger::log('order_status_updated', 'order', $id, sprintf(
            'Order status changed to: %s',
            $status
        ));

        return $this->success_response([
            'order_id' => $id,
            'status' => $order->get_status(),
        ], __('Order status updated.', 'store-pos'));
    }

    /**
     * Refund order
     */
    public function refund_order($request) {
        $id = $request->get_param('id');
        $amount = $request->get_param('amount');
        $reason = $request->get_param('reason') ?: '';

        $order = wc_get_order($id);
        if (!$order) {
            return $this->error_response(__('Order not found.', 'store-pos'), 'not_found', 404);
        }

        if ($amount > $order->get_total()) {
            return $this->error_response(__('Refund amount cannot exceed order total.', 'store-pos'));
        }

        $refund = wc_create_refund([
            'order_id' => $id,
            'amount' => $amount,
            'reason' => $reason,
        ]);

        if (is_wp_error($refund)) {
            return $this->error_response($refund->get_error_message());
        }

        Logger::log('order_refunded', 'order', $id, sprintf(
            'Order refunded. Amount: %s. Reason: %s',
            $amount,
            $reason
        ));

        return $this->success_response([
            'refund_id' => $refund->get_id(),
            'amount' => $amount,
        ], __('Order refunded successfully.', 'store-pos'));
    }

    /**
     * Format order for response
     */
    private function format_order($order, $include_items = false) {
        $data = [
            'id' => $order->get_id(),
            'order_number' => $order->get_order_number(),
            'status' => $order->get_status(),
            'currency' => $order->get_currency(),
            'total' => $order->get_total(),
            'subtotal' => $order->get_subtotal(),
            'tax_total' => $order->get_total_tax(),
            'discount_total' => $order->get_discount_total(),
            'payment_method' => $order->get_payment_method(),
            'payment_method_title' => $order->get_payment_method_title(),
            'date_created' => $order->get_date_created()->date('Y-m-d H:i:s'),
            'customer_id' => $order->get_customer_id(),
            'cashier_id' => $order->get_meta('_pos_cashier'),
            'cashier_name' => $order->get_meta('_pos_cashier_name'),
            'outlet_id' => $order->get_meta('_pos_outlet_id'),
            'drawer_id' => $order->get_meta('_pos_drawer_id'),
            'drawer_session_id' => $order->get_meta('_pos_drawer_session_id'),
        ];

        if ($include_items) {
            $items = [];
            foreach ($order->get_items() as $item) {
                $product = $item->get_product();
                $items[] = [
                    'id' => $item->get_id(),
                    'product_id' => $item->get_product_id(),
                    'variation_id' => $item->get_variation_id(),
                    'name' => $item->get_name(),
                    'quantity' => $item->get_quantity(),
                    'subtotal' => $item->get_subtotal(),
                    'total' => $item->get_total(),
                    'sku' => $product ? $product->get_sku() : '',
                ];
            }
            $data['items'] = $items;
        }

        return $data;
    }

    /**
     * Prepare item for response
     */
    public function prepare_item_for_response($item, $request) {
        return rest_ensure_response($item);
    }
}
