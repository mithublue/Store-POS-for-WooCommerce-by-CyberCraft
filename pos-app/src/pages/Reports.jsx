import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>
        
        <div className="card text-center py-12">
          <FiBarChart2 className="mx-auto text-gray-400 text-5xl mb-4" />
          <p className="text-gray-600">Reports module coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
