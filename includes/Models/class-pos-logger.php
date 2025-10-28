<?php
/**
 * Logger model
 *
 * @package StorePOS\Models
 */

namespace StorePOS\Models;

class Logger {

    /**
     * Log an action
     */
    public static function log($action, $context = null, $reference_id = null, $message = '', $user_id = null) {
        global $wpdb;

        if (!$user_id) {
            $user_id = get_current_user_id();
        }

        $table = $wpdb->prefix . 'wc_pos_logs';

        return $wpdb->insert(
            $table,
            [
                'user_id' => $user_id ?: null,
                'action' => sanitize_text_field($action),
                'context' => sanitize_text_field($context),
                'reference_id' => absint($reference_id),
                'message' => wp_kses_post($message),
                'created_at' => current_time('mysql')
            ],
            ['%d', '%s', '%s', '%d', '%s', '%s']
        );
    }

    /**
     * Get logs
     */
    public static function get_logs($args = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_logs';

        $defaults = [
            'user_id' => null,
            'action' => null,
            'context' => null,
            'limit' => 50,
            'offset' => 0,
            'orderby' => 'created_at',
            'order' => 'DESC'
        ];

        $args = wp_parse_args($args, $defaults);

        $where = ['1=1'];
        $where_values = [];

        if ($args['user_id']) {
            $where[] = 'user_id = %d';
            $where_values[] = $args['user_id'];
        }

        if ($args['action']) {
            $where[] = 'action = %s';
            $where_values[] = $args['action'];
        }

        if ($args['context']) {
            $where[] = 'context = %s';
            $where_values[] = $args['context'];
        }

        $where_clause = implode(' AND ', $where);
        $orderby = sanitize_sql_orderby("{$args['orderby']} {$args['order']}");

        $query = "SELECT * FROM $table WHERE $where_clause ORDER BY $orderby LIMIT %d OFFSET %d";
        $where_values[] = $args['limit'];
        $where_values[] = $args['offset'];

        if (!empty($where_values)) {
            $query = $wpdb->prepare($query, $where_values);
        }

        return $wpdb->get_results($query);
    }

    /**
     * Delete old logs
     */
    public static function cleanup_old_logs($days = 90) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_logs';
        $date = date('Y-m-d H:i:s', strtotime("-{$days} days"));

        return $wpdb->query($wpdb->prepare(
            "DELETE FROM $table WHERE created_at < %s",
            $date
        ));
    }
}
