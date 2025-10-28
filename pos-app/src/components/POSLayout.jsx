import React, { useState } from 'react';
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Bar */}
      <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Categories */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Center - Products */}
        <div className="flex-1 overflow-y-auto p-4">
          <ProductGrid
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Right Sidebar - Cart */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <CartPanel />
        </div>
      </div>
    </div>
  );
};

export default POSLayout;
