<?php
/**
 * Drawers REST API Controller
 *
 * @package StorePOS\API
 */

namespace StorePOS\API;

use StorePOS\Models\Drawer;

class DrawersAPI extends RESTController {

    /**
     * Register routes
     */
    public function register_routes() {
        // Get all drawers
        register_rest_route($this->namespace, '/drawers', [
            [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'get_drawers'],
                'permission_callback' => [$this, 'check_permission'],
            ],
            [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'create_drawer'],
                'permission_callback' => function($request) {
                    return $this->check_permission($request, 'manage_drawers');
                },
            ]
        ]);

        // Single drawer operations
        register_rest_route($this->namespace, '/drawers/(?P<id>[\d]+)', [
            [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'get_drawer'],
                'permission_callback' => [$this, 'check_permission'],
            ],
            [
                'methods' => \WP_REST_Server::EDITABLE,
                'callback' => [$this, 'update_drawer'],
                'permission_callback' => function($request) {
                    return $this->check_permission($request, 'manage_drawers');
                },
            ],
            [
                'methods' => \WP_REST_Server::DELETABLE,
                'callback' => [$this, 'delete_drawer'],
                'permission_callback' => function($request) {
                    return $this->check_permission($request, 'manage_drawers');
                },
            ]
        ]);

        // Open drawer session
        register_rest_route($this->namespace, '/drawers/(?P<id>[\d]+)/open', [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'open_drawer'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'manage_drawers');
            },
        ]);

        // Close drawer session
        register_rest_route($this->namespace, '/drawers/sessions/(?P<id>[\d]+)/close', [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'close_drawer'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'manage_drawers');
            },
        ]);

        // Get drawer active session
        register_rest_route($this->namespace, '/drawers/(?P<id>[\d]+)/active-session', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_active_session'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Get drawer session history
        register_rest_route($this->namespace, '/drawers/(?P<id>[\d]+)/sessions', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'get_session_history'],
            'permission_callback' => [$this, 'check_permission'],
        ]);
    }

    /**
     * Get drawers
     */
    public function get_drawers($request) {
        $outlet_id = $request->get_param('outlet_id');
        
        if ($outlet_id) {
            $drawers = Drawer::get_by_outlet($outlet_id);
        } else {
            $drawers = Drawer::get_by_outlet(0, null);
        }
        
        return $this->success_response($drawers);
    }

    /**
     * Get single drawer
     */
    public function get_drawer($request) {
        $id = $request->get_param('id');
        $drawer = Drawer::get($id);
        
        if (!$drawer) {
            return $this->error_response(__('Drawer not found.', 'store-pos'), 'not_found', 404);
        }
        
        return $this->success_response($drawer);
    }

    /**
     * Create drawer
     */
    public function create_drawer($request) {
        $data = [
            'outlet_id' => $request->get_param('outlet_id'),
            'name' => $request->get_param('name'),
            'printer' => $request->get_param('printer'),
            'status' => $request->get_param('status') ?: 'active',
        ];

        $drawer_id = Drawer::create($data);
        
        if (!$drawer_id) {
            return $this->error_response(__('Failed to create drawer.', 'store-pos'));
        }
        
        $drawer = Drawer::get($drawer_id);
        return $this->success_response($drawer, __('Drawer created successfully.', 'store-pos'), 201);
    }

    /**
     * Update drawer
     */
    public function update_drawer($request) {
        $id = $request->get_param('id');
        $drawer = Drawer::get($id);
        
        if (!$drawer) {
            return $this->error_response(__('Drawer not found.', 'store-pos'), 'not_found', 404);
        }

        $data = [];
        $fields = ['name', 'printer', 'status'];
        
        foreach ($fields as $field) {
            if ($request->has_param($field)) {
                $data[$field] = $request->get_param($field);
            }
        }

        $updated = Drawer::update($id, $data);
        
        if (!$updated) {
            return $this->error_response(__('Failed to update drawer.', 'store-pos'));
        }
        
        $drawer = Drawer::get($id);
        return $this->success_response($drawer, __('Drawer updated successfully.', 'store-pos'));
    }

    /**
     * Delete drawer
     */
    public function delete_drawer($request) {
        $id = $request->get_param('id');
        $drawer = Drawer::get($id);
        
        if (!$drawer) {
            return $this->error_response(__('Drawer not found.', 'store-pos'), 'not_found', 404);
        }

        $deleted = Drawer::delete($id);
        
        if (is_wp_error($deleted)) {
            return $deleted;
        }
        
        if (!$deleted) {
            return $this->error_response(__('Failed to delete drawer.', 'store-pos'));
        }
        
        return $this->success_response(null, __('Drawer deleted successfully.', 'store-pos'));
    }

    /**
     * Open drawer
     */
    public function open_drawer($request) {
        $drawer_id = $request->get_param('id');
        $opening_balance = $request->get_param('opening_balance') ?: 0;
        
        $drawer = Drawer::get($drawer_id);
        if (!$drawer) {
            return $this->error_response(__('Drawer not found.', 'store-pos'), 'not_found', 404);
        }

        $session_id = Drawer::open_session($drawer_id, $opening_balance);
        
        if (is_wp_error($session_id)) {
            return $session_id;
        }
        
        if (!$session_id) {
            return $this->error_response(__('Failed to open drawer.', 'store-pos'));
        }
        
        $session = Drawer::get_drawer_session($session_id);
        return $this->success_response($session, __('Drawer opened successfully.', 'store-pos'));
    }

    /**
     * Close drawer
     */
    public function close_drawer($request) {
        $session_id = $request->get_param('id');
        $closing_balance = $request->get_param('closing_balance');
        $notes = $request->get_param('notes') ?: '';
        
        $session = Drawer::get_drawer_session($session_id);
        if (!$session) {
            return $this->error_response(__('Session not found.', 'store-pos'), 'not_found', 404);
        }

        $closed = Drawer::close_session($session_id, $closing_balance, $notes);
        
        if (!$closed) {
            return $this->error_response(__('Failed to close drawer.', 'store-pos'));
        }
        
        $session = Drawer::get_drawer_session($session_id);
        return $this->success_response($session, __('Drawer closed successfully.', 'store-pos'));
    }

    /**
     * Get active session
     */
    public function get_active_session($request) {
        $drawer_id = $request->get_param('id');
        $session = Drawer::get_active_session($drawer_id);
        
        if (!$session) {
            return $this->success_response(null, __('No active session found.', 'store-pos'));
        }
        
        return $this->success_response($session);
    }

    /**
     * Get session history
     */
    public function get_session_history($request) {
        $drawer_id = $request->get_param('id');
        $limit = $request->get_param('limit') ?: 10;
        
        $sessions = Drawer::get_session_history($drawer_id, $limit);
        return $this->success_response($sessions);
    }

    /**
     * Prepare item for response
     */
    public function prepare_item_for_response($item, $request) {
        return rest_ensure_response($item);
    }
}
