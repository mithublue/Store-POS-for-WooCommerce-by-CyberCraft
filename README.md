# Store POS by CyberCraft

A comprehensive, modern WooCommerce Point of Sale (POS) system with multi-outlet management, barcode scanning, Typesense search integration, and HPOS compatibility.

## 🎯 Features

### Core POS Features
- ✅ **Multi-Outlet Management** - Manage multiple physical store locations
- ✅ **Multi-Drawer System** - Track multiple cash registers per outlet with session management
- ✅ **Modern React Interface** - Fast, responsive POS built with React + Tailwind CSS
- ✅ **Barcode Scanner Support** - Automatic barcode detection and product lookup
- ✅ **Role-Based Access Control** - POS Manager and POS Cashier roles with granular permissions
- ✅ **Customer Management** - Quick search, create, and assign customers to orders
- ✅ **Coupon & Discount Support** - Apply WooCommerce coupons and manager discounts
- ✅ **Multiple Payment Methods** - Cash, card, and custom payment types
- ✅ **Split Payments** - Ready for split payment implementations
- ✅ **Hold/Resume Carts** - Save carts for later completion
- ✅ **Offline Mode** - IndexedDB caching for offline sales (with online sync)
- ✅ **Receipt Printing** - Print or email receipts
- ✅ **HPOS Compatible** - Full support for WooCommerce High-Performance Order Storage

### Search & Performance
- ✅ **Typesense Integration** - Optional ultra-fast product search (open-source, free)
- ✅ **Category Browsing** - Hierarchical product category navigation
- ✅ **Quick Search** - Real-time product search by name, SKU, or barcode

### Reports & Analytics
- ✅ **Sales Reports** - Daily, weekly, monthly sales summaries
- ✅ **Drawer Reports** - Cash reconciliation and drawer session tracking
- ✅ **Cashier Performance** - Individual cashier sales reports
- ✅ **Top Products** - Best-selling product analytics
- ✅ **Payment Method Breakdown** - Track payment types

## 🏗️ Architecture

### Backend (PHP)
- **Framework**: WordPress/WooCommerce Plugin Architecture
- **Database**: Custom tables + WooCommerce HPOS
- **API**: WordPress REST API
- **Authentication**: WordPress Nonce + JWT-ready

### Frontend (React)
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API + Zustand
- **HTTP Client**: Axios
- **Notifications**: react-hot-toast
- **Icons**: react-icons
- **Offline Storage**: localForage (IndexedDB)

### Search (Optional)
- **Engine**: Typesense (open-source, self-hosted)

## 📦 Installation

### Prerequisites
- WordPress 6.0+
- WooCommerce 7.0+
- PHP 7.4+
- Node.js 16+ (for building the React app)
- Composer (optional, for autoloading)

### Step 1: Install Plugin
```bash
# Navigate to WordPress plugins directory
cd wp-content/plugins/

# If using Git
git clone [your-repo] store-pos

# Or extract the plugin zip
unzip store-pos.zip
```

### Step 2: Install PHP Dependencies (Optional)
```bash
cd store-pos
composer install
```

### Step 3: Build React App
```bash
cd pos-app
npm install
npm run build
```

### Step 4: Activate Plugin
1. Go to **WordPress Admin** → **Plugins**
2. Find "Store POS by CyberCraft"
3. Click **Activate**

### Step 5: Configure
1. Navigate to **Store POS** → **Settings**
2. Configure general settings, barcode field, receipt templates
3. (Optional) Set up Typesense credentials
4. Create your first outlet: **Store POS** → **Outlets** → **Add New**
5. Create drawers for your outlet: **Store POS** → **Drawers** → **Add New**

## 🚀 Usage

### Opening a Drawer
1. Go to **Store POS** → **POS Terminal**
2. Click the "Drawer Closed" button in the top bar
3. Select a drawer and enter opening balance
4. Click "Open Drawer"

### Making a Sale
1. **Search/Browse Products**: Use the search bar or browse categories
2. **Scan Barcode**: Use a barcode scanner or type manually
3. **Add to Cart**: Click products to add them to cart
4. **Adjust Quantities**: Use +/- buttons in cart panel
5. **Select Customer** (optional): Click customer button to search/add
6. **Apply Coupons** (optional): Add WooCommerce coupon codes
7. **Checkout**: Click "Checkout" button
8. **Select Payment Method**: Cash, Card, or Other
9. **Complete Order**: Enter amount received (for cash) and complete

### Closing a Drawer
1. Click the "Drawer Open" button in top bar
2. Count your cash and enter closing balance
3. Add any notes about discrepancies
4. Click "Close Drawer"

## 🔧 Development

### Frontend Development
```bash
cd pos-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### File Structure
```
store-pos/
├── store-pos.php           # Main plugin file
├── composer.json           # PHP dependencies
├── package.json            # Not used (in pos-app)
├── includes/               # PHP classes
│   ├── class-pos-loader.php
│   ├── class-pos-activator.php
│   ├── class-pos-deactivator.php
│   ├── Admin/              # Admin UI
│   ├── API/                # REST API controllers
│   ├── Models/             # Database models
│   ├── Database/           # Schema & migrations
│   ├── Helpers/            # Utility classes
│   ├── Traits/             # Reusable traits
│   └── Frontend/           # POS frontend loader
├── pos-app/                # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utilities
│   │   └── styles/         # CSS files
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── assets/
│   ├── css/                # Admin CSS
│   ├── js/                 # Admin JS & React build
│   └── images/
└── languages/              # Translation files
```

## 🔌 REST API Endpoints

### Products
- `GET /wp-json/store-pos/v1/products` - Get products
- `GET /wp-json/store-pos/v1/products/{id}` - Get single product
- `GET /wp-json/store-pos/v1/products/barcode/{barcode}` - Search by barcode
- `GET /wp-json/store-pos/v1/products/categories` - Get categories

### Orders
- `POST /wp-json/store-pos/v1/orders` - Create order
- `GET /wp-json/store-pos/v1/orders` - Get orders
- `GET /wp-json/store-pos/v1/orders/{id}` - Get single order

### Customers
- `GET /wp-json/store-pos/v1/customers/search` - Search customers
- `POST /wp-json/store-pos/v1/customers` - Create customer

### Outlets
- `GET /wp-json/store-pos/v1/outlets` - Get outlets
- `POST /wp-json/store-pos/v1/outlets` - Create outlet
- `PUT /wp-json/store-pos/v1/outlets/{id}` - Update outlet

### Drawers
- `GET /wp-json/store-pos/v1/drawers` - Get drawers
- `POST /wp-json/store-pos/v1/drawers/{id}/open` - Open drawer
- `POST /wp-json/store-pos/v1/drawers/sessions/{id}/close` - Close drawer

### Reports
- `GET /wp-json/store-pos/v1/reports/sales` - Sales report
- `GET /wp-json/store-pos/v1/reports/drawer/{session_id}` - Drawer report
- `GET /wp-json/store-pos/v1/reports/cashier` - Cashier report

## 🔐 User Roles & Capabilities

### POS Manager
- Full access to POS terminal
- Open/close drawers
- View reports
- Manage outlets and drawers
- Apply manual discounts
- Adjust inventory

### POS Cashier
- Access to POS terminal
- Process sales
- Apply coupons
- Cannot open/close drawers
- Cannot apply manual discounts

## ⚙️ Typesense Setup (Optional)

Typesense is an open-source, self-hosted search engine that provides lightning-fast product search.

### Install Typesense Server
```bash
# Using Docker
docker run -p 8108:8108 -v/tmp/typesense-data:/data typesense/typesense:0.25.1 \
  --data-dir /data --api-key=xyz --enable-cors
```

### Configure in WordPress
1. Go to **Store POS** → **Settings**
2. Enable Typesense
3. Enter host, port, protocol, and API key
4. Products will automatically sync to Typesense

## 📊 Database Schema

### Custom Tables
- `wp_wc_pos_outlets` - Store locations
- `wp_wc_pos_drawers` - Cash registers
- `wp_wc_pos_drawer_sessions` - Drawer open/close sessions
- `wp_wc_pos_sessions` - User POS sessions
- `wp_wc_pos_logs` - Activity logs
- `wp_wc_pos_settings` - Plugin settings

## 🛠️ Customization

### Adding Custom Payment Methods
Edit `CheckoutModal.jsx` to add new payment method options.

### Customizing Receipt Template
Modify receipt settings in **Store POS** → **Settings** → Receipt Settings.

### Adding Custom Product Fields
Use the `store_pos_product_data` filter to add custom fields to product API responses.

## 🐛 Troubleshooting

### React App Not Loading
1. Ensure you've run `npm run build` in the `pos-app/` directory
2. Check that build files exist in `assets/js/build/`
3. Clear WordPress cache

### Barcode Scanner Not Working
1. Test scanner in a text editor - it should type characters quickly
2. Ensure scanner sends "Enter" key after barcode
3. Adjust `useBarcodeScanner` timeout if needed

### Orders Not Creating
1. Check REST API is accessible: `/wp-json/store-pos/v1/`
2. Verify user has `use_pos` capability
3. Check browser console for errors

## 📝 License

GPL v2 or later

## 👨‍💻 Author

**Mithu A Quayium**  
CyberCraft  
https://cybercraft.co

## 🙏 Credits

- Built with React, Vite, and Tailwind CSS
- Uses WooCommerce REST API
- Optional Typesense integration (open-source)
- All icons from react-icons (Feather Icons)

## 📞 Support

For support, please contact: support@cybercraft.co

---

**Note**: This is a comprehensive POS system built with modern web technologies. It requires WooCommerce and is designed to work seamlessly with your existing WooCommerce store.
