import localforage from 'localforage';

// Initialize localforage
const store = localforage.createInstance({
  name: 'store-pos',
  storeName: 'pos_data',
});

/**
 * Storage utility for offline support
 */
export const storage = {
  // Save cart
  saveCart: async (cart) => {
    try {
      await store.setItem('current_cart', cart);
      return true;
    } catch (error) {
      console.error('Failed to save cart:', error);
      return false;
    }
  },

  // Get cart
  getCart: async () => {
    try {
      return await store.getItem('current_cart');
    } catch (error) {
      console.error('Failed to get cart:', error);
      return null;
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      await store.removeItem('current_cart');
      return true;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      return false;
    }
  },

  // Save held carts
  saveHeldCart: async (cart) => {
    try {
      const heldCarts = await store.getItem('held_carts') || [];
      heldCarts.push({
        ...cart,
        id: Date.now(),
        heldAt: new Date().toISOString(),
      });
      await store.setItem('held_carts', heldCarts);
      return true;
    } catch (error) {
      console.error('Failed to save held cart:', error);
      return false;
    }
  },

  // Get held carts
  getHeldCarts: async () => {
    try {
      return await store.getItem('held_carts') || [];
    } catch (error) {
      console.error('Failed to get held carts:', error);
      return [];
    }
  },

  // Remove held cart
  removeHeldCart: async (id) => {
    try {
      const heldCarts = await store.getItem('held_carts') || [];
      const filtered = heldCarts.filter(cart => cart.id !== id);
      await store.setItem('held_carts', filtered);
      return true;
    } catch (error) {
      console.error('Failed to remove held cart:', error);
      return false;
    }
  },

  // Cache products for offline use
  cacheProducts: async (products) => {
    try {
      await store.setItem('cached_products', {
        products,
        cachedAt: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Failed to cache products:', error);
      return false;
    }
  },

  // Get cached products
  getCachedProducts: async () => {
    try {
      const data = await store.getItem('cached_products');
      if (!data) return null;
      
      // Check if cache is older than 1 hour
      const cachedTime = new Date(data.cachedAt).getTime();
      const now = new Date().getTime();
      const hourInMs = 60 * 60 * 1000;
      
      if (now - cachedTime > hourInMs) {
        return null; // Cache expired
      }
      
      return data.products;
    } catch (error) {
      console.error('Failed to get cached products:', error);
      return null;
    }
  },

  // Queue offline order
  queueOfflineOrder: async (order) => {
    try {
      const queue = await store.getItem('offline_orders') || [];
      queue.push({
        ...order,
        id: Date.now(),
        queuedAt: new Date().toISOString(),
      });
      await store.setItem('offline_orders', queue);
      return true;
    } catch (error) {
      console.error('Failed to queue offline order:', error);
      return false;
    }
  },

  // Get offline orders
  getOfflineOrders: async () => {
    try {
      return await store.getItem('offline_orders') || [];
    } catch (error) {
      console.error('Failed to get offline orders:', error);
      return [];
    }
  },

  // Clear offline orders
  clearOfflineOrders: async () => {
    try {
      await store.setItem('offline_orders', []);
      return true;
    } catch (error) {
      console.error('Failed to clear offline orders:', error);
      return false;
    }
  },
};

export default storage;
