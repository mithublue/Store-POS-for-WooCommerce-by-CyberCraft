import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { couponsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FiX, FiTag, FiTrash2 } from 'react-icons/fi';

const CouponModal = ({ onClose }) => {
  const { coupons, applyCoupon, removeCoupon, getSubtotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error('Enter a coupon code');
      return;
    }

    setLoading(true);
    try {
      const response = await couponsAPI.validate({
        code: couponCode,
        cart_total: getSubtotal(),
      });

      if (response.success) {
        applyCoupon(response.data);
        toast.success(`Coupon "${response.data.code}" applied!`);
        setCouponCode('');
      }
    } catch (error) {
      toast.error(error.message || 'Invalid coupon code');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = (code) => {
    removeCoupon(code);
    toast.success('Coupon removed');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Apply Coupon</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Coupon Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
              placeholder="Enter coupon code"
              className="flex-1 input uppercase"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Checking...' : 'Apply'}
            </button>
          </div>

          {/* Applied Coupons */}
          {coupons.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Applied Coupons</h3>
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <FiTag className="text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">{coupon.code}</p>
                      <p className="text-xs text-gray-600">
                        {coupon.type === 'percent'
                          ? `${coupon.amount}% off`
                          : `$${coupon.amount} off`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveCoupon(coupon.code)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose} className="w-full btn btn-secondary">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
