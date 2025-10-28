import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
  const hasInitialized = useRef(false);

  useEffect(() => {
    loadOutlets();
  }, []);

  useEffect(() => {
    if (outlets.length > 0) {
      if (!hasInitialized.current) {
        try {
          const savedOutletId = loadSavedOutletId();
          if (savedOutletId) {
            const savedOutlet = outlets.find((o) => o?.id === savedOutletId);
            if (savedOutlet) {
              setCurrentOutlet(savedOutlet);
            }
          }
          if (!savedOutletId || !outlets.find((o) => o?.id === savedOutletId)) {
            if (outlets[0]) {
              setCurrentOutlet(outlets[0]);
              localStorage.setItem('pos_current_outlet', outlets[0].id.toString());
            }
          }
          hasInitialized.current = true;
        } catch (error) {
          console.error('Error initializing outlet:', error);
          if (outlets[0]) {
            setCurrentOutlet(outlets[0]);
          }
          hasInitialized.current = true;
        }
      } else if (currentOutlet) {
        const updatedOutlet = outlets.find((o) => o?.id === currentOutlet?.id);
        if (updatedOutlet) {
          setCurrentOutlet(updatedOutlet);
        }
      }
    }
  }, [outlets, currentOutlet]);

  const loadOutlets = async () => {
    setLoading(true);
    try {
      const response = await outletsAPI.getAll({ status: 'active' });
      if (response?.success && Array.isArray(response.data)) {
        setOutlets(response.data);
      } else {
        setOutlets([]);
      }
    } catch (error) {
      console.error('Failed to load outlets:', error);
      setOutlets([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedOutletId = () => {
    try {
      const savedOutletId = localStorage.getItem('pos_current_outlet');
      return savedOutletId ? parseInt(savedOutletId, 10) : null;
    } catch (error) {
      console.error('Error loading saved outlet:', error);
      return null;
    }
  };

  const switchOutlet = async (outletId) => {
    const outlet = outlets.find((o) => o.id === outletId);
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
