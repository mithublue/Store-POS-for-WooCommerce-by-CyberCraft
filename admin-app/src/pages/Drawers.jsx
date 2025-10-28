import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiBox } from 'react-icons/fi';
import { drawersAPI, outletsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import DrawerModal from '../components/DrawerModal';

const Drawers = () => {
  const [drawers, setDrawers] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDrawer, setEditingDrawer] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [drawersRes, outletsRes] = await Promise.all([
        drawersAPI.getAll(),
        outletsAPI.getAll({ status: 'active' })
      ]);
      
      if (drawersRes.success) setDrawers(drawersRes.data);
      if (outletsRes.success) setOutlets(outletsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    if (outlets.length === 0) {
      toast.error('Please create an outlet first');
      return;
    }
    setEditingDrawer(null);
    setShowModal(true);
  };

  const handleEdit = (drawer) => {
    setEditingDrawer(drawer);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this drawer?')) return;

    try {
      await drawersAPI.delete(id);
      toast.success('Drawer deleted successfully');
      loadData();
    } catch (error) {
      toast.error(error.message || 'Failed to delete drawer');
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingDrawer) {
        await drawersAPI.update(editingDrawer.id, data);
        toast.success('Drawer updated successfully');
      } else {
        await drawersAPI.create(data);
        toast.success('Drawer created successfully');
      }
      setShowModal(false);
      loadData();
    } catch (error) {
      toast.error(error.message || 'Failed to save drawer');
      throw error;
    }
  };

  const getOutletName = (outletId) => {
    const outlet = outlets.find(o => o.id === outletId);
    return outlet ? outlet.name : 'Unknown';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Drawers</h1>
          <p className="text-gray-600 mt-1">Manage cash registers for your outlets</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary flex items-center gap-2">
          <FiPlus size={20} />
          Add Drawer
        </button>
      </div>

      {/* Drawers Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : drawers.length === 0 ? (
        <div className="card text-center py-12">
          <FiBox className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No drawers yet</h3>
          <p className="text-gray-600 mb-4">
            {outlets.length === 0 
              ? 'Create an outlet first, then add drawers'
              : 'Get started by creating your first drawer'
            }
          </p>
          <button onClick={handleCreate} className="btn btn-primary" disabled={outlets.length === 0}>
            Add Your First Drawer
          </button>
        </div>
      ) : (
        <div className="card">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Outlet</th>
                  <th>Printer</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drawers.map((drawer) => (
                  <tr key={drawer.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <FiBox className="text-primary-500" />
                        </div>
                        <span className="font-medium">{drawer.name}</span>
                      </div>
                    </td>
                    <td>{getOutletName(drawer.outlet_id)}</td>
                    <td>{drawer.printer || '-'}</td>
                    <td>
                      <span className={`badge ${drawer.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                        {drawer.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(drawer)}
                          className="text-primary-600 hover:text-primary-700"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(drawer.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <DrawerModal
          drawer={editingDrawer}
          outlets={outlets}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Drawers;
