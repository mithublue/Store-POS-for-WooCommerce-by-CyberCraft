import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import { FiTrash2, FiPlus, FiMinus, FiUser, FiTag, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';
import CheckoutModal from './CheckoutModal';
import CustomerSelectModal from './CustomerSelectModal';
import CouponModal from './CouponModal';

const CartPanel = ({ settings = {} }) => {
  const {
    items,
    customer,
    discount,
    coupons,
    removeItem,
    updateQuantity,
    clearCart,
    holdCart,
    getSubtotal,
    getCouponDiscount,
    getTotal,
    getTotalItems,
  } = useCart();

  const config = window.storePOSConfig || {};
  const mergedSettings = {
    ...(config.settings || {}),
    ...settings,
  };

  const taxDisplayLabel = mergedSettings.tax_display === 'excl' ? 'Totals exclude tax' : 'Totals include tax';
  const autoPrintEnabled = !!mergedSettings.auto_print;

  const [showCheckout, setShowCheckout] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);

  const handleHoldCart = async () => {
    const success = await holdCart();
    if (success) {
      toast.success('Cart saved');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Current Order</h2>
          <p className="text-sm text-gray-600">{getTotalItems()} items</p>
        </div>
        {autoPrintEnabled && (
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
            Auto print enabled
          </span>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cart is empty</p>
            <p className="text-sm text-gray-400 mt-2">Scan or click products to add</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                  {item.sku && (
                    <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                  )}
                </div>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
                  <p className="font-bold text-primary-600">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Actions Bar */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {/* Customer */}
        <button
          onClick={() => setShowCustomerModal(true)}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <FiUser className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {customer ? customer.display_name : 'Walk-in Customer'}
            </span>
          </div>
          <span className="text-xs text-primary-600">Change</span>
        </button>

        {/* Coupon */}
        <button
          onClick={() => setShowCouponModal(true)}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <FiTag className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {coupons.length > 0 ? `${coupons.length} Coupon(s)` : 'Apply Coupon'}
            </span>
          </div>
          <span className="text-xs text-primary-600">Add</span>
        </button>

        {/* Totals */}
        <div className="space-y-2 py-3 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(getSubtotal())}</span>
          </div>

          {getCouponDiscount() > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Coupon Discount</span>
              <span className="font-medium text-green-600">
                -{formatPrice(getCouponDiscount())}
              </span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Manager Discount</span>
              <span className="font-medium text-green-600">
                -{formatPrice(discount)}
              </span>
            </div>
          )}

          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-primary-600">{formatPrice(getTotal())}</span>
          </div>
          <p className="text-xs text-gray-500">{taxDisplayLabel}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleHoldCart}
            disabled={items.length === 0}
            className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hold
          </button>
          <button
            onClick={clearCart}
            disabled={items.length === 0}
            className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>

        <button
          onClick={() => setShowCheckout(true)}
          disabled={items.length === 0}
          className="w-full btn btn-success text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Checkout {items.length > 0 && `- ${formatPrice(getTotal())}`}
        </button>
      </div>

      {/* Modals */}
      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} settings={mergedSettings} />
      )}

      {showCustomerModal && (
        <CustomerSelectModal onClose={() => setShowCustomerModal(false)} />
      )}

      {showCouponModal && (
        <CouponModal onClose={() => setShowCouponModal(false)} />
      )}
    </div>
  );
};

export default CartPanel;
