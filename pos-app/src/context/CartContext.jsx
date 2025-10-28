import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [notes, setNotes] = useState('');

  // Load cart from storage on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    if (items.length > 0 || customer || discount > 0 || coupons.length > 0) {
      saveCart();
    }
  }, [items, customer, discount, coupons, notes]);

  const loadCart = async () => {
    const savedCart = await storage.getCart();
    if (savedCart) {
      setItems(savedCart.items || []);
      setCustomer(savedCart.customer || null);
      setDiscount(savedCart.discount || 0);
      setCoupons(savedCart.coupons || []);
      setNotes(savedCart.notes || '');
    }
  };

  const saveCart = async () => {
    await storage.saveCart({
      items,
      customer,
      discount,
      coupons,
      notes,
    });
  };

  const addItem = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product_id === product.id && item.variation_id === (product.variation_id || 0)
      );

      if (existingIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }

      return [
        ...prevItems,
        {
          product_id: product.id,
          variation_id: product.variation_id || 0,
          name: product.name,
          price: parseFloat(product.price),
          quantity,
          image: product.image,
          sku: product.sku,
          tax_class: product.tax_class,
        },
      ];
    });
  };

  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }

    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = quantity;
      return newItems;
    });
  };

  const updateItemPrice = (index, price) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].price = parseFloat(price);
      return newItems;
    });
  };

  const clearCart = async () => {
    setItems([]);
    setCustomer(null);
    setDiscount(0);
    setCoupons([]);
    setNotes('');
    await storage.clearCart();
  };

  const holdCart = async () => {
    if (items.length === 0) return false;
    
    const success = await storage.saveHeldCart({
      items,
      customer,
      discount,
      coupons,
      notes,
    });

    if (success) {
      await clearCart();
    }

    return success;
  };

  const loadHeldCart = async (heldCart) => {
    setItems(heldCart.items || []);
    setCustomer(heldCart.customer || null);
    setDiscount(heldCart.discount || 0);
    setCoupons(heldCart.coupons || []);
    setNotes(heldCart.notes || '');
    
    await storage.removeHeldCart(heldCart.id);
  };

  const applyCoupon = (coupon) => {
    setCoupons((prev) => {
      if (prev.some((c) => c.code === coupon.code)) {
        return prev;
      }
      return [...prev, coupon];
    });
  };

  const removeCoupon = (code) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCouponDiscount = () => {
    let totalDiscount = 0;
    const subtotal = getSubtotal();

    coupons.forEach((coupon) => {
      if (coupon.type === 'percent') {
        totalDiscount += (subtotal * coupon.amount) / 100;
      } else if (coupon.type === 'fixed_cart') {
        totalDiscount += parseFloat(coupon.amount);
      }
    });

    return totalDiscount;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const couponDiscount = getCouponDiscount();
    return Math.max(0, subtotal - couponDiscount - discount);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    items,
    customer,
    discount,
    coupons,
    notes,
    setCustomer,
    setDiscount,
    setNotes,
    addItem,
    removeItem,
    updateQuantity,
    updateItemPrice,
    clearCart,
    holdCart,
    loadHeldCart,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getCouponDiscount,
    getTotal,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
