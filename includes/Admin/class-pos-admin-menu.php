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

        add_action('admin_footer', [$this, 'output_admin_navigation_script']);
    }

    /**
     * Render POS app page (now redirects to shortcode page)
     */
    public function render_pos_app() {
        $this->render_admin_root();
    }

    /**
     * Render outlets management page (React SPA)
     */
    public function render_outlets_page() {
        $this->render_admin_root();
    }

    /**
     * Render drawers management page (React SPA)
     */
    public function render_drawers_page() {
        $this->render_admin_root();
    }

    /**
     * Render reports page (React SPA)
     */
    public function render_reports_page() {
        $this->render_admin_root();
    }

    /**
     * Render settings page (React SPA)
     */
    public function render_settings_page() {
        $this->render_admin_root();
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
                'symbol' => html_entity_decode(get_woocommerce_currency_symbol()),
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
                'products_per_row' => (int) get_option('store_pos_products_per_row', 4),
            ],
        ]);
    }

    /**
     * Enqueue Admin React SPA
     */
    private function enqueue_admin_spa() {
        $env = defined('STORE_POS_ENV') ? STORE_POS_ENV : 'production';
        $is_dev = ('development' === $env);
        $script_handle = 'store-pos-admin-app';
        $build_variant = $is_dev ? 'admin-dev-build' : 'admin-build';
        $assets_base = 'assets/js/' . $build_variant . '/';
        $manifest_path = STORE_POS_PLUGIN_DIR . $assets_base . '.vite/manifest.json';

        if (!file_exists($manifest_path)) {
            add_action('admin_notices', function() use ($is_dev) {
                ?>
                <div class="notice notice-warning">
                    <p>
                        <?php
                        if ($is_dev) {
                            esc_html_e('Admin development bundle not found. Run "npm run build:dev" or "npm run watch" in admin-app.', 'store-pos');
                        } else {
                            esc_html_e('Admin app not built yet. Run "npm run build" in the admin-app directory.', 'store-pos');
                        }
                        ?>
                    </p>
                </div>
                <?php
            });
            if ($is_dev) {
                error_log('[Store POS] Admin development build not found. Run "npm run build:dev" or "npm run watch" in admin-app.');
            }
            return;
        }

        $manifest = json_decode(file_get_contents($manifest_path), true);
        $entry = $manifest['index.html'] ?? null;

        if (!$entry || empty($entry['file'])) {
            return;
        }

        $js_relative = $entry['file'];
        $js_file_path = STORE_POS_PLUGIN_DIR . $assets_base . $js_relative;
        $js_version = file_exists($js_file_path) ? filemtime($js_file_path) : STORE_POS_VERSION;

        wp_enqueue_script(
            $script_handle,
            STORE_POS_PLUGIN_URL . $assets_base . $js_relative,
            [],
            $js_version,
            true
        );
        wp_script_add_data($script_handle, 'type', 'module');

        if (!empty($entry['css'])) {
            foreach ($entry['css'] as $css_file) {
                $css_file_path = STORE_POS_PLUGIN_DIR . $assets_base . $css_file;
                $css_version = file_exists($css_file_path) ? filemtime($css_file_path) : STORE_POS_VERSION;

                wp_enqueue_style(
                    'store-pos-admin-app-' . md5($css_file),
                    STORE_POS_PLUGIN_URL . $assets_base . $css_file,
                    [],
                    $css_version
                );
            }
        }

        // Pass configuration to React admin app
        $route_map = [
            'store-pos' => '/dashboard',
            'store-pos-outlets' => '/outlets',
            'store-pos-drawers' => '/drawers',
            'store-pos-reports' => '/reports',
            'store-pos-settings' => '/settings',
        ];

        $initial_route = '/dashboard';
        if (isset($_GET['page']) && is_string($_GET['page'])) {
            $page_param = sanitize_text_field(wp_unslash($_GET['page']));

            if (isset($route_map[$page_param])) {
                $initial_route = $route_map[$page_param];
            } elseif (strpos($page_param, '#') !== false) {
                $fragment = explode('#', $page_param)[1];
                if (!empty($fragment)) {
                    $initial_route = strpos($fragment, '/') === 0 ? $fragment : '/' . $fragment;
                }
            }
        }

        wp_localize_script('store-pos-admin-app', 'storePOSAdmin', [
            'restUrl' => rest_url('store-pos/v1'),
            'restNonce' => wp_create_nonce('wp_rest'),
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'initialRoute' => $initial_route,
            'currentUser' => [
                'id' => get_current_user_id(),
                'name' => wp_get_current_user()->display_name,
                'email' => wp_get_current_user()->user_email,
                'roles' => wp_get_current_user()->roles,
            ],
        ]);
    }

    /**
     * Render React admin root container
     */
    private function render_admin_root() {
        if (!Permissions::can_manage_pos() && !Permissions::can_manage_drawers() && !Permissions::can_view_reports()) {
            if (!Permissions::can_use_pos()) {
                wp_die(__('You do not have permission to access the POS.', 'store-pos'));
            }
        }

        echo '<div id="store-pos-admin-root"></div>';
    }

    /**
     * Output navigation script to convert submenu links to hash-based SPA routes
     */
    public function output_admin_navigation_script() {
        $screen = get_current_screen();
        if (!$screen || strpos($screen->id, 'store-pos') === false) {
            return;
        }

        $route_map = [
            'store-pos' => 'dashboard',
            'store-pos-outlets' => 'outlets',
            'store-pos-drawers' => 'drawers',
            'store-pos-reports' => 'reports',
            'store-pos-settings' => 'settings',
        ];

        $base_url = admin_url('admin.php?page=store-pos');
        ?>
        <script type="text/javascript">
        (function() {
            const routeMap = <?php echo wp_json_encode($route_map); ?>;
            const baseUrl = <?php echo wp_json_encode($base_url); ?>;

            function initMenuLinks() {
                const menu = document.getElementById('toplevel_page_store-pos');
                if (!menu) {
                    return;
                }

                // Update top-level link
                const topLink = menu.querySelector('> a.menu-top');
                if (topLink) {
                    topLink.href = baseUrl + '#dashboard';
                }

                // Update all submenu links
                const submenuLinks = menu.querySelectorAll('.wp-submenu a');
                submenuLinks.forEach(function(link) {
                    const href = link.getAttribute('href');
                    if (!href) {
                        return;
                    }

                    // Extract page parameter
                    const urlParts = href.split('?');
                    if (urlParts.length < 2) {
                        return;
                    }

                    const params = new URLSearchParams(urlParts[1]);
                    const page = params.get('page');

                    if (page && routeMap[page]) {
                        // Rewrite link to use hash routing
                        link.href = baseUrl + '#' + routeMap[page];

                        // Add click handler to ensure navigation works
                        link.addEventListener('click', function(e) {
                            e.preventDefault();
                            window.location.href = baseUrl + '#' + routeMap[page];
                        });
                    }
                });
            }

            // Initialize on DOM ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initMenuLinks);
            } else {
                initMenuLinks();
            }

            // Re-initialize on AJAX complete (for WordPress admin)
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof jQuery !== 'undefined') {
                    jQuery(document).on('ajaxComplete', function() {
                        setTimeout(initMenuLinks, 100);
                    });
                }
            });
        })();
        </script>
        <?php
    }
}
