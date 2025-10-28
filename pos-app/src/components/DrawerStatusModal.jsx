import React, { useState } from 'react';
import { useDrawer } from '../context/DrawerContext';
import { formatPrice } from '../utils/currency';
import toast from 'react-hot-toast';
import { FiX, FiDollarSign } from 'react-icons/fi';

const DrawerStatusModal = ({ onClose }) => {
  const { currentSession, isDrawerOpen, openDrawer, closeDrawer } = useDrawer();
  const [openingBalance, setOpeningBalance] = useState('');
  const [closingBalance, setClosingBalance] = useState('');
  const [notes, setNotes] = useState('');
  const [drawerId, setDrawerId] = useState('');

  const handleOpenDrawer = async () => {
    if (!drawerId) {
      toast.error('Select a drawer');
      return;
    }

    const balance = parseFloat(openingBalance) || 0;
    const success = await openDrawer(parseInt(drawerId), balance);
    
    if (success) {
      onClose();
    }
  };

  const handleCloseDrawer = async () => {
    const balance = parseFloat(closingBalance);
    
    if (isNaN(balance)) {
      toast.error('Enter a valid closing balance');
      return;
    }

    const success = await closeDrawer(balance, notes);
    
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Drawer Management</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isDrawerOpen ? (
            /* Open Drawer Form */
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Open a drawer to start accepting payments through the POS system.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Drawer
                </label>
                <select
                  value={drawerId}
                  onChange={(e) => setDrawerId(e.target.value)}
                  className="input"
                >
                  <option value="">Select a drawer...</option>
                  <option value="1">Main Drawer</option>
                  <option value="2">Counter 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opening Balance
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={openingBalance}
                    onChange={(e) => setOpeningBalance(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    className="input pl-10"
                  />
                </div>
              </div>

              <button
                onClick={handleOpenDrawer}
                className="w-full btn btn-success"
              >
                Open Drawer
              </button>
            </div>
          ) : (
            /* Close Drawer Form */
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Drawer is Open</h3>
                <div className="text-sm text-green-800 space-y-1">
                  <p>Opened: {new Date(currentSession.opened_at).toLocaleString()}</p>
                  <p>Opening Balance: {formatPrice(currentSession.opening_balance)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Closing Balance *
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={closingBalance}
                    onChange={(e) => setClosingBalance(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any discrepancies or notes..."
                  rows="3"
                  className="input"
                />
              </div>

              <button
                onClick={handleCloseDrawer}
                className="w-full btn btn-danger"
              >
                Close Drawer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawerStatusModal;
