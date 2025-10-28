import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi';
import { outletsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import OutletModal from '../components/OutletModal';

const Outlets = () => {
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOutlet, setEditingOutlet] = useState(null);

  useEffect(() => {
    loadOutlets();
  }, []);

  const loadOutlets = async () => {
    setLoading(true);
    try {
      const response = await outletsAPI.getAll({ status: 'active' });
      if (response.success) {
        setOutlets(response.data);
      }
    } catch (error) {
      toast.error('Failed to load outlets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingOutlet(null);
    setShowModal(true);
  };

  const handleEdit = (outlet) => {
    setEditingOutlet(outlet);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this outlet?')) return;

    try {
      await outletsAPI.delete(id);
      toast.success('Outlet deleted successfully');
      loadOutlets();
    } catch (error) {
      toast.error(error.message || 'Failed to delete outlet');
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingOutlet) {
        await outletsAPI.update(editingOutlet.id, data);
        toast.success('Outlet updated successfully');
      } else {
        await outletsAPI.create(data);
        toast.success('Outlet created successfully');
      }
      setShowModal(false);
      loadOutlets();
    } catch (error) {
      toast.error(error.message || 'Failed to save outlet');
      throw error;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Outlets</h1>
          <p className="text-gray-600 mt-1">Manage your store locations</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary flex items-center gap-2">
          <FiPlus size={20} />
          Add Outlet
        </button>
      </div>

      {/* Outlets Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : outlets.length === 0 ? (
        <div className="card text-center py-12">
          <FiMapPin className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No outlets yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first outlet</p>
          <button onClick={handleCreate} className="btn btn-primary">
            Add Your First Outlet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outlets.map((outlet) => (
            <div key={outlet.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FiMapPin className="text-primary-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{outlet.name}</h3>
                    <span className={`badge ${outlet.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {outlet.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                {outlet.address && (
                  <p className="flex items-start gap-2">
                    <span className="font-medium">Address:</span>
                    <span>{outlet.address}</span>
                  </p>
                )}
                {outlet.phone && (
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Phone:</span>
                    <span>{outlet.phone}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEdit(outlet)}
                  className="flex-1 btn btn-secondary text-sm flex items-center justify-center gap-2"
                >
                  <FiEdit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(outlet.id)}
                  className="flex-1 btn btn-danger text-sm flex items-center justify-center gap-2"
                >
                  <FiTrash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <OutletModal
          outlet={editingOutlet}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Outlets;
