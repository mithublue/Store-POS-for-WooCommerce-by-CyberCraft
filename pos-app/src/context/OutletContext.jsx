import React, { createContext, useContext, useState, useEffect } from 'react';
import { outletsAPI } from '../utils/api';
import toast from 'react-hot-toast';

const OutletContext = createContext();

export const useOutlet = () => {
  const context = useContext(OutletContext);
  if (!context) {
    throw new Error('useOutlet must be used within OutletProvider');
  }
  return context;
};

export const OutletProvider = ({ children }) => {
  const [currentOutlet, setCurrentOutlet] = useState(null);
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOutlets();
    loadSavedOutlet();
  }, []);

  const loadOutlets = async () => {
    setLoading(true);
    try {
      const response = await outletsAPI.getAll({ status: 'active' });
      if (response.success) {
        setOutlets(response.data);
      }
    } catch (error) {
      console.error('Failed to load outlets:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedOutlet = () => {
    const savedOutletId = localStorage.getItem('pos_current_outlet');
    if (savedOutletId) {
      const outlet = outlets.find(o => o.id === parseInt(savedOutletId));
      if (outlet) {
        setCurrentOutlet(outlet);
      }
    }
  };

  const switchOutlet = async (outletId) => {
    const outlet = outlets.find(o => o.id === outletId);
    if (!outlet) {
      toast.error('Outlet not found');
      return false;
    }

    setCurrentOutlet(outlet);
    localStorage.setItem('pos_current_outlet', outletId.toString());
    toast.success(`Switched to ${outlet.name}`);
    return true;
  };

  const value = {
    currentOutlet,
    outlets,
    loading,
    switchOutlet,
    loadOutlets,
  };

  return <OutletContext.Provider value={value}>{children}</OutletContext.Provider>;
};
