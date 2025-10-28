<?php
/**
 * Settings management
 *
 * @package StorePOS\Admin
 */

namespace StorePOS\Admin;

class Settings {

    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('store_pos_settings', 'store_pos_currency_symbol');
        register_setting('store_pos_settings', 'store_pos_tax_display');
        register_setting('store_pos_settings', 'store_pos_auto_print');
        register_setting('store_pos_settings', 'store_pos_barcode_field');
        register_setting('store_pos_settings', 'store_pos_enable_typesense');
        register_setting('store_pos_settings', 'store_pos_typesense_host');
        register_setting('store_pos_settings', 'store_pos_typesense_port');
        register_setting('store_pos_settings', 'store_pos_typesense_protocol');
        register_setting('store_pos_settings', 'store_pos_typesense_api_key');
        register_setting('store_pos_settings', 'store_pos_receipt_logo');
        register_setting('store_pos_settings', 'store_pos_receipt_header');
        register_setting('store_pos_settings', 'store_pos_receipt_footer');

        // General Settings
        add_settings_section(
            'store_pos_general',
            __('General Settings', 'store-pos'),
            [$this, 'render_general_section'],
            'store_pos_settings'
        );

        add_settings_field(
            'tax_display',
            __('Tax Display', 'store-pos'),
            [$this, 'render_tax_display_field'],
            'store_pos_settings',
            'store_pos_general'
        );

        add_settings_field(
            'auto_print',
            __('Auto Print Receipt', 'store-pos'),
            [$this, 'render_auto_print_field'],
            'store_pos_settings',
            'store_pos_general'
        );

        add_settings_field(
            'barcode_field',
            __('Barcode Field', 'store-pos'),
            [$this, 'render_barcode_field'],
            'store_pos_settings',
            'store_pos_general'
        );

        // Typesense Settings
        add_settings_section(
            'store_pos_typesense',
            __('Typesense Search Settings', 'store-pos'),
            [$this, 'render_typesense_section'],
            'store_pos_settings'
        );

        add_settings_field(
            'enable_typesense',
            __('Enable Typesense', 'store-pos'),
            [$this, 'render_enable_typesense_field'],
            'store_pos_settings',
            'store_pos_typesense'
        );

        add_settings_field(
            'typesense_host',
            __('Typesense Host', 'store-pos'),
            [$this, 'render_typesense_host_field'],
            'store_pos_settings',
            'store_pos_typesense'
        );

        add_settings_field(
            'typesense_port',
            __('Typesense Port', 'store-pos'),
            [$this, 'render_typesense_port_field'],
            'store_pos_settings',
            'store_pos_typesense'
        );

        add_settings_field(
            'typesense_protocol',
            __('Protocol', 'store-pos'),
            [$this, 'render_typesense_protocol_field'],
            'store_pos_settings',
            'store_pos_typesense'
        );

        add_settings_field(
            'typesense_api_key',
            __('API Key', 'store-pos'),
            [$this, 'render_typesense_api_key_field'],
            'store_pos_settings',
            'store_pos_typesense'
        );

        // Receipt Settings
        add_settings_section(
            'store_pos_receipt',
            __('Receipt Settings', 'store-pos'),
            [$this, 'render_receipt_section'],
            'store_pos_settings'
        );

        add_settings_field(
            'receipt_header',
            __('Receipt Header', 'store-pos'),
            [$this, 'render_receipt_header_field'],
            'store_pos_settings',
            'store_pos_receipt'
        );

        add_settings_field(
            'receipt_footer',
            __('Receipt Footer', 'store-pos'),
            [$this, 'render_receipt_footer_field'],
            'store_pos_settings',
            'store_pos_receipt'
        );
    }

    public function render_general_section() {
        echo '<p>' . __('Configure general POS settings.', 'store-pos') . '</p>';
    }

    public function render_tax_display_field() {
        $value = get_option('store_pos_tax_display', 'incl');
        ?>
        <select name="store_pos_tax_display">
            <option value="incl" <?php selected($value, 'incl'); ?>><?php _e('Including Tax', 'store-pos'); ?></option>
            <option value="excl" <?php selected($value, 'excl'); ?>><?php _e('Excluding Tax', 'store-pos'); ?></option>
        </select>
        <?php
    }

    public function render_auto_print_field() {
        $value = get_option('store_pos_auto_print', 'yes');
        ?>
        <label>
            <input type="checkbox" name="store_pos_auto_print" value="yes" <?php checked($value, 'yes'); ?>>
            <?php _e('Automatically print receipt after order completion', 'store-pos'); ?>
        </label>
        <?php
    }

    public function render_barcode_field() {
        $value = get_option('store_pos_barcode_field', '_sku');
        ?>
        <select name="store_pos_barcode_field">
            <option value="_sku" <?php selected($value, '_sku'); ?>><?php _e('Product SKU', 'store-pos'); ?></option>
            <option value="_barcode" <?php selected($value, '_barcode'); ?>><?php _e('Custom Barcode Field', 'store-pos'); ?></option>
        </select>
        <p class="description"><?php _e('Select which field to use for barcode scanning.', 'store-pos'); ?></p>
        <?php
    }

    public function render_typesense_section() {
        echo '<p>' . __('Configure Typesense for lightning-fast product search. Typesense is an open-source search engine.', 'store-pos') . '</p>';
    }

    public function render_enable_typesense_field() {
        $value = get_option('store_pos_enable_typesense', 'no');
        ?>
        <label>
            <input type="checkbox" name="store_pos_enable_typesense" value="yes" <?php checked($value, 'yes'); ?>>
            <?php _e('Enable Typesense search', 'store-pos'); ?>
        </label>
        <?php
    }

    public function render_typesense_host_field() {
        $value = get_option('store_pos_typesense_host', '');
        ?>
        <input type="text" name="store_pos_typesense_host" value="<?php echo esc_attr($value); ?>" class="regular-text">
        <p class="description"><?php _e('e.g., localhost or your Typesense server IP', 'store-pos'); ?></p>
        <?php
    }

    public function render_typesense_port_field() {
        $value = get_option('store_pos_typesense_port', '8108');
        ?>
        <input type="text" name="store_pos_typesense_port" value="<?php echo esc_attr($value); ?>" class="small-text">
        <?php
    }

    public function render_typesense_protocol_field() {
        $value = get_option('store_pos_typesense_protocol', 'http');
        ?>
        <select name="store_pos_typesense_protocol">
            <option value="http" <?php selected($value, 'http'); ?>>HTTP</option>
            <option value="https" <?php selected($value, 'https'); ?>>HTTPS</option>
        </select>
        <?php
    }

    public function render_typesense_api_key_field() {
        $value = get_option('store_pos_typesense_api_key', '');
        ?>
        <input type="password" name="store_pos_typesense_api_key" value="<?php echo esc_attr($value); ?>" class="regular-text">
        <p class="description"><?php _e('Your Typesense API key', 'store-pos'); ?></p>
        <?php
    }

    public function render_receipt_section() {
        echo '<p>' . __('Customize receipt appearance.', 'store-pos') . '</p>';
    }

    public function render_receipt_header_field() {
        $value = get_option('store_pos_receipt_header', '');
        ?>
        <textarea name="store_pos_receipt_header" rows="4" class="large-text"><?php echo esc_textarea($value); ?></textarea>
        <p class="description"><?php _e('Text to display at the top of receipts (e.g., store name, address)', 'store-pos'); ?></p>
        <?php
    }

    public function render_receipt_footer_field() {
        $value = get_option('store_pos_receipt_footer', '');
        ?>
        <textarea name="store_pos_receipt_footer" rows="4" class="large-text"><?php echo esc_textarea($value); ?></textarea>
        <p class="description"><?php _e('Text to display at the bottom of receipts (e.g., thank you message)', 'store-pos'); ?></p>
        <?php
    }
}
