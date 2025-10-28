<?php
/**
 * Plugin Name: Store POS by CyberCraft
 * Plugin URI: https://cybercraft.co
 * Description: A comprehensive WooCommerce POS system with multi-outlet management, barcode scanning, Typesense search, and HPOS compatibility.
 * Version: 1.0.0
 * Author: Mithu A Quayium
 * Author URI: https://cybercraft.co
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: store-pos
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * WC requires at least: 7.0
 * WC tested up to: 8.5
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

/**
 * Current plugin version.
 */
define('STORE_POS_VERSION', '1.0.0');
define('STORE_POS_PLUGIN_FILE', __FILE__);
define('STORE_POS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('STORE_POS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('STORE_POS_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Load .env file if present
$env_file = STORE_POS_PLUGIN_DIR . '.env';
if (file_exists($env_file) && is_readable($env_file)) {
    $env_lines = file($env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($env_lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        if (strpos($line, '=') !== false) {
            list($name, $value) = array_map('trim', explode('=', $line, 2));
            if ($name !== '' && !getenv($name)) {
                putenv("{$name}={$value}");
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
            }
        }
    }
}

if (!defined('STORE_POS_ENV')) {
    $default_env = getenv('STORE_POS_ENV') ?: 'production';
    define('STORE_POS_ENV', apply_filters('store_pos_environment', $default_env));
}

if (!defined('STORE_POS_POS_DEV_SERVER')) {
    $default_pos_dev = getenv('STORE_POS_POS_DEV_SERVER') ?: 'http://localhost:3000';
    define('STORE_POS_POS_DEV_SERVER', apply_filters('store_pos_pos_dev_server', $default_pos_dev));
}

if (!defined('STORE_POS_ADMIN_DEV_SERVER')) {
    $default_admin_dev = getenv('STORE_POS_ADMIN_DEV_SERVER') ?: 'http://localhost:3100';
    define('STORE_POS_ADMIN_DEV_SERVER', apply_filters('store_pos_admin_dev_server', $default_admin_dev));
}

/**
 * Composer autoloader.
 */
if (file_exists(STORE_POS_PLUGIN_DIR . 'vendor/autoload.php')) {
    require_once STORE_POS_PLUGIN_DIR . 'vendor/autoload.php';
}

/**
 * The code that runs during plugin activation.
 */
function activate_store_pos() {
    require_once STORE_POS_PLUGIN_DIR . 'includes/class-pos-activator.php';
    StorePOS\Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_store_pos() {
    require_once STORE_POS_PLUGIN_DIR . 'includes/class-pos-deactivator.php';
    StorePOS\Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_store_pos');
register_deactivation_hook(__FILE__, 'deactivate_store_pos');

/**
 * Check if WooCommerce is active
 */
function store_pos_check_woocommerce() {
    if (!class_exists('WooCommerce')) {
        add_action('admin_notices', function() {
            ?>
            <div class="notice notice-error">
                <p><?php _e('Store POS requires WooCommerce to be installed and active.', 'store-pos'); ?></p>
            </div>
            <?php
        });
        return false;
    }
    return true;
}

/**
 * Declare HPOS compatibility
 */
add_action('before_woocommerce_init', function() {
    if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
    }
});

/**
 * Begin execution of the plugin.
 */
function run_store_pos() {
    if (!store_pos_check_woocommerce()) {
        return;
    }

    require_once STORE_POS_PLUGIN_DIR . 'includes/class-pos-loader.php';
    $plugin = new StorePOS\Loader();
    $plugin->run();
}

add_action('plugins_loaded', 'run_store_pos');
