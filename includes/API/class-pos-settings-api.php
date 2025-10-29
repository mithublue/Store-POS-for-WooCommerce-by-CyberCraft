<?php
/**
 * POS Settings REST API Controller
 *
 * @package StorePOS\API
 */

namespace StorePOS\API;

class SettingsAPI extends RESTController {

    /**
     * Map of exposed settings.
     *
     * @var array<string, array<string, mixed>>
     */
    private static $settings_map = [
        'theme' => [
            'option'  => 'store_pos_theme',
            'type'    => 'string',
            'default' => 'light',
            'allowed' => ['light', 'dark'],
        ],
        'layout' => [
            'option'  => 'store_pos_layout',
            'type'    => 'string',
            'default' => 'classic',
            'allowed' => ['classic', 'compact'],
        ],
        'auto_print' => [
            'option'  => 'store_pos_auto_print',
            'type'    => 'boolean',
            'default' => 'yes',
        ],
        'barcode_format' => [
            'option'  => 'store_pos_barcode_format',
            'type'    => 'string',
            'default' => 'ean13',
            'allowed' => ['ean13', 'code128', 'upc'],
        ],
        'barcode_field' => [
            'option'  => 'store_pos_barcode_field',
            'type'    => 'string',
            'default' => '_sku',
            'allowed' => ['_sku', '_barcode', 'id'],
        ],
        'calculate_fee_tax' => [
            'option'  => 'store_pos_calculate_fee_tax',
            'type'    => 'boolean',
            'default' => 'no',
        ],
        'tax_display' => [
            'option'  => 'store_pos_tax_display',
            'type'    => 'string',
            'default' => 'incl',
            'allowed' => ['incl', 'excl'],
        ],
        'tax_rounding' => [
            'option'  => 'store_pos_tax_rounding',
            'type'    => 'string',
            'default' => 'nearest',
            'allowed' => ['nearest', 'up', 'down'],
        ],
        'products_per_row' => [
            'option'  => 'store_pos_products_per_row',
            'type'    => 'integer',
            'default' => 4,
            'min'     => 1,
            'max'     => 6,
        ],
        'receipt_header' => [
            'option'  => 'store_pos_receipt_header',
            'type'    => 'html',
            'default' => '',
        ],
        'receipt_footer' => [
            'option'  => 'store_pos_receipt_footer',
            'type'    => 'html',
            'default' => '',
        ],
    ];

    /**
     * Register routes.
     */
    public function register_routes() {
        register_rest_route($this->namespace, '/settings', [
            'methods'             => \WP_REST_Server::READABLE,
            'callback'            => [$this, 'get_settings'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'manage_pos');
            },
        ]);

        register_rest_route($this->namespace, '/settings', [
            'methods'             => \WP_REST_Server::EDITABLE,
            'callback'            => [$this, 'update_settings'],
            'permission_callback' => function($request) {
                return $this->check_permission($request, 'manage_pos');
            },
        ]);
    }

    /**
     * Handle GET /settings.
     */
    public function get_settings($request) {
        return $this->success_response(self::get_settings_data());
    }

    /**
     * Handle POST /settings.
     */
    public function update_settings($request) {
        $params = $request->get_json_params();
        if (!is_array($params)) {
            $params = [];
        }

        foreach (self::$settings_map as $key => $config) {
            if (!array_key_exists($key, $params)) {
                continue;
            }

            $sanitized = self::sanitize_setting($key, $params[$key]);
            update_option($config['option'], $sanitized['stored']);
        }

        return $this->success_response(self::get_settings_data(), __('Settings saved successfully.', 'store-pos'));
    }

    /**
     * Gather all settings with normalized values.
     */
    public static function get_settings_data() {
        $data = [];

        foreach (self::$settings_map as $key => $config) {
            $stored = get_option($config['option'], $config['default']);
            $data[$key] = self::normalize_setting($key, $stored);
        }

        return $data;
    }

    /**
     * Normalize value for response.
     */
    private static function normalize_setting($key, $value) {
        $config = self::$settings_map[$key];

        switch ($config['type']) {
            case 'boolean':
                return $value === true || $value === 'yes' || $value === 1;
            case 'integer':
                return (int) $value;
            case 'html':
                return is_string($value) ? wp_kses_post($value) : '';
            default:
                if (!is_string($value)) {
                    $value = (string) $config['default'];
                }
                if (!empty($config['allowed']) && !in_array($value, $config['allowed'], true)) {
                    $value = $config['default'];
                }
                return $value;
        }
    }

    /**
     * Sanitize incoming value and prepare stored & normalized variants.
     */
    private static function sanitize_setting($key, $value) {
        $config = self::$settings_map[$key];

        switch ($config['type']) {
            case 'boolean':
                $bool = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                if ($bool === null) {
                    $bool = $config['default'] === 'yes';
                }
                return [
                    'stored'     => $bool ? 'yes' : 'no',
                    'normalized' => $bool,
                ];

            case 'integer':
                $int = (int) $value;
                if (isset($config['min'])) {
                    $int = max($config['min'], $int);
                }
                if (isset($config['max'])) {
                    $int = min($config['max'], $int);
                }
                return [
                    'stored'     => $int,
                    'normalized' => $int,
                ];

            case 'html':
                $sanitized = is_string($value) ? wp_kses_post($value) : '';
                return [
                    'stored'     => $sanitized,
                    'normalized' => $sanitized,
                ];

            case 'string':
            default:
                $string = is_string($value) ? sanitize_text_field($value) : (string) $config['default'];
                if (!empty($config['allowed']) && !in_array($string, $config['allowed'], true)) {
                    $string = $config['default'];
                }
                return [
                    'stored'     => $string,
                    'normalized' => $string,
                ];
        }
    }
}
