<?php
/**
 * Outlets management page view
 *
 * @package StorePOS\Admin\Views
 */

if (!defined('ABSPATH')) {
    exit;
}

use StorePOS\Models\Outlet;

$outlets = Outlet::get_all();
?>

<div class="wrap">
    <h1>
        <?php _e('Outlets', 'store-pos'); ?>
        <a href="#" class="page-title-action" id="add-outlet-btn">
            <?php _e('Add New', 'store-pos'); ?>
        </a>
    </h1>

    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th><?php _e('Name', 'store-pos'); ?></th>
                <th><?php _e('Address', 'store-pos'); ?></th>
                <th><?php _e('Phone', 'store-pos'); ?></th>
                <th><?php _e('Status', 'store-pos'); ?></th>
                <th><?php _e('Actions', 'store-pos'); ?></th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($outlets)): ?>
                <tr>
                    <td colspan="5"><?php _e('No outlets found.', 'store-pos'); ?></td>
                </tr>
            <?php else: ?>
                <?php foreach ($outlets as $outlet): ?>
                    <tr>
                        <td><strong><?php echo esc_html($outlet->name); ?></strong></td>
                        <td><?php echo esc_html($outlet->address); ?></td>
                        <td><?php echo esc_html($outlet->phone); ?></td>
                        <td>
                            <span class="status-badge status-<?php echo esc_attr($outlet->status); ?>">
                                <?php echo esc_html(ucfirst($outlet->status)); ?>
                            </span>
                        </td>
                        <td>
                            <a href="#" class="button button-small"><?php _e('Edit', 'store-pos'); ?></a>
                            <a href="#" class="button button-small"><?php _e('Delete', 'store-pos'); ?></a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>
</div>
