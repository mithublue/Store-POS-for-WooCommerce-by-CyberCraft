<?php
/**
 * POS Shortcode Handler
 *
 * @package StorePOS\Frontend
 */

namespace StorePOS\Frontend;

use StorePOS\Helpers\Permissions;

class POSShortcode {

    /**
     * Register shortcode
     */
    public function register() {
        add_shortcode('store_pos', [$this, 'render_pos']);
    }

    /**
     * Render POS shortcode
     */
    public function render_pos($atts) {
        // Check permissions
        if (!Permissions::can_use_pos()) {
            return '<div class="store-pos-error"><p>' . __('You do not have permission to access the POS.', 'store-pos') . '</p></div>';
        }

        // Enqueue POS assets
        $this->enqueue_pos_assets();

        // Return POS container
        return '<div id="store-pos-app" class="store-pos-frontend"></div>';
    }

    /**
     * Enqueue POS assets
     */
    private function enqueue_pos_assets() {
        $manifest_path = STORE_POS_PLUGIN_DIR . 'assets/js/build/.vite/manifest.json';
        
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
        }

        // Pass configuration to React app
        $current_url = add_query_arg([]);
        $current_path = wp_parse_url($current_url, PHP_URL_PATH);
        $basename = $current_path ? untrailingslashit($current_path) : '/';

        if ($basename === '') {
            $basename = '/';
        }

        wp_localize_script('store-pos-app', 'storePOSConfig', [
            'restUrl' => rest_url('store-pos/v1'),
            'restNonce' => wp_create_nonce('wp_rest'),
            'basename' => $basename,
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
}
