<?php
/**
 * Database schema management
 *
 * @package StorePOS\Database
 */

namespace StorePOS\Database;

class DBSchema {

    /**
     * Get database version
     */
    public static function get_version() {
        return get_option('store_pos_db_version', '1.0.0');
    }

    /**
     * Set database version
     */
    public static function set_version($version) {
        update_option('store_pos_db_version', $version);
    }

    /**
     * Check if migration is needed
     */
    public static function needs_migration() {
        $current_version = self::get_version();
        return version_compare($current_version, STORE_POS_VERSION, '<');
    }

    /**
     * Run migrations
     */
    public static function migrate() {
        $current_version = self::get_version();

        // Add future migrations here as needed
        // Example:
        // if (version_compare($current_version, '1.1.0', '<')) {
        //     self::migrate_to_1_1_0();
        // }

        self::set_version(STORE_POS_VERSION);
    }

    /**
     * Verify database tables exist
     */
    public static function verify_tables() {
        global $wpdb;
        $prefix = $wpdb->prefix;

        $required_tables = [
            $prefix . 'wc_pos_outlets',
            $prefix . 'wc_pos_drawers',
            $prefix . 'wc_pos_drawer_sessions',
            $prefix . 'wc_pos_sessions',
            $prefix . 'wc_pos_logs',
            $prefix . 'wc_pos_settings'
        ];

        $missing_tables = [];

        foreach ($required_tables as $table) {
            $result = $wpdb->get_var("SHOW TABLES LIKE '$table'");
            if ($result !== $table) {
                $missing_tables[] = $table;
            }
        }

        return $missing_tables;
    }
}
