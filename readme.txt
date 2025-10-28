=== Store POS by CyberCraft ===
Contributors: mithuaquayium
Tags: pos, point of sale, woocommerce, retail, cash register
Requires at least: 6.0
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A comprehensive WooCommerce POS system with multi-outlet management, barcode scanning, and HPOS compatibility.

== Description ==

Store POS is a powerful Point of Sale system designed specifically for WooCommerce stores. It provides a modern, fast, and intuitive interface for managing in-store sales.

= Key Features =

* **Multi-Outlet Management** - Manage multiple physical store locations
* **Multi-Drawer System** - Track multiple cash registers per outlet
* **Barcode Scanner Support** - Lightning-fast product lookup via barcode
* **Role-Based Access** - Separate permissions for managers and cashiers
* **Customer Management** - Quick customer lookup and creation
* **Coupon Support** - Apply WooCommerce coupons at checkout
* **Offline Mode** - Continue selling even without internet (data syncs later)
* **HPOS Compatible** - Fully compatible with WooCommerce's High-Performance Order Storage
* **Reports & Analytics** - Detailed sales, cashier, and drawer reports
* **Receipt Printing** - Print or email receipts instantly
* **Typesense Integration** - Optional ultra-fast product search (open-source)

= Perfect For =

* Retail stores
* Restaurants and cafes
* Pop-up shops
* Multi-location businesses
* Any WooCommerce store with physical locations

== Installation ==

1. Upload the plugin files to `/wp-content/plugins/store-pos/`
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Ensure WooCommerce is installed and activated
4. Navigate to **Store POS** > **Settings** to configure
5. Create your outlets and drawers
6. Start selling!

= Building the React App =

The POS interface is built with React. To build it:

1. Navigate to the plugin directory: `cd wp-content/plugins/store-pos/pos-app`
2. Install dependencies: `npm install`
3. Build for production: `npm run build`

For development: `npm run dev`

== Frequently Asked Questions ==

= Does this work with WooCommerce HPOS? =

Yes! Store POS is fully compatible with WooCommerce's High-Performance Order Storage.

= Can I use barcode scanners? =

Absolutely! The system automatically detects barcode scanner input. Just scan products to add them to the cart.

= Does it work offline? =

Yes, the POS can cache products and queue orders when offline. They'll sync automatically when back online.

= Is Typesense required? =

No, Typesense is optional. The POS works great with standard WordPress search. Typesense just makes product search even faster.

= Can I manage multiple stores? =

Yes! Create multiple outlets, each with their own inventory, drawers, and staff.

== Screenshots ==

1. Modern POS interface with product grid and cart
2. Quick checkout with multiple payment methods
3. Outlet and drawer management
4. Comprehensive reports and analytics
5. Settings panel

== Changelog ==

= 1.0.0 =
* Initial release
* Multi-outlet management
* Multi-drawer system
* Barcode scanner support
* Customer management
* Coupon support
* HPOS compatibility
* Reports and analytics
* Receipt printing
* Offline mode

== Upgrade Notice ==

= 1.0.0 =
Initial release of Store POS.

== Third-Party Services ==

This plugin can optionally integrate with Typesense (https://typesense.org/) for enhanced product search. Typesense is an open-source search engine. Use of Typesense is entirely optional and requires separate setup.

- Typesense Website: https://typesense.org/
- Typesense Privacy Policy: https://typesense.org/privacy/
- Typesense Terms: https://typesense.org/terms/

== Support ==

For support, please visit our website or contact us at support@cybercraft.co
