<?php
/**
 * Reports REST API Controller
 *
 * @package StorePOS\API
 */

namespace StorePOS\API;

class ReportsAPI extends RESTController {

    /**
     * Register routes
     */
    public function register_routes() {
        // Sales report
        register_rest_route($this->namespace, '/reports/sales', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_sales_report'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'view_pos_reports');
            },
        ]);

        // Drawer report
        register_rest_route($this->namespace, '/reports/drawer/(?P<session_id>[\d]+)', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_drawer_report'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'view_pos_reports');
            },
        ]);

        // Cashier report
        register_rest_route($this->namespace, '/reports/cashier', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_cashier_report'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'view_pos_reports');
            },
        ]);

        // Top products
        register_rest_route($this->namespace, '/reports/top-products', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_top_products'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'view_pos_reports');
            },
        ]);
    }

    /**
     * Get sales report
     */
    public function get_sales_report($request) {
        $date_from = $request->get_param('date_from') ?: date('Y-m-d', strtotime('-30 days'));
        $date_to = $request->get_param('date_to') ?: date('Y-m-d');
        $outlet_id = $request->get_param('outlet_id');

        $args = [
            'limit' => -1,
            'type' => 'shop_order',
            'status' => ['wc-completed', 'wc-processing', 'wc-on-hold'],
            'date_created' => $date_from . '...' . $date_to,
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

        $orders = wc_get_orders($args);

        $total_sales = 0;
        $total_tax = 0;
        $total_discount = 0;
        $order_count = 0;
        $payment_methods = [];

        foreach ($orders as $order) {
            $total_sales += $order->get_total();
            $total_tax += $order->get_total_tax();
            $total_discount += $order->get_discount_total();
            $order_count++;

            $method = $order->get_payment_method_title() ?: 'Unknown';
            if (!isset($payment_methods[$method])) {
                $payment_methods[$method] = ['count' => 0, 'total' => 0];
            }
            $payment_methods[$method]['count']++;
            $payment_methods[$method]['total'] += $order->get_total();
        }

        return $this->success_response([
            'date_from' => $date_from,
            'date_to' => $date_to,
            'total_sales' => $total_sales,
            'total_tax' => $total_tax,
            'total_discount' => $total_discount,
            'order_count' => $order_count,
            'average_order_value' => $order_count > 0 ? $total_sales / $order_count : 0,
            'payment_methods' => $payment_methods,
        ]);
    }

    /**
     * Get drawer report
     */
    public function get_drawer_report($request) {
        global $wpdb;
        
        $session_id = $request->get_param('session_id');
        $sessions_table = $wpdb->prefix . 'wc_pos_drawer_sessions';

        $session = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $sessions_table WHERE id = %d",
            $session_id
        ));

        if (!$session) {
            return $this->error_response(__('Drawer session not found.', 'store-pos'), 'not_found', 404);
        }

        // Get orders for this drawer session
        $args = [
            'limit' => -1,
            'meta_query' => [
                [
                    'key' => '_pos_drawer_session_id',
                    'value' => $session_id,
                ]
            ]
        ];

        $orders = wc_get_orders($args);

        $total_sales = 0;
        $cash_sales = 0;
        $card_sales = 0;
        $other_sales = 0;

        foreach ($orders as $order) {
            $total = $order->get_total();
            $total_sales += $total;

            $method = $order->get_payment_method();
            if ($method === 'cash') {
                $cash_sales += $total;
            } elseif (in_array($method, ['card', 'stripe', 'paypal'])) {
                $card_sales += $total;
            } else {
                $other_sales += $total;
            }
        }

        $expected_cash = $session->opening_balance + $cash_sales;
        $difference = $session->closing_balance ? ($session->closing_balance - $expected_cash) : 0;

        return $this->success_response([
            'session' => $session,
            'total_sales' => $total_sales,
            'cash_sales' => $cash_sales,
            'card_sales' => $card_sales,
            'other_sales' => $other_sales,
            'order_count' => count($orders),
            'opening_balance' => $session->opening_balance,
            'closing_balance' => $session->closing_balance,
            'expected_cash' => $expected_cash,
            'difference' => $difference,
        ]);
    }

    /**
     * Get cashier report
     */
    public function get_cashier_report($request) {
        $date_from = $request->get_param('date_from') ?: date('Y-m-d', strtotime('-30 days'));
        $date_to = $request->get_param('date_to') ?: date('Y-m-d');
        $cashier_id = $request->get_param('cashier_id');

        $args = [
            'limit' => -1,
            'date_created' => $date_from . '...' . $date_to,
            'meta_query' => [
                [
                    'key' => '_pos_order',
                    'value' => 'yes',
                ]
            ]
        ];

        if ($cashier_id) {
            $args['meta_query'][] = [
                'key' => '_pos_cashier',
                'value' => $cashier_id,
            ];
        }

        $orders = wc_get_orders($args);

        $cashiers = [];

        foreach ($orders as $order) {
            $cashier_id = $order->get_meta('_pos_cashier');
            $cashier_name = $order->get_meta('_pos_cashier_name');

            if (!isset($cashiers[$cashier_id])) {
                $cashiers[$cashier_id] = [
                    'id' => $cashier_id,
                    'name' => $cashier_name,
                    'order_count' => 0,
                    'total_sales' => 0,
                ];
            }

            $cashiers[$cashier_id]['order_count']++;
            $cashiers[$cashier_id]['total_sales'] += $order->get_total();
        }

        return $this->success_response([
            'date_from' => $date_from,
            'date_to' => $date_to,
            'cashiers' => array_values($cashiers),
        ]);
    }

    /**
     * Get top products
     */
    public function get_top_products($request) {
        global $wpdb;

        $date_from = $request->get_param('date_from') ?: date('Y-m-d', strtotime('-30 days'));
        $date_to = $request->get_param('date_to') ?: date('Y-m-d');
        $limit = $request->get_param('limit') ?: 10;

        $query = "
            SELECT 
                oi.order_item_name as product_name,
                oim.meta_value as product_id,
                SUM(oim2.meta_value) as quantity,
                SUM(oim3.meta_value) as total_sales
            FROM {$wpdb->prefix}woocommerce_order_items oi
            INNER JOIN {$wpdb->prefix}woocommerce_order_itemmeta oim ON oi.order_item_id = oim.order_item_id AND oim.meta_key = '_product_id'
            INNER JOIN {$wpdb->prefix}woocommerce_order_itemmeta oim2 ON oi.order_item_id = oim2.order_item_id AND oim2.meta_key = '_qty'
            INNER JOIN {$wpdb->prefix}woocommerce_order_itemmeta oim3 ON oi.order_item_id = oim3.order_item_id AND oim3.meta_key = '_line_total'
            INNER JOIN {$wpdb->posts} p ON oi.order_id = p.ID
            INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id AND pm.meta_key = '_pos_order' AND pm.meta_value = 'yes'
            WHERE p.post_type = 'shop_order'
            AND p.post_date BETWEEN %s AND %s
            GROUP BY product_id
            ORDER BY quantity DESC
            LIMIT %d
        ";

        $results = $wpdb->get_results($wpdb->prepare($query, $date_from . ' 00:00:00', $date_to . ' 23:59:59', $limit));

        $products = [];
        foreach ($results as $row) {
            $products[] = [
                'product_id' => $row->product_id,
                'product_name' => $row->product_name,
                'quantity_sold' => (int)$row->quantity,
                'total_sales' => (float)$row->total_sales,
            ];
        }

        return $this->success_response($products);
    }

    /**
     * Prepare item for response
     */
    public function prepare_item_for_response($item, $request) {
        return rest_ensure_response($item);
    }
}
