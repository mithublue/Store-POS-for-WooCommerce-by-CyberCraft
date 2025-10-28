<?php
/**
 * Core plugin loader
 *
 * @package StorePOS
 */

namespace StorePOS;

class Loader {

    /**
     * The array of actions registered with WordPress.
     */
    protected $actions;

    /**
     * The array of filters registered with WordPress.
     */
    protected $filters;

    /**
     * Initialize the collections used to maintain the actions and filters.
     */
    public function __construct() {
        $this->actions = [];
        $this->filters = [];

        $this->load_dependencies();
        $this->define_admin_hooks();
        $this->define_api_hooks();
        $this->define_frontend_hooks();
    }

    /**
     * Load the required dependencies for this plugin.
     */
    private function load_dependencies() {
        // Traits
        require_once STORE_POS_PLUGIN_DIR . 'includes/Traits/trait-singleton.php';

        // Helpers
        require_once STORE_POS_PLUGIN_DIR . 'includes/Helpers/class-pos-utils.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/Helpers/class-pos-permissions.php';

        // Database
        require_once STORE_POS_PLUGIN_DIR . 'includes/Database/class-pos-db-schema.php';

        // Models
        require_once STORE_POS_PLUGIN_DIR . 'includes/Models/class-pos-outlet.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/Models/class-pos-drawer.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/Models/class-pos-session.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/Models/class-pos-logger.php';

        // Admin
        require_once STORE_POS_PLUGIN_DIR . 'includes/Admin/class-pos-admin-menu.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/Admin/class-pos-settings.php';

        // API
        require_once STORE_POS_PLUGIN_DIR . 'includes/API/class-pos-rest-controller.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/API/class-pos-products-api.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/API/class-pos-orders-api.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/API/class-pos-customers-api.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/API/class-pos-outlets-api.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/API/class-pos-drawers-api.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/API/class-pos-coupons-api.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/API/class-pos-reports-api.php';

        // Frontend
        require_once STORE_POS_PLUGIN_DIR . 'includes/Frontend/class-pos-frontend.php';
        require_once STORE_POS_PLUGIN_DIR . 'includes/Frontend/class-pos-shortcode.php';
    }

    /**
     * Register all admin-related hooks.
     */
    private function define_admin_hooks() {
        $admin_menu = new Admin\AdminMenu();
        $settings = new Admin\Settings();

        $this->add_action('admin_menu', $admin_menu, 'register_menus');
        $this->add_action('admin_init', $settings, 'register_settings');
        $this->add_action('admin_enqueue_scripts', $admin_menu, 'enqueue_admin_assets');
    }

    /**
     * Register all API-related hooks.
     */
    private function define_api_hooks() {
        $this->add_action('rest_api_init', $this, 'register_rest_routes');
    }

    /**
     * Register all frontend-related hooks.
     */
    private function define_frontend_hooks() {
        $frontend = new Frontend\POSFrontend();
        $shortcode = new Frontend\POSShortcode();
        
        $this->add_action('wp_enqueue_scripts', $frontend, 'enqueue_assets');
        $this->add_action('init', $shortcode, 'register');
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        $controllers = [
            new API\ProductsAPI(),
            new API\OrdersAPI(),
            new API\CustomersAPI(),
            new API\OutletsAPI(),
            new API\DrawersAPI(),
            new API\CouponsAPI(),
            new API\ReportsAPI(),
        ];

        foreach ($controllers as $controller) {
            $controller->register_routes();
        }
    }

    /**
     * Add a new action to the collection to be registered with WordPress.
     */
    public function add_action($hook, $component, $callback, $priority = 10, $accepted_args = 1) {
        $this->actions = $this->add($this->actions, $hook, $component, $callback, $priority, $accepted_args);
    }

    /**
     * Add a new filter to the collection to be registered with WordPress.
     */
    public function add_filter($hook, $component, $callback, $priority = 10, $accepted_args = 1) {
        $this->filters = $this->add($this->filters, $hook, $component, $callback, $priority, $accepted_args);
    }

    /**
     * A utility function that is used to register the actions and hooks into a single collection.
     */
    private function add($hooks, $hook, $component, $callback, $priority, $accepted_args) {
        $hooks[] = [
            'hook'          => $hook,
            'component'     => $component,
            'callback'      => $callback,
            'priority'      => $priority,
            'accepted_args' => $accepted_args
        ];

        return $hooks;
    }

    /**
     * Register the filters and actions with WordPress.
     */
    public function run() {
        foreach ($this->filters as $hook) {
            add_filter($hook['hook'], [$hook['component'], $hook['callback']], $hook['priority'], $hook['accepted_args']);
        }

        foreach ($this->actions as $hook) {
            add_action($hook['hook'], [$hook['component'], $hook['callback']], $hook['priority'], $hook['accepted_args']);
        }
    }
}
