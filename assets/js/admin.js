/**
 * Store POS Admin JavaScript
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        // Auto-save notice
        $('.store-pos-settings input, .store-pos-settings select').on('change', function() {
            // Could add auto-save functionality here
        });

        // Outlet management
        $('#add-outlet-btn').on('click', function(e) {
            e.preventDefault();
            // TODO: Open modal for adding outlet
            alert('Outlet creation modal - Coming soon');
        });

        // Drawer management
        $('#add-drawer-btn').on('click', function(e) {
            e.preventDefault();
            // TODO: Open modal for adding drawer
            alert('Drawer creation modal - Coming soon');
        });

        // Confirmation for delete actions
        $('.delete-action').on('click', function(e) {
            if (!confirm('Are you sure you want to delete this item?')) {
                e.preventDefault();
            }
        });
    });

})(jQuery);
