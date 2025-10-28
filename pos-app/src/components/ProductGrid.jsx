import React, { useState, useEffect } from 'react';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiPackage } from 'react-icons/fi';

const ProductGrid = ({ searchQuery, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    loadProducts();
  }, [searchQuery, selectedCategory, page]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: 20,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (selectedCategory) {
        params.category = selectedCategory;
      }

      const response = await productsAPI.getAll(params);
      
      if (response.success) {
        const newProducts = response.data.products || [];
        
        if (page === 1) {
          setProducts(newProducts);
        } else {
          setProducts(prev => [...prev, ...newProducts]);
        }
        
        setHasMore(response.data.current_page < response.data.pages);
      }
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                {product.name}
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
