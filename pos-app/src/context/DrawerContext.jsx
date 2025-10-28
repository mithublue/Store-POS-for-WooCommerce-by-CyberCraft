import React, { createContext, useContext, useState, useEffect } from 'react';
import { drawersAPI } from '../utils/api';
import toast from 'react-hot-toast';

const DrawerContext = createContext();

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within DrawerProvider');
  }
  return context;
};

export const DrawerProvider = ({ children }) => {
  const [currentDrawer, setCurrentDrawer] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const openDrawer = async (drawerId, openingBalance) => {
    setLoading(true);
    try {
      const response = await drawersAPI.open(drawerId, { opening_balance: openingBalance });
      if (response.success) {
        setCurrentSession(response.data);
        setCurrentDrawer({ id: drawerId });
        toast.success(response.message || 'Drawer opened successfully');
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.message || 'Failed to open drawer');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const closeDrawer = async (closingBalance, notes = '') => {
    if (!currentSession) {
      toast.error('No active drawer session');
      return false;
    }

    setLoading(true);
    try {
      const response = await drawersAPI.close(currentSession.id, {
        closing_balance: closingBalance,
        notes,
      });
      
      if (response.success) {
        setCurrentSession(null);
        setCurrentDrawer(null);
        toast.success(response.message || 'Drawer closed successfully');
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.message || 'Failed to close drawer');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loadActiveSession = async (drawerId) => {
    setLoading(true);
    try {
      const response = await drawersAPI.getActiveSession(drawerId);
      if (response.success && response.data) {
        setCurrentSession(response.data);
        setCurrentDrawer({ id: drawerId });
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to load active session:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentDrawer,
    currentSession,
    loading,
    openDrawer,
    closeDrawer,
    loadActiveSession,
    isDrawerOpen: !!currentSession,
  };

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
};
