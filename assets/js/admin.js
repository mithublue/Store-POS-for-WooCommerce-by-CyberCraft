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
            
            var name = prompt('Enter outlet name:');
            if (!name) return;
            
            var address = prompt('Enter outlet address (optional):');
            var phone = prompt('Enter outlet phone (optional):');
            
            // Create outlet via REST API
            $.ajax({
                url: storePOSAdmin.restUrl + '/outlets',
                method: 'POST',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', storePOSAdmin.restNonce);
                },
                data: JSON.stringify({
                    name: name,
                    address: address || '',
                    phone: phone || '',
                    status: 'active'
                }),
                contentType: 'application/json',
                success: function(response) {
                    alert('Outlet created successfully!');
                    location.reload();
                },
                error: function(xhr) {
                    var message = xhr.responseJSON && xhr.responseJSON.message 
                        ? xhr.responseJSON.message 
                        : 'Failed to create outlet';
                    alert('Error: ' + message);
                }
            });
        });

        // Drawer management
        $('#add-drawer-btn').on('click', function(e) {
            e.preventDefault();
            
            var name = prompt('Enter drawer name:');
            if (!name) return;
            
            var outletId = prompt('Enter outlet ID:');
            if (!outletId) {
                alert('Outlet ID is required. Please create an outlet first.');
                return;
            }
            
            var printer = prompt('Enter printer name (optional):');
            
            // Create drawer via REST API
            $.ajax({
                url: storePOSAdmin.restUrl + '/drawers',
                method: 'POST',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', storePOSAdmin.restNonce);
                },
                data: JSON.stringify({
                    name: name,
                    outlet_id: parseInt(outletId),
                    printer: printer || '',
                    status: 'active'
                }),
                contentType: 'application/json',
                success: function(response) {
                    alert('Drawer created successfully!');
                    location.reload();
                },
                error: function(xhr) {
                    var message = xhr.responseJSON && xhr.responseJSON.message 
                        ? xhr.responseJSON.message 
                        : 'Failed to create drawer';
                    alert('Error: ' + message);
                }
            });
        });

        // Confirmation for delete actions
        $('.delete-action').on('click', function(e) {
            if (!confirm('Are you sure you want to delete this item?')) {
                e.preventDefault();
            }
        });
    });

})(jQuery);
