import React from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today's Sales</p>
              <p className="text-3xl font-bold text-gray-900">$0.00</p>
            </div>
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
              <FiDollarSign className="text-primary-500 text-2xl" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Orders</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <FiShoppingBag className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Customers</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <FiUsers className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Order</p>
              <p className="text-3xl font-bold text-gray-900">$0.00</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="text-purple-600 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder */}
      <div className="card text-center py-16">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Store POS</h3>
        <p className="text-gray-600">Dashboard analytics coming soon...</p>
      </div>
    </div>
  );
};

export default Dashboard;
