import React from 'react';
import { FiSettings } from 'react-icons/fi';

const Settings = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <div className="card text-center py-16">
        <FiSettings className="mx-auto text-gray-400 text-6xl mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings Module</h3>
        <p className="text-gray-600">POS configuration settings coming soon...</p>
      </div>
    </div>
  );
};

export default Settings;
