import React, { useState, useEffect } from 'react';
import { productsAPI } from '../utils/api';
import { FiGrid, FiChevronRight } from 'react-icons/fi';

const CategorySidebar = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const buildCategoryTree = () => {
    const tree = [];
    const categoryMap = {};

    // Build category map
    categories.forEach(cat => {
      categoryMap[cat.id] = { ...cat, children: [] };
    });

    // Build tree structure
    categories.forEach(cat => {
      if (cat.parent === 0) {
        tree.push(categoryMap[cat.id]);
      } else if (categoryMap[cat.parent]) {
        categoryMap[cat.parent].children.push(categoryMap[cat.id]);
      }
    });

    return tree;
  };

  const CategoryItem = ({ category, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div>
        <button
          onClick={() => {
            if (hasChildren) {
              setIsExpanded(!isExpanded);
            }
            onSelectCategory(category.id);
          }}
          className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
            selectedCategory === category.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${level * 16 + 16}px` }}
        >
          <div className="flex items-center space-x-2">
            {!hasChildren && level > 0 && (
              <span className="text-gray-400">•</span>
            )}
            <span className="text-sm">{category.name}</span>
            {category.count > 0 && (
              <span className="text-xs text-gray-500">({category.count})</span>
            )}
          </div>
          {hasChildren && (
            <FiChevronRight
              className={`text-gray-400 transition-transform ${
                isExpanded ? 'transform rotate-90' : ''
              }`}
              size={16}
            />
          )}
        </button>

        {hasChildren && isExpanded && (
          <div>
            {category.children.map(child => (
              <CategoryItem key={child.id} category={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Categories</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* All Products */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full flex items-center space-x-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
            !selectedCategory ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700'
          }`}
        >
          <FiGrid size={16} />
          <span className="text-sm">All Products</span>
        </button>

        {/* Categories */}
        {loading ? (
          <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
        ) : (
          buildCategoryTree().map(category => (
            <CategoryItem key={category.id} category={category} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;
