<?php
/**
 * Fired during plugin activation
 *
 * @package StorePOS
 */

namespace StorePOS;

class Activator {

    /**
     * Activate the plugin
     */
    public static function activate() {
        // Check WooCommerce
        if (!class_exists('WooCommerce')) {
            deactivate_plugins(STORE_POS_PLUGIN_BASENAME);
            wp_die(__('Store POS requires WooCommerce to be installed and active.', 'store-pos'));
        }

        // Check PHP version
        if (version_compare(PHP_VERSION, '7.4', '<')) {
            deactivate_plugins(STORE_POS_PLUGIN_BASENAME);
            wp_die(__('Store POS requires PHP 7.4 or higher.', 'store-pos'));
        }

        // Create database tables
        self::create_tables();

        // Create custom roles
        self::create_roles();

        // Set default options
        self::set_default_options();

        // Flush rewrite rules
        flush_rewrite_rules();

        // Set activation flag
        update_option('store_pos_activated', time());
        update_option('store_pos_version', STORE_POS_VERSION);
    }

    /**
     * Create custom database tables
     */
    private static function create_tables() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();
        $table_prefix = $wpdb->prefix;

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        // Outlets table
        $sql_outlets = "CREATE TABLE IF NOT EXISTS `{$table_prefix}wc_pos_outlets` (
            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            `name` varchar(191) NOT NULL,
            `slug` varchar(191) DEFAULT NULL,
            `address` text,
            `phone` varchar(50),
            `timezone` varchar(50) DEFAULT 'UTC',
            `manager_user_id` bigint(20) unsigned DEFAULT NULL,
            `status` varchar(20) DEFAULT 'active',
            `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
            `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`),
            UNIQUE KEY `slug` (`slug`)
        ) $charset_collate;";

        // Drawers table
        $sql_drawers = "CREATE TABLE IF NOT EXISTS `{$table_prefix}wc_pos_drawers` (
            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            `outlet_id` bigint(20) unsigned NOT NULL,
            `name` varchar(191) NOT NULL,
            `printer` varchar(191) DEFAULT NULL,
            `status` varchar(20) DEFAULT 'active',
            `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`),
            KEY `outlet_id` (`outlet_id`)
        ) $charset_collate;";

        // Drawer sessions table
        $sql_drawer_sessions = "CREATE TABLE IF NOT EXISTS `{$table_prefix}wc_pos_drawer_sessions` (
            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            `drawer_id` bigint(20) unsigned NOT NULL,
            `opened_by` bigint(20) unsigned NOT NULL,
            `opened_at` datetime NOT NULL,
            `opening_balance` decimal(12,2) DEFAULT 0.00,
            `closed_by` bigint(20) unsigned DEFAULT NULL,
            `closed_at` datetime DEFAULT NULL,
            `closing_balance` decimal(12,2) DEFAULT NULL,
            `notes` text,
            `status` varchar(20) DEFAULT 'open',
            PRIMARY KEY (`id`),
            KEY `drawer_id` (`drawer_id`),
            KEY `opened_by` (`opened_by`)
        ) $charset_collate;";

        // Sessions table
        $sql_sessions = "CREATE TABLE IF NOT EXISTS `{$table_prefix}wc_pos_sessions` (
            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            `user_id` bigint(20) unsigned NOT NULL,
            `drawer_session_id` bigint(20) unsigned DEFAULT NULL,
            `outlet_id` bigint(20) unsigned DEFAULT NULL,
            `started_at` datetime DEFAULT CURRENT_TIMESTAMP,
            `ended_at` datetime DEFAULT NULL,
            `metadata` longtext,
            PRIMARY KEY (`id`),
            KEY `user_id` (`user_id`),
            KEY `drawer_session_id` (`drawer_session_id`)
        ) $charset_collate;";

        // Logs table
        $sql_logs = "CREATE TABLE IF NOT EXISTS `{$table_prefix}wc_pos_logs` (
            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            `user_id` bigint(20) unsigned DEFAULT NULL,
            `action` varchar(191) NOT NULL,
            `context` varchar(191) DEFAULT NULL,
            `reference_id` bigint(20) unsigned DEFAULT NULL,
            `message` longtext,
            `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`),
            KEY `user_id` (`user_id`),
            KEY `action` (`action`)
        ) $charset_collate;";

        // Settings table
        $sql_settings = "CREATE TABLE IF NOT EXISTS `{$table_prefix}wc_pos_settings` (
            `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
            `option_key` varchar(191) NOT NULL,
            `option_value` longtext,
            PRIMARY KEY (`id`),
            UNIQUE KEY `option_key` (`option_key`)
        ) $charset_collate;";

        // Execute table creation
        dbDelta($sql_outlets);
        dbDelta($sql_drawers);
        dbDelta($sql_drawer_sessions);
        dbDelta($sql_sessions);
        dbDelta($sql_logs);
        dbDelta($sql_settings);
    }

    /**
     * Create custom user roles
     */
    private static function create_roles() {
        // POS Manager role
        add_role('pos_manager', __('POS Manager', 'store-pos'), [
            'read' => true,
            'manage_pos' => true,
            'view_pos_reports' => true,
            'manage_drawers' => true,
            'manage_outlets' => true,
            'adjust_inventory' => true,
            'apply_discounts' => true,
        ]);

        // POS Cashier role
        add_role('pos_cashier', __('POS Cashier', 'store-pos'), [
            'read' => true,
            'use_pos' => true,
            'process_sales' => true,
            'apply_coupons' => true,
        ]);

        // Add capabilities to administrator
        $admin = get_role('administrator');
        if ($admin) {
            $admin->add_cap('manage_pos');
            $admin->add_cap('view_pos_reports');
            $admin->add_cap('manage_drawers');
            $admin->add_cap('manage_outlets');
        }
    }

    /**
     * Set default plugin options
     */
    private static function set_default_options() {
        $defaults = [
            'store_pos_currency_symbol' => get_woocommerce_currency_symbol(),
            'store_pos_tax_display' => 'incl',
            'store_pos_auto_print' => 'yes',
            'store_pos_barcode_field' => '_sku',
            'store_pos_enable_typesense' => 'no',
            'store_pos_typesense_host' => '',
            'store_pos_typesense_port' => '8108',
            'store_pos_typesense_protocol' => 'http',
            'store_pos_typesense_api_key' => '',
        ];

        foreach ($defaults as $key => $value) {
            if (get_option($key) === false) {
                add_option($key, $value);
            }
        }
    }
}
