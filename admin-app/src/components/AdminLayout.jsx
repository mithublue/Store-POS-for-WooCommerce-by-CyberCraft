import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiMapPin, FiBox, FiBarChart2, FiSettings, FiShoppingBag } from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Outlets', path: '/outlets', icon: FiMapPin },
    { name: 'Drawers', path: '/drawers', icon: FiBox },
    { name: 'Reports', path: '/reports', icon: FiBarChart2 },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <FiShoppingBag className="text-primary-500 text-2xl mr-3" />
          <h1 className="text-xl font-bold text-primary-500">Store POS</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="mr-3" size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Store POS v1.0.0
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
