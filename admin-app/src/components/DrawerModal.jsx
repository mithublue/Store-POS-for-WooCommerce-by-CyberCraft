import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const DrawerModal = ({ drawer, outlets, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    outlet_id: '',
    printer: '',
    status: 'active',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (drawer) {
      setFormData({
        name: drawer.name || '',
        outlet_id: drawer.outlet_id || '',
        printer: drawer.printer || '',
        status: drawer.status || 'active',
      });
    } else if (outlets.length > 0) {
      setFormData(prev => ({ ...prev, outlet_id: outlets[0].id }));
    }
  }, [drawer, outlets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      // Error handled by parent
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {drawer ? 'Edit Drawer' : 'Create New Drawer'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Drawer Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
                placeholder="e.g., Register 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Outlet *
              </label>
              <select
                name="outlet_id"
                value={formData.outlet_id}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select an outlet</option>
                {outlets.map((outlet) => (
                  <option key={outlet.id} value={outlet.id}>
                    {outlet.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Printer Name
              </label>
              <input
                type="text"
                name="printer"
                value={formData.printer}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Epson TM-T20"
              />
              <p className="text-xs text-gray-500 mt-1">Optional: Receipt printer name</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : drawer ? 'Update Drawer' : 'Create Drawer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawerModal;
