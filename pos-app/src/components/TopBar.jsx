import React, { useState, useEffect } from 'react';
import { FiSearch, FiLogOut, FiUser, FiSettings, FiShoppingBag } from 'react-icons/fi';
import { useOutlet } from '../context/OutletContext';
import { useDrawer } from '../context/DrawerContext';
import DrawerStatusModal from './DrawerStatusModal';
import useDebounce from '../hooks/useDebounce';

const TopBar = ({ searchQuery, setSearchQuery }) => {
  const { currentOutlet, outlets, switchOutlet } = useOutlet();
  const { currentSession, isDrawerOpen } = useDrawer();
  const [showDrawerModal, setShowDrawerModal] = useState(false);
  const [internalSearch, setInternalSearch] = useState(searchQuery || '');
  const debouncedValue = useDebounce(internalSearch, 300);

  const config = window.storePOSConfig || {};
  const currentUser = config.currentUser || {};

  useEffect(() => {
    if (debouncedValue !== searchQuery) {
      setSearchQuery(debouncedValue);
    }
  }, [debouncedValue, searchQuery, setSearchQuery]);

  useEffect(() => {
    setInternalSearch(searchQuery || '');
  }, [searchQuery]);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo & Outlet */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FiShoppingBag className="text-primary-600 text-2xl" />
            <h1 className="text-xl font-bold text-gray-900">Store POS</h1>
          </div>

          {/* Outlet Selector */}
          {outlets.length > 1 && (
            <select
              value={currentOutlet?.id || ''}
              onChange={(e) => switchOutlet(parseInt(e.target.value))}
              className="input max-w-xs"
            >
              <option value="">Select Outlet</option>
              {outlets.map((outlet) => (
                <option key={outlet.id} value={outlet.id}>
                  {outlet.name}
                </option>
              ))}
            </select>
          )}

          {/* Drawer Status */}
          <button
            onClick={() => setShowDrawerModal(true)}
            className={`px-4 py-2 rounded-lg font-medium ${
              isDrawerOpen
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            {isDrawerOpen ? '● Drawer Open' : '○ Drawer Closed'}
          </button>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, SKU, or barcode..."
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Right Section - User Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <FiUser className="text-gray-500" />
            <span className="font-medium">{currentUser.name || 'User'}</span>
          </div>
          
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            title="Settings"
          >
            <FiSettings size={20} />
          </button>
        </div>
      </div>

      {/* Drawer Status Modal */}
      {showDrawerModal && (
        <DrawerStatusModal onClose={() => setShowDrawerModal(false)} />
      )}
    </div>
  );
};

export default TopBar;
