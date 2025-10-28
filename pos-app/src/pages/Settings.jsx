import React from 'react';
import { FiSettings } from 'react-icons/fi';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
        
        <div className="card text-center py-12">
          <FiSettings className="mx-auto text-gray-400 text-5xl mb-4" />
          <p className="text-gray-600">Settings module coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
