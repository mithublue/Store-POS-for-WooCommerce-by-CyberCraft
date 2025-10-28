import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';

const Reports = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports</h1>
      
      <div className="card text-center py-16">
        <FiBarChart2 className="mx-auto text-gray-400 text-6xl mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Reports Module</h3>
        <p className="text-gray-600">Comprehensive reports and analytics coming soon...</p>
      </div>
    </div>
  );
};

export default Reports;
