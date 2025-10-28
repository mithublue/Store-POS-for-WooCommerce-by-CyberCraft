<?php
/**
 * Settings page view
 *
 * @package StorePOS\Admin\Views
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap store-pos-settings">
    <h1><?php _e('Store POS Settings', 'store-pos'); ?></h1>

    <?php settings_errors(); ?>

    <form method="post" action="options.php">
        <?php
        settings_fields('store_pos_settings');
        do_settings_sections('store_pos_settings');
        submit_button();
        ?>
    </form>
</div>

<style>
.store-pos-settings {
    max-width: 800px;
}
</style>
