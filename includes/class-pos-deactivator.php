<?php
/**
 * Fired during plugin deactivation
 *
 * @package StorePOS
 */

namespace StorePOS;

class Deactivator {

    /**
     * Deactivate the plugin
     */
    public static function deactivate() {
        // Close all open drawer sessions
        self::close_open_sessions();

        // Flush rewrite rules
        flush_rewrite_rules();

        // Log deactivation
        if (class_exists('StorePOS\Models\Logger')) {
            Models\Logger::log('plugin_deactivated', 'system', null, 'Store POS plugin deactivated');
        }
    }

    /**
     * Close all open drawer sessions
     */
    private static function close_open_sessions() {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_drawer_sessions';

        $wpdb->update(
            $table,
            [
                'status' => 'closed_auto',
                'closed_at' => current_time('mysql'),
                'notes' => __('Automatically closed during plugin deactivation', 'store-pos')
            ],
            ['status' => 'open'],
            ['%s', '%s', '%s'],
            ['%s']
        );
    }
}
