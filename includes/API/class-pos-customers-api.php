<?php
/**
 * Customers REST API Controller
 *
 * @package StorePOS\API
 */

namespace StorePOS\API;

class CustomersAPI extends RESTController {

    /**
     * Register routes
     */
    public function register_routes() {
        // Search customers
        register_rest_route($this->namespace, '/customers/search', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'search_customers'],
            'permission_callback' => [$this, 'check_permission'],
            'args' => [
                'search' => [
                    'type' => 'string',
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ],
        ]);

        // Get all customers
        register_rest_route($this->namespace, '/customers', [
            [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'get_customers'],
                'permission_callback' => [$this, 'check_permission'],
            ],
            [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'create_customer'],
                'permission_callback' => [$this, 'check_permission'],
            ]
        ]);

        // Get single customer
        register_rest_route($this->namespace, '/customers/(?P<id>[\d]+)', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_customer'],
            'permission_callback' => [$this, 'check_permission'],
        ]);
    }

    /**
     * Search customers
     */
    public function search_customers($request) {
        $search = $request->get_param('search');

        $args = [
            'search' => '*' . esc_attr($search) . '*',
            'search_columns' => ['user_login', 'user_email', 'display_name'],
            'role__in' => ['customer'],
            'number' => 10,
        ];

        $user_query = new \WP_User_Query($args);
        $customers = [];

        foreach ($user_query->get_results() as $user) {
            $customers[] = $this->format_customer($user);
        }

        return $this->success_response($customers);
    }

    /**
     * Get customers
     */
    public function get_customers($request) {
        $per_page = $request->get_param('per_page') ?: 20;
        $page = $request->get_param('page') ?: 1;

        $args = [
            'role__in' => ['customer'],
            'number' => $per_page,
            'offset' => ($page - 1) * $per_page,
            'orderby' => 'display_name',
            'order' => 'ASC',
        ];

        $user_query = new \WP_User_Query($args);
        $customers = [];

        foreach ($user_query->get_results() as $user) {
            $customers[] = $this->format_customer($user);
        }

        return $this->success_response([
            'customers' => $customers,
            'total' => $user_query->get_total(),
        ]);
    }

    /**
     * Get single customer
     */
    public function get_customer($request) {
        $id = $request->get_param('id');
        $user = get_userdata($id);

        if (!$user || !in_array('customer', $user->roles)) {
            return $this->error_response(__('Customer not found.', 'store-pos'), 'not_found', 404);
        }

        return $this->success_response($this->format_customer($user, true));
    }

    /**
     * Create customer
     */
    public function create_customer($request) {
        $email = $request->get_param('email');
        $first_name = $request->get_param('first_name');
        $last_name = $request->get_param('last_name');
        $phone = $request->get_param('phone');
        $username = $request->get_param('username') ?: $email;

        // Check if email already exists
        if (email_exists($email)) {
            return $this->error_response(__('Email already exists.', 'store-pos'));
        }

        // Check if username already exists
        if (username_exists($username)) {
            return $this->error_response(__('Username already exists.', 'store-pos'));
        }

        // Create user
        $user_id = wc_create_new_customer($email, $username, wp_generate_password());

        if (is_wp_error($user_id)) {
            return $this->error_response($user_id->get_error_message());
        }

        // Update user meta
        if ($first_name) {
            update_user_meta($user_id, 'first_name', sanitize_text_field($first_name));
            update_user_meta($user_id, 'billing_first_name', sanitize_text_field($first_name));
        }

        if ($last_name) {
            update_user_meta($user_id, 'last_name', sanitize_text_field($last_name));
            update_user_meta($user_id, 'billing_last_name', sanitize_text_field($last_name));
        }

        if ($phone) {
            update_user_meta($user_id, 'billing_phone', sanitize_text_field($phone));
        }

        $user = get_userdata($user_id);

        return $this->success_response(
            $this->format_customer($user),
            __('Customer created successfully.', 'store-pos'),
            201
        );
    }

    /**
     * Format customer for response
     */
    private function format_customer($user, $detailed = false) {
        $data = [
            'id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'first_name' => get_user_meta($user->ID, 'first_name', true),
            'last_name' => get_user_meta($user->ID, 'last_name', true),
            'display_name' => $user->display_name,
        ];

        if ($detailed) {
            $data['billing'] = [
                'first_name' => get_user_meta($user->ID, 'billing_first_name', true),
                'last_name' => get_user_meta($user->ID, 'billing_last_name', true),
                'company' => get_user_meta($user->ID, 'billing_company', true),
                'address_1' => get_user_meta($user->ID, 'billing_address_1', true),
                'address_2' => get_user_meta($user->ID, 'billing_address_2', true),
                'city' => get_user_meta($user->ID, 'billing_city', true),
                'state' => get_user_meta($user->ID, 'billing_state', true),
                'postcode' => get_user_meta($user->ID, 'billing_postcode', true),
                'country' => get_user_meta($user->ID, 'billing_country', true),
                'email' => get_user_meta($user->ID, 'billing_email', true),
                'phone' => get_user_meta($user->ID, 'billing_phone', true),
            ];

            // Get order count and total spent
            $customer = new \WC_Customer($user->ID);
            $data['orders_count'] = $customer->get_order_count();
            $data['total_spent'] = $customer->get_total_spent();
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
