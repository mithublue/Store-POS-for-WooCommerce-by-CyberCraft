import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useDrawer } from '../context/DrawerContext';
import { useOutlet } from '../context/OutletContext';
import { ordersAPI } from '../utils/api';
import { formatPrice } from '../utils/currency';
import toast from 'react-hot-toast';
import { FiX, FiCreditCard, FiDollarSign, FiCheck } from 'react-icons/fi';

const CheckoutModal = ({ onClose }) => {
  const { items, customer, discount, coupons, getTotal, clearCart, notes } = useCart();
  const { currentSession } = useDrawer();
  const { currentOutlet } = useOutlet();
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountReceived, setAmountReceived] = useState('');
  const [processing, setProcessing] = useState(false);

  const total = getTotal();
  const change = amountReceived ? parseFloat(amountReceived) - total : 0;

  const paymentMethods = [
    { id: 'cash', label: 'Cash', icon: FiDollarSign },
    { id: 'card', label: 'Card', icon: FiCreditCard },
    { id: 'other', label: 'Other', icon: FiCheck },
  ];

  const handleQuickAmount = (amount) => {
    setAmountReceived(amount.toString());
  };

  const handleCheckout = async () => {
    if (paymentMethod === 'cash' && parseFloat(amountReceived) < total) {
      toast.error('Amount received is less than total');
      return;
    }

    setProcessing(true);

    try {
      const orderData = {
        items: items.map(item => ({
          product_id: item.product_id,
          variation_id: item.variation_id || 0,
          quantity: item.quantity,
        })),
        customer_id: customer?.id || 0,
        payment_method: paymentMethod,
        payment_method_title: paymentMethods.find(m => m.id === paymentMethod)?.label || 'Cash',
        coupons: coupons.map(c => c.code),
        custom_discount: discount,
        notes: notes,
        outlet_id: currentOutlet?.id,
        drawer_id: currentSession?.drawer_id,
        drawer_session_id: currentSession?.id,
      };

      const response = await ordersAPI.create(orderData);

      if (response.success) {
        toast.success('Order completed successfully!');
        
        // Show change if cash payment
        if (paymentMethod === 'cash' && change > 0) {
          toast.success(`Change: ${formatPrice(change)}`, { duration: 5000 });
        }

        // Clear cart and close
        await clearCart();
        onClose();

        // TODO: Show receipt modal or print receipt
      }
    } catch (error) {
      toast.error(error.message || 'Failed to process order');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Items</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-primary-600">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === method.id
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={24} className="mb-2" />
                    <span className="text-sm font-medium">{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cash Payment Details */}
          {paymentMethod === 'cash' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Amount Received</h3>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[10, 20, 50, 100, 200, 500, 1000, 2000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => handleQuickAmount(amount)}
                    className="btn btn-secondary py-2"
                  >
                    {formatPrice(amount)}
                  </button>
                ))}
              </div>

              {/* Manual Input */}
              <input
                type="number"
                value={amountReceived}
                onChange={(e) => setAmountReceived(e.target.value)}
                placeholder="Enter amount"
                className="input text-lg"
                step="0.01"
              />

              {/* Change Display */}
              {amountReceived && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Change</span>
                    <span className={`text-2xl font-bold ${
                      change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPrice(Math.abs(change))}
                    </span>
                  </div>
                  {change < 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      Insufficient amount received
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Customer Info */}
          {customer && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Customer</h3>
              <p className="text-sm text-gray-700">{customer.display_name}</p>
              {customer.email && (
                <p className="text-sm text-gray-600">{customer.email}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 btn btn-secondary"
              disabled={processing}
            >
              Cancel
            </button>
            <button
              onClick={handleCheckout}
              disabled={processing || (paymentMethod === 'cash' && change < 0)}
              className="flex-1 btn btn-success disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : 'Complete Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
