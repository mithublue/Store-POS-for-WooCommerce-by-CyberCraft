<?php
/**
 * Permission helper class
 *
 * @package StorePOS\Helpers
 */

namespace StorePOS\Helpers;

class Permissions {

    /**
     * Check if user can manage POS
     */
    public static function can_manage_pos($user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        $user = get_userdata($user_id);
        return $user && (
            $user->has_cap('manage_pos') ||
            $user->has_cap('administrator')
        );
    }

    /**
     * Check if user can use POS
     */
    public static function can_use_pos($user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        $user = get_userdata($user_id);
        return $user && (
            $user->has_cap('use_pos') ||
            $user->has_cap('manage_pos') ||
            $user->has_cap('administrator')
        );
    }

    /**
     * Check if user can manage drawers
     */
    public static function can_manage_drawers($user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        $user = get_userdata($user_id);
        return $user && (
            $user->has_cap('manage_drawers') ||
            $user->has_cap('administrator')
        );
    }

    /**
     * Check if user can view reports
     */
    public static function can_view_reports($user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        $user = get_userdata($user_id);
        return $user && (
            $user->has_cap('view_pos_reports') ||
            $user->has_cap('administrator')
        );
    }

    /**
     * Check if user can apply manual discounts
     */
    public static function can_apply_discounts($user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        $user = get_userdata($user_id);
        return $user && (
            $user->has_cap('apply_discounts') ||
            $user->has_cap('administrator')
        );
    }

    /**
     * Check if user is POS manager
     */
    public static function is_pos_manager($user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        $user = get_userdata($user_id);
        return $user && in_array('pos_manager', $user->roles);
    }

    /**
     * Check if user is POS cashier
     */
    public static function is_pos_cashier($user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        $user = get_userdata($user_id);
        return $user && in_array('pos_cashier', $user->roles);
    }

    /**
     * Verify REST API permission
     */
    public static function check_api_permission($capability = 'use_pos') {
        if (!is_user_logged_in()) {
            return new \WP_Error('not_logged_in', __('You must be logged in.', 'store-pos'), ['status' => 401]);
        }

		//return true, if the role is administrator
		if (current_user_can('administrator')) {
			return true;
		}

        if (!current_user_can($capability)) {
            return new \WP_Error('insufficient_permissions', __('You do not have permission to perform this action.', 'store-pos'), ['status' => 403]);
        }

        return true;
    }
}
