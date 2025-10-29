import React, { useEffect, useState } from 'react';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import useBarcodeScanner from '../hooks/useBarcodeScanner';
import toast from 'react-hot-toast';
import TopBar from './TopBar';
import ProductGrid from './ProductGrid';
import CartPanel from './CartPanel';
import CategorySidebar from './CategorySidebar';

const POSLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  const config = window.storePOSConfig || {};
  const settings = config.settings || {};

  useEffect(() => {
    const body = document.body;
    body.classList.toggle('pos-theme-dark', settings.theme === 'dark');
    body.classList.toggle('pos-layout-compact', settings.layout === 'compact');

    return () => {
      body.classList.remove('pos-theme-dark');
      body.classList.remove('pos-layout-compact');
    };
  }, [settings.theme, settings.layout]);

  const layoutConfig = {
    categoriesWidth: settings.layout === 'compact' ? 'w-56' : 'w-64',
    contentPadding: settings.layout === 'compact' ? 'p-3 md:p-4' : 'p-4 md:p-6',
    cartWidth: settings.layout === 'compact' ? 'w-80' : 'w-96',
  };

  const panelClass = settings.theme === 'dark'
    ? 'bg-gray-800 border border-gray-700 text-gray-100'
    : 'bg-white border border-gray-200';

  const rootBackground = settings.theme === 'dark'
    ? 'bg-gray-900 text-gray-100'
    : 'bg-gray-50 text-gray-900';

  // Barcode scanner integration
  const handleBarcodeScan = async (barcode) => {
    try {
      const response = await productsAPI.getByBarcode(barcode);
      if (response.success) {
        addItem(response.data);
        toast.success(`${response.data.name} added to cart`);
      }
    } catch (error) {
      toast.error('Product not found');
    }
  };

  useBarcodeScanner(handleBarcodeScan, {
    minLength: 3,
    maxLength: 20,
    timeout: 100,
  });

  return (
    <div className={`flex flex-col h-screen ${rootBackground}`}>
      {/* Top Bar */}
      <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content */}
      <div className="pos-main flex flex-1 overflow-hidden">
        {/* Left Sidebar - Categories */}
        <div className={`pos-categories ${layoutConfig.categoriesWidth} ${panelClass} border-l-0 overflow-y-auto`}> 
          <CategorySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Center - Products */}
        <div className={`flex-1 overflow-y-auto ${panelClass} border-l-0 border-r-0 ${layoutConfig.contentPadding}`}>
          <ProductGrid
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            settings={settings}
          />
        </div>

        {/* Right Sidebar - Cart */}
        <div className={`${layoutConfig.cartWidth} ${panelClass} border-l flex flex-col`}>
          <CartPanel settings={settings} />
        </div>
      </div>
    </div>
  );
};

export default POSLayout;
