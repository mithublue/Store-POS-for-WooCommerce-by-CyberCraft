import React, { useState, useEffect, useMemo, useRef } from 'react';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { formatPrice, decodeHtmlEntities } from '../utils/currency';
import useDebounce from '../hooks/useDebounce';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiPackage } from 'react-icons/fi';

const ProductGrid = ({ searchQuery, selectedCategory }) => {
  const config = window.storePOSConfig || {};
  const settings = config.settings || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { addItem } = useCart();

  const debouncedSearch = useDebounce(searchQuery, 300);
  const controllerRef = useRef(null);
  const requestIdRef = useRef(0);
  const lastQueryRef = useRef({ search: '', category: null });

  // Calculate grid columns class - must be before any returns
  const gridColumnsClass = useMemo(() => {
    const value = parseInt(settings.products_per_row || 4, 10);
    switch (value) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2 md:grid-cols-3';
      case 4:
        return 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4';
      case 5:
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5';
      case 6:
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
      default:
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  }, [settings.products_per_row]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategory]);

  useEffect(() => {
    loadProducts();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, selectedCategory, page]);

  const loadProducts = async () => {
    const isNewQuery =
      page === 1 &&
      (debouncedSearch !== lastQueryRef.current.search || selectedCategory !== lastQueryRef.current.category);

    if (isNewQuery) {
      setProducts([]);
      setHasMore(true);
    }

    setLoading(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const requestId = ++requestIdRef.current;

    try {
      const params = {
        page,
        per_page: 20,
      };

      if (debouncedSearch) {
        params.search = debouncedSearch;
      }

      if (selectedCategory) {
        params.category = selectedCategory;
      }

      const response = await productsAPI.getAll(params, { signal: controller.signal });
      
      if (requestId !== requestIdRef.current) {
        return;
      }

      if (response.success) {
        const newProducts = response.data.products || [];

        if (page === 1) {
          setProducts(newProducts);
          lastQueryRef.current = {
            search: debouncedSearch,
            category: selectedCategory,
          };
        } else {
          setProducts(prev => [...prev, ...newProducts]);
        }
        
        setHasMore(response.data.current_page < response.data.pages);
      }
    } catch (error) {
      if (controller.signal.aborted || error.name === 'CanceledError' || error.message === 'canceled') {
        return;
      }
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setLoading(false);
      }
    }
  };

  const handleAddToCart = (product) => {
    if (product.stock_status === 'outofstock') {
      toast.error('Product is out of stock');
      return;
    }

    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const getStockBadge = (product) => {
    if (product.stock_status === 'outofstock') {
      return <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Out of Stock</span>;
    }
    
    if (product.manage_stock && product.stock_quantity !== null) {
      const qty = product.stock_quantity;
      if (qty <= 5) {
        return <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Low Stock ({qty})</span>;
      }
      return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">In Stock ({qty})</span>;
    }
    
    return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">In Stock</span>;
  };

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FiPackage className="mx-auto text-gray-400 text-5xl mb-4" />
          <p className="text-gray-600 text-lg">No products found</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={`grid ${gridColumnsClass} gap-4`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleAddToCart(product)}
          >
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiPackage className="text-gray-400 text-4xl" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                {decodeHtmlEntities(product.name)}
              </h3>

              {product.sku && (
                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
              )}

              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-primary-600">
                  {formatPrice(product.price)}
                </p>
                <FiShoppingCart className="text-gray-400" />
              </div>

              {/* Stock Badge */}
              <div>{getStockBadge(product)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
            className="btn btn-secondary"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
