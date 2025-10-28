import React from 'react';
import { FiShoppingBag, FiDollarSign, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Sales</p>
                <p className="text-2xl font-bold text-gray-900">$0.00</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <FiDollarSign className="text-primary-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Orders</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FiShoppingBag className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Customers</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiUsers className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order</p>
                <p className="text-2xl font-bold text-gray-900">$0.00</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiTrendingUp className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder */}
        <div className="card text-center py-12">
          <p className="text-gray-600">Dashboard coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
