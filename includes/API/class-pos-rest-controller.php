<?php
/**
 * Base REST API Controller
 *
 * @package StorePOS\API
 */

namespace StorePOS\API;

use StorePOS\Helpers\Permissions;

abstract class RESTController extends \WP_REST_Controller {

    /**
     * Namespace for the REST API
     */
    protected $namespace = 'store-pos/v1';

    /**
     * Check permissions for request
     */
    public function check_permission($request, $capability = 'use_pos') {
        $permission = Permissions::check_api_permission($capability);
        
        if (is_wp_error($permission)) {
            return $permission;
        }
        
        return true;
    }

    /**
     * Prepare response for collection
     */
    protected function prepare_collection_response($items, $request) {
        $data = [];
        
        foreach ($items as $item) {
            $response = $this->prepare_item_for_response($item, $request);
            $data[] = $this->prepare_response_for_collection($response);
        }
        
        return rest_ensure_response($data);
    }

    /**
     * Send success response
     */
    protected function success_response($data, $message = '', $status = 200) {
        return new \WP_REST_Response([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    /**
     * Send error response
     */
    protected function error_response($message, $code = 'error', $status = 400) {
        return new \WP_Error($code, $message, ['status' => $status]);
    }

    /**
     * Sanitize array recursively
     */
    protected function sanitize_array($array) {
        foreach ($array as $key => &$value) {
            if (is_array($value)) {
                $value = $this->sanitize_array($value);
            } else {
                $value = sanitize_text_field($value);
            }
        }
        return $array;
    }
}
