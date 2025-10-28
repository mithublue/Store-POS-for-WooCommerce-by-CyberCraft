<?php
/**
 * Outlets REST API Controller
 *
 * @package StorePOS\API
 */

namespace StorePOS\API;

use StorePOS\Models\Outlet;

class OutletsAPI extends RESTController {

    /**
     * Register routes
     */
    public function register_routes() {
        // Get all outlets
        register_rest_route($this->namespace, '/outlets', [
            [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'get_outlets'],
                'permission_callback' => [$this, 'check_permission'],
            ],
            [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'create_outlet'],
                'permission_callback' => function($request) {
                    return $this->check_permission($request, 'manage_pos');
                },
                'args' => $this->get_create_args(),
            ]
        ]);

        // Get, update, delete single outlet
        register_rest_route($this->namespace, '/outlets/(?P<id>[\d]+)', [
            [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'get_outlet'],
                'permission_callback' => [$this, 'check_permission'],
            ],
            [
                'methods' => \WP_REST_Server::EDITABLE,
                'callback' => [$this, 'update_outlet'],
                'permission_callback' => function($request) {
                    return $this->check_permission($request, 'manage_pos');
                },
                'args' => $this->get_update_args(),
            ],
            [
                'methods' => \WP_REST_Server::DELETABLE,
                'callback' => [$this, 'delete_outlet'],
                'permission_callback' => function($request) {
                    return $this->check_permission($request, 'manage_pos');
                },
            ]
        ]);

        // Get outlet stats
        register_rest_route($this->namespace, '/outlets/(?P<id>[\d]+)/stats', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_outlet_stats'],
            'permission_callback' => [$this, 'check_permission'],
        ]);
    }

    /**
     * Get all outlets
     */
    public function get_outlets($request) {
        $status = $request->get_param('status') ?: 'active';
        $outlets = Outlet::get_all(['status' => $status]);
        
        return $this->success_response($outlets);
    }

    /**
     * Get single outlet
     */
    public function get_outlet($request) {
        $id = $request->get_param('id');
        $outlet = Outlet::get($id);
        
        if (!$outlet) {
            return $this->error_response(__('Outlet not found.', 'store-pos'), 'not_found', 404);
        }
        
        return $this->success_response($outlet);
    }

    /**
     * Create outlet
     */
    public function create_outlet($request) {
        $data = [
            'name' => $request->get_param('name'),
            'slug' => $request->get_param('slug'),
            'address' => $request->get_param('address'),
            'phone' => $request->get_param('phone'),
            'timezone' => $request->get_param('timezone') ?: 'UTC',
            'manager_user_id' => $request->get_param('manager_user_id'),
            'status' => $request->get_param('status') ?: 'active',
        ];

        $outlet_id = Outlet::create($data);
        
        if (!$outlet_id) {
            return $this->error_response(__('Failed to create outlet.', 'store-pos'));
        }
        
        $outlet = Outlet::get($outlet_id);
        return $this->success_response($outlet, __('Outlet created successfully.', 'store-pos'), 201);
    }

    /**
     * Update outlet
     */
    public function update_outlet($request) {
        $id = $request->get_param('id');
        $outlet = Outlet::get($id);
        
        if (!$outlet) {
            return $this->error_response(__('Outlet not found.', 'store-pos'), 'not_found', 404);
        }

        $data = [];
        $fields = ['name', 'slug', 'address', 'phone', 'timezone', 'manager_user_id', 'status'];
        
        foreach ($fields as $field) {
            if ($request->has_param($field)) {
                $data[$field] = $request->get_param($field);
            }
        }

        $updated = Outlet::update($id, $data);
        
        if (!$updated) {
            return $this->error_response(__('Failed to update outlet.', 'store-pos'));
        }
        
        $outlet = Outlet::get($id);
        return $this->success_response($outlet, __('Outlet updated successfully.', 'store-pos'));
    }

    /**
     * Delete outlet
     */
    public function delete_outlet($request) {
        $id = $request->get_param('id');
        $outlet = Outlet::get($id);
        
        if (!$outlet) {
            return $this->error_response(__('Outlet not found.', 'store-pos'), 'not_found', 404);
        }

        $deleted = Outlet::delete($id);
        
        if (is_wp_error($deleted)) {
            return $deleted;
        }
        
        if (!$deleted) {
            return $this->error_response(__('Failed to delete outlet.', 'store-pos'));
        }
        
        return $this->success_response(null, __('Outlet deleted successfully.', 'store-pos'));
    }

    /**
     * Get outlet stats
     */
    public function get_outlet_stats($request) {
        $id = $request->get_param('id');
        $outlet = Outlet::get($id);
        
        if (!$outlet) {
            return $this->error_response(__('Outlet not found.', 'store-pos'), 'not_found', 404);
        }

        $stats = Outlet::get_stats($id);
        return $this->success_response($stats);
    }

    /**
     * Get create arguments
     */
    private function get_create_args() {
        return [
            'name' => [
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'slug' => [
                'type' => 'string',
                'sanitize_callback' => 'sanitize_title',
            ],
            'address' => [
                'type' => 'string',
                'sanitize_callback' => 'sanitize_textarea_field',
            ],
            'phone' => [
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'timezone' => [
                'type' => 'string',
                'default' => 'UTC',
            ],
            'manager_user_id' => [
                'type' => 'integer',
            ],
        ];
    }

    /**
     * Get update arguments
     */
    private function get_update_args() {
        $args = $this->get_create_args();
        foreach ($args as &$arg) {
            $arg['required'] = false;
        }
        return $args;
    }

    /**
     * Prepare item for response
     */
    public function prepare_item_for_response($item, $request) {
        return rest_ensure_response($item);
    }
}
