<?php
/**
 * Utility helper functions
 *
 * @package StorePOS\Helpers
 */

namespace StorePOS\Helpers;

class Utils {

    /**
     * Format price for display
     */
    public static function format_price($price) {
        return wc_price($price);
    }

    /**
     * Sanitize currency value
     */
    public static function sanitize_currency($value) {
        return floatval(str_replace(',', '', $value));
    }

    /**
     * Generate unique session token
     */
    public static function generate_session_token() {
        return wp_generate_password(32, false);
    }

    /**
     * Get current user outlet
     */
    public static function get_user_outlet($user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        return get_user_meta($user_id, '_pos_outlet_id', true);
    }

    /**
     * Set current user outlet
     */
    public static function set_user_outlet($outlet_id, $user_id = null) {
        if (!$user_id) {
            $user_id = get_current_user_id();
        }
        return update_user_meta($user_id, '_pos_outlet_id', $outlet_id);
    }

    /**
     * Check if HPOS is enabled
     */
    public static function is_hpos_enabled() {
        return class_exists('\Automattic\WooCommerce\Utilities\OrderUtil') 
            && \Automattic\WooCommerce\Utilities\OrderUtil::custom_orders_table_usage_is_enabled();
    }

    /**
     * Get order using HPOS-compatible method
     */
    public static function get_order($order_id) {
        return wc_get_order($order_id);
    }

    /**
     * Format date for display
     */
    public static function format_date($date, $format = null) {
        if (!$format) {
            $format = get_option('date_format') . ' ' . get_option('time_format');
        }
        return date_i18n($format, strtotime($date));
    }

    /**
     * Generate barcode format
     */
    public static function generate_barcode($length = 13) {
        $barcode = '';
        for ($i = 0; $i < $length - 1; $i++) {
            $barcode .= rand(0, 9);
        }
        // Add check digit (simplified EAN-13)
        $barcode .= self::calculate_check_digit($barcode);
        return $barcode;
    }

    /**
     * Calculate check digit for barcode
     */
    private static function calculate_check_digit($barcode) {
        $sum = 0;
        $length = strlen($barcode);
        for ($i = 0; $i < $length; $i++) {
            $digit = (int)$barcode[$i];
            $sum += ($i % 2 === 0) ? $digit : $digit * 3;
        }
        $checksum = (10 - ($sum % 10)) % 10;
        return $checksum;
    }

    /**
     * Get product barcode
     */
    public static function get_product_barcode($product_id) {
        $barcode_field = get_option('store_pos_barcode_field', '_sku');
        
        if ($barcode_field === '_sku') {
            $product = wc_get_product($product_id);
            return $product ? $product->get_sku() : '';
        }
        
        return get_post_meta($product_id, $barcode_field, true);
    }

    /**
     * Set product barcode
     */
    public static function set_product_barcode($product_id, $barcode) {
        $barcode_field = get_option('store_pos_barcode_field', '_sku');
        
        if ($barcode_field === '_sku') {
            $product = wc_get_product($product_id);
            if ($product) {
                $product->set_sku($barcode);
                $product->save();
                return true;
            }
            return false;
        }
        
        return update_post_meta($product_id, $barcode_field, $barcode);
    }

    /**
     * Get timezone for outlet
     */
    public static function get_outlet_timezone($outlet_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_outlets';
        $timezone = $wpdb->get_var($wpdb->prepare(
            "SELECT timezone FROM $table WHERE id = %d",
            $outlet_id
        ));
        return $timezone ?: 'UTC';
    }

    /**
     * Validate JSON
     */
    public static function is_valid_json($string) {
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }

    /**
     * Safe JSON decode
     */
    public static function safe_json_decode($string, $assoc = true) {
        if (empty($string)) {
            return $assoc ? [] : new \stdClass();
        }
        $decoded = json_decode($string, $assoc);
        return $decoded !== null ? $decoded : ($assoc ? [] : new \stdClass());
    }
}
