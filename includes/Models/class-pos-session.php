<?php
/**
 * Session model
 *
 * @package StorePOS\Models
 */

namespace StorePOS\Models;

use StorePOS\Helpers\Utils;

class Session {

    /**
     * Start a new POS session
     */
    public static function start($drawer_session_id = null, $outlet_id = null, $user_id = null) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_sessions';

        if (!$user_id) {
            $user_id = get_current_user_id();
        }

        // Check if user already has an active session
        $active_session = self::get_active_session($user_id);
        if ($active_session) {
            return new \WP_Error('session_already_active', __('User already has an active session.', 'store-pos'));
        }

        $metadata = [
            'ip_address' => self::get_client_ip(),
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'session_token' => Utils::generate_session_token()
        ];

        $inserted = $wpdb->insert(
            $table,
            [
                'user_id' => absint($user_id),
                'drawer_session_id' => $drawer_session_id ? absint($drawer_session_id) : null,
                'outlet_id' => $outlet_id ? absint($outlet_id) : null,
                'started_at' => current_time('mysql'),
                'metadata' => wp_json_encode($metadata)
            ],
            ['%d', '%d', '%d', '%s', '%s']
        );

        if ($inserted) {
            $session_id = $wpdb->insert_id;
            Logger::log('session_started', 'session', $session_id, 'POS session started', $user_id);
            return $session_id;
        }

        return false;
    }

    /**
     * End POS session
     */
    public static function end($session_id, $user_id = null) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_sessions';

        if (!$user_id) {
            $user_id = get_current_user_id();
        }

        $updated = $wpdb->update(
            $table,
            ['ended_at' => current_time('mysql')],
            ['id' => $session_id, 'user_id' => $user_id],
            ['%s'],
            ['%d', '%d']
        );

        if ($updated) {
            Logger::log('session_ended', 'session', $session_id, 'POS session ended', $user_id);
            return true;
        }

        return false;
    }

    /**
     * Get session by ID
     */
    public static function get($session_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_sessions';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE id = %d",
            $session_id
        ));
    }

    /**
     * Get active session for user
     */
    public static function get_active_session($user_id = null) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_sessions';

        if (!$user_id) {
            $user_id = get_current_user_id();
        }

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE user_id = %d AND ended_at IS NULL ORDER BY started_at DESC LIMIT 1",
            $user_id
        ));
    }

    /**
     * Get session history
     */
    public static function get_history($user_id = null, $limit = 10) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_sessions';

        if (!$user_id) {
            $user_id = get_current_user_id();
        }

        return $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table WHERE user_id = %d ORDER BY started_at DESC LIMIT %d",
            $user_id,
            $limit
        ));
    }

    /**
     * Update session metadata
     */
    public static function update_metadata($session_id, $metadata) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_sessions';

        $session = self::get($session_id);
        if (!$session) {
            return false;
        }

        $current_metadata = Utils::safe_json_decode($session->metadata, true);
        $updated_metadata = array_merge($current_metadata, $metadata);

        return $wpdb->update(
            $table,
            ['metadata' => wp_json_encode($updated_metadata)],
            ['id' => $session_id],
            ['%s'],
            ['%d']
        );
    }

    /**
     * Get client IP address
     */
    private static function get_client_ip() {
        $ip_keys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'];
        
        foreach ($ip_keys as $key) {
            if (isset($_SERVER[$key]) && filter_var($_SERVER[$key], FILTER_VALIDATE_IP)) {
                return $_SERVER[$key];
            }
        }
        
        return 'UNKNOWN';
    }

    /**
     * Get all active sessions
     */
    public static function get_all_active_sessions($outlet_id = null) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_sessions';

        $query = "SELECT * FROM $table WHERE ended_at IS NULL";
        $params = [];

        if ($outlet_id) {
            $query .= " AND outlet_id = %d";
            $params[] = $outlet_id;
        }

        $query .= " ORDER BY started_at DESC";

        if (!empty($params)) {
            return $wpdb->get_results($wpdb->prepare($query, $params));
        }

        return $wpdb->get_results($query);
    }

    /**
     * End all sessions for a user
     */
    public static function end_all_user_sessions($user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_sessions';

        return $wpdb->update(
            $table,
            ['ended_at' => current_time('mysql')],
            [
                'user_id' => $user_id,
                'ended_at' => null
            ],
            ['%s'],
            ['%d', '%s']
        );
    }
}
