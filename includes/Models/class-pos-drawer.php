<?php
/**
 * Drawer model
 *
 * @package StorePOS\Models
 */

namespace StorePOS\Models;

class Drawer {

    /**
     * Create a new drawer
     */
    public static function create($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawers';

        $defaults = [
            'outlet_id' => 0,
            'name' => '',
            'printer' => '',
            'status' => 'active'
        ];

        $data = wp_parse_args($data, $defaults);

        $inserted = $wpdb->insert(
            $table,
            [
                'outlet_id' => absint($data['outlet_id']),
                'name' => sanitize_text_field($data['name']),
                'printer' => sanitize_text_field($data['printer']),
                'status' => sanitize_text_field($data['status']),
            ],
            ['%d', '%s', '%s', '%s']
        );

        if ($inserted) {
            $drawer_id = $wpdb->insert_id;
            Logger::log('drawer_created', 'drawer', $drawer_id, "Created drawer: {$data['name']}");
            return $drawer_id;
        }

        return false;
    }

    /**
     * Get drawer by ID
     */
    public static function get($id) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawers';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE id = %d",
            $id
        ));
    }

    /**
     * Get drawers by outlet
     */
    public static function get_by_outlet($outlet_id, $status = 'active') {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawers';

        $query = "SELECT * FROM $table WHERE outlet_id = %d";
        $params = [$outlet_id];

        if ($status) {
            $query .= " AND status = %s";
            $params[] = $status;
        }

        $query .= " ORDER BY name ASC";

        return $wpdb->get_results($wpdb->prepare($query, $params));
    }

    /**
     * Update drawer
     */
    public static function update($id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawers';

        $allowed_fields = ['name', 'printer', 'status'];
        $update_data = [];
        $format = [];

        foreach ($allowed_fields as $field) {
            if (isset($data[$field])) {
                $update_data[$field] = sanitize_text_field($data[$field]);
                $format[] = '%s';
            }
        }

        if (empty($update_data)) {
            return false;
        }

        $updated = $wpdb->update(
            $table,
            $update_data,
            ['id' => $id],
            $format,
            ['%d']
        );

        if ($updated !== false) {
            Logger::log('drawer_updated', 'drawer', $id, "Updated drawer ID: $id");
            return true;
        }

        return false;
    }

    /**
     * Delete drawer
     */
    public static function delete($id) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawers';

        // Check if drawer has active sessions
        $sessions_table = $wpdb->prefix . 'wc_pos_drawer_sessions';
        $has_active_sessions = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $sessions_table WHERE drawer_id = %d AND status = 'open'",
            $id
        ));

        if ($has_active_sessions > 0) {
            return new \WP_Error('drawer_has_active_sessions', __('Cannot delete drawer with active sessions.', 'store-pos'));
        }

        $deleted = $wpdb->delete($table, ['id' => $id], ['%d']);

        if ($deleted) {
            Logger::log('drawer_deleted', 'drawer', $id, "Deleted drawer ID: $id");
            return true;
        }

        return false;
    }

    /**
     * Open drawer session
     */
    public static function open_session($drawer_id, $opening_balance, $user_id = null) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawer_sessions';

        if (!$user_id) {
            $user_id = get_current_user_id();
        }

        // Check if drawer already has an open session
        $active_session = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE drawer_id = %d AND status = 'open'",
            $drawer_id
        ));

        if ($active_session) {
            return new \WP_Error('drawer_already_open', __('This drawer already has an open session.', 'store-pos'));
        }

        $inserted = $wpdb->insert(
            $table,
            [
                'drawer_id' => absint($drawer_id),
                'opened_by' => absint($user_id),
                'opened_at' => current_time('mysql'),
                'opening_balance' => floatval($opening_balance),
                'status' => 'open'
            ],
            ['%d', '%d', '%s', '%f', '%s']
        );

        if ($inserted) {
            $session_id = $wpdb->insert_id;
            Logger::log('drawer_opened', 'drawer', $drawer_id, "Drawer opened with balance: " . $opening_balance, $user_id);
            return $session_id;
        }

        return false;
    }

    /**
     * Close drawer session
     */
    public static function close_session($session_id, $closing_balance, $notes = '', $user_id = null) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawer_sessions';

        if (!$user_id) {
            $user_id = get_current_user_id();
        }

        $updated = $wpdb->update(
            $table,
            [
                'closed_by' => absint($user_id),
                'closed_at' => current_time('mysql'),
                'closing_balance' => floatval($closing_balance),
                'notes' => sanitize_textarea_field($notes),
                'status' => 'closed'
            ],
            ['id' => $session_id],
            ['%d', '%s', '%f', '%s', '%s'],
            ['%d']
        );

        if ($updated) {
            $session = self::get_drawer_session($session_id);
            Logger::log('drawer_closed', 'drawer', $session->drawer_id, "Drawer closed with balance: " . $closing_balance, $user_id);
            return true;
        }

        return false;
    }

    /**
     * Get drawer session
     */
    public static function get_drawer_session($session_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawer_sessions';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE id = %d",
            $session_id
        ));
    }

    /**
     * Get active drawer session for drawer
     */
    public static function get_active_session($drawer_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawer_sessions';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE drawer_id = %d AND status = 'open' ORDER BY opened_at DESC LIMIT 1",
            $drawer_id
        ));
    }

    /**
     * Get drawer session history
     */
    public static function get_session_history($drawer_id, $limit = 10) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawer_sessions';

        return $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table WHERE drawer_id = %d ORDER BY opened_at DESC LIMIT %d",
            $drawer_id,
            $limit
        ));
    }

    /**
     * Get drawer statistics
     */
    public static function get_stats($drawer_id) {
        global $wpdb;
        $sessions_table = $wpdb->prefix . 'wc_pos_drawer_sessions';

        $stats = $wpdb->get_row($wpdb->prepare(
            "SELECT 
                COUNT(*) as total_sessions,
                SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) as open_sessions,
                AVG(closing_balance - opening_balance) as avg_difference
            FROM $sessions_table 
            WHERE drawer_id = %d",
            $drawer_id
        ), ARRAY_A);

        return $stats;
    }
}
