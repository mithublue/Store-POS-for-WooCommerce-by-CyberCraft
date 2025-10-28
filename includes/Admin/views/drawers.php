<?php
/**
 * Drawers management page view
 *
 * @package StorePOS\Admin\Views
 */

if (!defined('ABSPATH')) {
    exit;
}

use StorePOS\Models\Drawer;
use StorePOS\Models\Outlet;

$outlets = Outlet::get_all();
?>

<div class="wrap">
    <h1>
        <?php _e('Drawers', 'store-pos'); ?>
        <a href="#" class="page-title-action" id="add-drawer-btn">
            <?php _e('Add New', 'store-pos'); ?>
        </a>
    </h1>

    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th><?php _e('Name', 'store-pos'); ?></th>
                <th><?php _e('Outlet', 'store-pos'); ?></th>
                <th><?php _e('Printer', 'store-pos'); ?></th>
                <th><?php _e('Status', 'store-pos'); ?></th>
                <th><?php _e('Actions', 'store-pos'); ?></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="5"><?php _e('No drawers found. Please add an outlet first.', 'store-pos'); ?></td>
            </tr>
        </tbody>
    </table>

    <div class="notice notice-info">
        <p><?php _e('Drawers are cash registers assigned to specific outlets. Each drawer can have multiple sessions tracked throughout the day.', 'store-pos'); ?></p>
    </div>
</div>
