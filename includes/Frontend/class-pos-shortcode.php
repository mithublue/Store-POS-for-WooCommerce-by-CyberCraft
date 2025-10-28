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
        $script_handle = 'store-pos-app';
        $env = defined('STORE_POS_ENV') ? STORE_POS_ENV : 'production';
        $is_dev = ('development' === $env);
        $build_variant = $is_dev ? 'dev-build' : 'build';
        $assets_base = 'assets/js/' . $build_variant . '/';
        $manifest_path = STORE_POS_PLUGIN_DIR . $assets_base . '.vite/manifest.json';

        if (!file_exists($manifest_path)) {
            if ($is_dev) {
                error_log('[Store POS] Development build not found. Run "npm run build:dev" or "npm run watch" in pos-app.');
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
                    'store-pos-app-' . md5($css_file),
                    STORE_POS_PLUGIN_URL . $assets_base . $css_file,
                    [],
                    $css_version
                );
            }
        }

        // Pass configuration to React app
        $current_url = add_query_arg([]);
        $current_path = wp_parse_url($current_url, PHP_URL_PATH);
        $basename = $current_path ? untrailingslashit($current_path) : '/';

        if ($basename === '') {
            $basename = '/';
        }

        if (wp_script_is($script_handle, 'enqueued')) {
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
    }

}
