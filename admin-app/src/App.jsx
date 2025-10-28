import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Outlets from './pages/Outlets';
import Drawers from './pages/Drawers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialRoute = (window.storePOSAdmin && window.storePOSAdmin.initialRoute) || '/dashboard';

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      navigate(initialRoute, { replace: true });
    }
  }, [initialRoute, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0056A7',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to={initialRoute} replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/outlets" element={<Outlets />} />
          <Route path="/drawers" element={<Drawers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AdminLayout>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
