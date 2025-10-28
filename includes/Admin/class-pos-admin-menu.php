<?php
/**
 * Admin menu management
 *
 * @package StorePOS\Admin
 */

namespace StorePOS\Admin;

use StorePOS\Helpers\Permissions;

class AdminMenu {

    /**
     * Register admin menus
     */
    public function register_menus() {
        // Main POS menu
        add_menu_page(
            __('Store POS', 'store-pos'),
            __('Store POS', 'store-pos'),
            'use_pos',
            'store-pos',
            [$this, 'render_pos_app'],
            'dashicons-cart',
            30
        );

        // POS Dashboard (same as main)
        add_submenu_page(
            'store-pos',
            __('POS Terminal', 'store-pos'),
            __('POS Terminal', 'store-pos'),
            'use_pos',
            'store-pos',
            [$this, 'render_pos_app']
        );

        // Outlets
        add_submenu_page(
            'store-pos',
            __('Outlets', 'store-pos'),
            __('Outlets', 'store-pos'),
            'manage_pos',
            'store-pos-outlets',
            [$this, 'render_outlets_page']
        );

        // Drawers
        add_submenu_page(
            'store-pos',
            __('Drawers', 'store-pos'),
            __('Drawers', 'store-pos'),
            'manage_drawers',
            'store-pos-drawers',
            [$this, 'render_drawers_page']
        );

        // Reports
        add_submenu_page(
            'store-pos',
            __('Reports', 'store-pos'),
            __('Reports', 'store-pos'),
            'view_pos_reports',
            'store-pos-reports',
            [$this, 'render_reports_page']
        );

        // Settings
        add_submenu_page(
            'store-pos',
            __('Settings', 'store-pos'),
            __('Settings', 'store-pos'),
            'manage_pos',
            'store-pos-settings',
            [$this, 'render_settings_page']
        );
    }

    /**
     * Render POS app page (now redirects to shortcode page)
     */
    public function render_pos_app() {
        if (!Permissions::can_use_pos()) {
            wp_die(__('You do not have permission to access the POS.', 'store-pos'));
        }

        // Redirect to POS shortcode page or render inline
        echo '<div class="wrap">';
        echo '<div class="notice notice-info"><p>';
        echo __('Use the shortcode <code>[store_pos]</code> on any page to display the POS terminal.', 'store-pos');
        echo '</p></div>';
        echo '<div id="store-pos-app" class="store-pos-wrapper"></div>';
        echo '</div>';
    }

    /**
     * Render outlets management page (React SPA)
     */
    public function render_outlets_page() {
        echo '<div id="store-pos-admin-root"></div>';
    }

    /**
     * Render drawers management page (React SPA)
     */
    public function render_drawers_page() {
        echo '<div id="store-pos-admin-root"></div>';
    }

    /**
     * Render reports page (React SPA)
     */
    public function render_reports_page() {
        echo '<div id="store-pos-admin-root"></div>';
    }

    /**
     * Render settings page (React SPA)
     */
    public function render_settings_page() {
        echo '<div id="store-pos-admin-root"></div>';
    }

    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets($hook) {
        // Only load on our plugin pages
        if (strpos($hook, 'store-pos') === false) {
            return;
        }

        // Load React app on POS terminal page
        if ($hook === 'toplevel_page_store-pos') {
            $this->enqueue_pos_app();
        } else {
            // Load React Admin SPA for other admin pages
            $this->enqueue_admin_spa();
        }
    }

    /**
     * Enqueue POS React app
     */
    private function enqueue_pos_app() {
        $manifest_path = STORE_POS_PLUGIN_DIR . 'assets/js/build/manifest.json';
        
        // Check if build exists
        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);
            
            if (isset($manifest['index.html'])) {
                // Production build
                wp_enqueue_script(
                    'store-pos-app',
                    STORE_POS_PLUGIN_URL . 'assets/js/build/' . $manifest['index.html']['file'],
                    [],
                    STORE_POS_VERSION,
                    true
                );

                wp_script_add_data('store-pos-app', 'type', 'module');

                if (isset($manifest['index.html']['css'])) {
                    foreach ($manifest['index.html']['css'] as $css_file) {
                        wp_enqueue_style(
                            'store-pos-app-' . md5($css_file),
                            STORE_POS_PLUGIN_URL . 'assets/js/build/' . $css_file,
                            [],
                            STORE_POS_VERSION
                        );
                    }
                }
            }
        } else {
            // Development mode - show instruction
            add_action('admin_notices', function() {
                ?>
                <div class="notice notice-warning">
                    <p><?php _e('POS app not built yet. Run <code>npm run build</code> in the plugin directory.', 'store-pos'); ?></p>
                </div>
                <?php
            });
        }

        // Pass configuration to React app
        wp_localize_script('store-pos-app', 'storePOSConfig', [
            'restUrl' => rest_url('store-pos/v1'),
            'restNonce' => wp_create_nonce('wp_rest'),
            'currentUser' => [
                'id' => get_current_user_id(),
                'name' => wp_get_current_user()->display_name,
                'email' => wp_get_current_user()->user_email,
                'roles' => wp_get_current_user()->roles,
            ],
            'currency' => [
                'code' => get_woocommerce_currency(),
                'symbol' => get_woocommerce_currency_symbol(),
                'position' => get_option('woocommerce_currency_pos'),
                'decimal_separator' => wc_get_price_decimal_separator(),
                'thousand_separator' => wc_get_price_thousand_separator(),
                'decimals' => wc_get_price_decimals(),
            ],
            'settings' => [
                'tax_display' => get_option('store_pos_tax_display', 'incl'),
                'auto_print' => get_option('store_pos_auto_print', 'yes'),
                'barcode_field' => get_option('store_pos_barcode_field', '_sku'),
                'enable_typesense' => get_option('store_pos_enable_typesense', 'no'),
            ],
        ]);
    }

    /**
     * Enqueue Admin React SPA
     */
    private function enqueue_admin_spa() {
        $manifest_path = STORE_POS_PLUGIN_DIR . 'assets/js/admin-build/.vite/manifest.json';
        
        // Check if build exists
        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);
            
            if (isset($manifest['index.html'])) {
                // Production build
                wp_enqueue_script(
                    'store-pos-admin-app',
                    STORE_POS_PLUGIN_URL . 'assets/js/admin-build/' . $manifest['index.html']['file'],
                    [],
                    STORE_POS_VERSION,
                    true
                );

                wp_script_add_data('store-pos-admin-app', 'type', 'module');

                if (isset($manifest['index.html']['css'])) {
                    foreach ($manifest['index.html']['css'] as $css_file) {
                        wp_enqueue_style(
                            'store-pos-admin-app-' . md5($css_file),
                            STORE_POS_PLUGIN_URL . 'assets/js/admin-build/' . $css_file,
                            [],
                            STORE_POS_VERSION
                        );
                    }
                }
            }
        } else {
            // Development mode - show instruction
            add_action('admin_notices', function() {
                ?>
                <div class="notice notice-warning">
                    <p><?php _e('Admin app not built yet. Run <code>npm run build</code> in the admin-app directory.', 'store-pos'); ?></p>
                </div>
                <?php
            });
        }

        // Pass configuration to React admin app
        wp_localize_script('store-pos-admin-app', 'storePOSAdmin', [
            'restUrl' => rest_url('store-pos/v1'),
            'restNonce' => wp_create_nonce('wp_rest'),
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'currentUser' => [
                'id' => get_current_user_id(),
                'name' => wp_get_current_user()->display_name,
                'email' => wp_get_current_user()->user_email,
                'roles' => wp_get_current_user()->roles,
            ],
        ]);
    }
}
