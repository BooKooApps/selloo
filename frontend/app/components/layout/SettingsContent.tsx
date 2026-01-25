'use client';

import { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX } from 'react-icons/fi';
import type { WhopStore, WhopCategory, WhopProduct } from '@/lib/whop';

interface SettingsContentProps {
  store: WhopStore;
  categories: WhopCategory[];
  products: WhopProduct[];
}

export default function SettingsContent({ store: initialStore, categories: initialCategories, products: initialProducts }: SettingsContentProps) {
  const [activeTab, setActiveTab] = useState<'store' | 'products' | 'categories'>('store');
  const [store, setStore] = useState(initialStore);
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  
  const [editingStore, setEditingStore] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const [storeForm, setStoreForm] = useState({
    name: store.name,
    description: store.description,
  });

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
  });

  const handleSaveStore = async () => {
    try {
      const response = await fetch('/api/store', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: store.id,
          ...storeForm,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to update store');
      
      const updatedStore = await response.json();
      setStore(updatedStore);
      setEditingStore(false);
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Failed to update store. Please try again.');
    }
  };

  const handleSaveProduct = async (productId?: string) => {
    try {
      if (productId) {
        // Update existing
        const response = await fetch(`/api/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...productForm,
            price: parseFloat(productForm.price),
          }),
        });
        
        if (!response.ok) throw new Error('Failed to update product');
        
        const updatedProduct = await response.json();
        setProducts(products.map(p => p.id === productId ? updatedProduct : p));
        setEditingProduct(null);
      } else {
        // Create new
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            storeId: store.id,
            ...productForm,
            price: parseFloat(productForm.price),
            currency: 'USD',
          }),
        });
        
        if (!response.ok) throw new Error('Failed to create product');
        
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        setShowAddProduct(false);
        setProductForm({ name: '', description: '', price: '', category_id: '' });
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleSaveCategory = async (categoryId?: string) => {
    try {
      if (categoryId) {
        // Update existing
        const response = await fetch(`/api/categories/${categoryId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryForm),
        });
        
        if (!response.ok) throw new Error('Failed to update category');
        
        const updatedCategory = await response.json();
        setCategories(categories.map(c => c.id === categoryId ? updatedCategory : c));
        setEditingCategory(null);
      } else {
        // Create new
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            storeId: store.id,
            ...categoryForm,
          }),
        });
        
        if (!response.ok) throw new Error('Failed to create category');
        
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
        setShowAddCategory(false);
        setCategoryForm({ name: '', description: '' });
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category. Please try again.');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category? Products in this category will be uncategorized.')) return;
    
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete category');
      
      setCategories(categories.filter(c => c.id !== categoryId));
      setProducts(products.map(p => 
        p.category_id === categoryId ? { ...p, category_id: undefined } : p
      ));
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  const startEditProduct = (product: WhopProduct) => {
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category_id: product.category_id || '',
    });
    setEditingProduct(product.id);
  };

  const startEditCategory = (category: WhopCategory) => {
    setCategoryForm({
      name: category.name,
      description: category.description || '',
    });
    setEditingCategory(category.id);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab('store')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'store'
              ? 'text-[#fa4616] border-b-2 border-[#fa4616]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Store Settings
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'products'
              ? 'text-[#fa4616] border-b-2 border-[#fa4616]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'categories'
              ? 'text-[#fa4616] border-b-2 border-[#fa4616]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Categories
        </button>
      </div>

      {/* Store Settings Tab */}
      {activeTab === 'store' && (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Store Information</h2>
            {!editingStore && (
              <button
                onClick={() => setEditingStore(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#fa4616] text-white rounded-lg hover:bg-[#fa4616]/90 transition-colors"
              >
                <FiEdit2 size={16} />
                Edit
              </button>
            )}
          </div>

          {editingStore ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  value={storeForm.name}
                  onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={storeForm.description}
                  onChange={(e) => setStoreForm({ ...storeForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSaveStore}
                  className="flex items-center gap-2 px-4 py-2 bg-[#fa4616] text-white rounded-lg hover:bg-[#fa4616]/90 transition-colors"
                >
                  <FiSave size={16} />
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingStore(false);
                    setStoreForm({ name: store.name, description: store.description });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#222] text-white rounded-lg hover:bg-[#333] transition-colors"
                >
                  <FiX size={16} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Store Name</p>
                <p className="text-white text-lg">{store.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Description</p>
                <p className="text-white">{store.description}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Products</h2>
            <button
              onClick={() => {
                setShowAddProduct(true);
                setProductForm({ name: '', description: '', price: '', category_id: '' });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#fa4616] text-white rounded-lg hover:bg-[#fa4616]/90 transition-colors"
            >
              <FiPlus size={16} />
              Add Product
            </button>
          </div>

          {showAddProduct && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add New Product</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={productForm.category_id}
                      onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSaveProduct()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#fa4616] text-white rounded-lg hover:bg-[#fa4616]/90 transition-colors"
                  >
                    <FiSave size={16} />
                    Save Product
                  </button>
                  <button
                    onClick={() => {
                      setShowAddProduct(false);
                      setProductForm({ name: '', description: '', price: '', category_id: '' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#222] text-white rounded-lg hover:bg-[#333] transition-colors"
                  >
                    <FiX size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#111] border border-white/10 rounded-xl p-6"
              >
                {editingProduct === product.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          value={productForm.category_id}
                          onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                          className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                        >
                          <option value="">Select category</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSaveProduct(product.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#fa4616] text-white rounded-lg hover:bg-[#fa4616]/90 transition-colors"
                      >
                        <FiSave size={16} />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#222] text-white rounded-lg hover:bg-[#333] transition-colors"
                      >
                        <FiX size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#fa4616] font-semibold">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.category_id && (
                          <span className="text-gray-500">
                            Category: {categories.find(c => c.id === product.category_id)?.name || 'Unknown'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditProduct(product)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-[#222] rounded-lg transition-colors"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#222] rounded-lg transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Categories</h2>
            <button
              onClick={() => {
                setShowAddCategory(true);
                setCategoryForm({ name: '', description: '' });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#fa4616] text-white rounded-lg hover:bg-[#fa4616]/90 transition-colors"
            >
              <FiPlus size={16} />
              Add Category
            </button>
          </div>

          {showAddCategory && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add New Category</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSaveCategory()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#fa4616] text-white rounded-lg hover:bg-[#fa4616]/90 transition-colors"
                  >
                    <FiSave size={16} />
                    Save Category
                  </button>
                  <button
                    onClick={() => {
                      setShowAddCategory(false);
                      setCategoryForm({ name: '', description: '' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#222] text-white rounded-lg hover:bg-[#333] transition-colors"
                  >
                    <FiX size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-[#111] border border-white/10 rounded-xl p-6"
              >
                {editingCategory === category.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fa4616]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSaveCategory(category.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#fa4616] text-white rounded-lg hover:bg-[#fa4616]/90 transition-colors"
                      >
                        <FiSave size={16} />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#222] text-white rounded-lg hover:bg-[#333] transition-colors"
                      >
                        <FiX size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
                      {category.description && (
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-2">
                        {products.filter(p => p.category_id === category.id).length} products
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditCategory(category)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-[#222] rounded-lg transition-colors"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#222] rounded-lg transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
