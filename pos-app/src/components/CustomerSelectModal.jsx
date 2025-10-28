import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { customersAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FiX, FiSearch, FiUserPlus, FiUser } from 'react-icons/fi';

const CustomerSelectModal = ({ onClose }) => {
  const { setCustomer } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  const handleSearch = async () => {
    if (searchQuery.length < 2) {
      toast.error('Enter at least 2 characters to search');
      return;
    }

    setLoading(true);
    try {
      const response = await customersAPI.search(searchQuery);
      if (response.success) {
        setCustomers(response.data);
      }
    } catch (error) {
      toast.error('Failed to search customers');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCustomer = (customer) => {
    setCustomer(customer);
    toast.success(`Customer selected: ${customer.display_name}`);
    onClose();
  };

  const handleCreateCustomer = async () => {
    if (!newCustomer.email) {
      toast.error('Email is required');
      return;
    }

    setLoading(true);
    try {
      const response = await customersAPI.create(newCustomer);
      if (response.success) {
        setCustomer(response.data);
        toast.success('Customer created and selected');
        onClose();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Select Customer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showCreateForm ? (
            <>
              {/* Search */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search by name or email..."
                    className="w-full pl-10 input"
                  />
                </div>
                <button onClick={handleSearch} className="btn btn-primary" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>

              {/* Walk-in Customer */}
              <button
                onClick={() => {
                  setCustomer(null);
                  toast.success('Walk-in customer selected');
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-primary-500 hover:bg-gray-50 mb-4"
              >
                <FiUser size={24} className="text-gray-400" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Walk-in Customer</p>
                  <p className="text-sm text-gray-500">No customer information</p>
                </div>
              </button>

              {/* Customer List */}
              {customers.length > 0 && (
                <div className="space-y-2">
                  {customers.map((customer) => (
                    <button
                      key={customer.id}
                      onClick={() => handleSelectCustomer(customer)}
                      className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-gray-50"
                    >
                      <FiUser size={20} className="text-gray-400" />
                      <div className="text-left flex-1">
                        <p className="font-medium text-gray-900">{customer.display_name}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Create New Customer Button */}
              <button
                onClick={() => setShowCreateForm(true)}
                className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-gray-50 mt-4"
              >
                <FiUserPlus size={20} />
                <span className="font-medium">Create New Customer</span>
              </button>
            </>
          ) : (
            /* Create Customer Form */
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={newCustomer.first_name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, first_name: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={newCustomer.last_name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, last_name: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="input"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 btn btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={handleCreateCustomer}
                  className="flex-1 btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Customer'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSelectModal;
