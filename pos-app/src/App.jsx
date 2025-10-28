import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { DrawerProvider } from './context/DrawerContext';
import { OutletProvider } from './context/OutletContext';
import POSLayout from './components/POSLayout';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <OutletProvider>
          <DrawerProvider>
            <CartProvider>
              <div className="min-h-screen bg-gray-50">
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: '#363636',
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

                <Routes>
                  <Route path="/" element={<POSLayout />} />
                  <Route path="*" element={<POSLayout />} />
                </Routes>
              </div>
            </CartProvider>
          </DrawerProvider>
        </OutletProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
