"use client"

import { useState } from "react"
import { Package, Plus } from "lucide-react"
import ProductCard from "./ProductCard"

const Dashboard = ({ products, onAddProduct, onMenuClick, onDeleteProduct, onUpdateProduct, onViewProduct }) => {
  const [viewMode, setViewMode] = useState("grid")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))]

  const filteredProducts = products
    .filter((product) => filterCategory === "all" || product.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name || "").localeCompare(b.name || "")
        case "price":
          return (b.sellingPrice || 0) - (a.sellingPrice || 0)
        case "stock":
          return (b.initialStock || 0) - (a.initialStock || 0)
        case "date":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products & Services</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your inventory of {products.length} items</p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          >
            <option value="all">All Categories</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
            <option value="date">Sort by Date</option>
          </select>

          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              } rounded-l-lg transition-colors`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              } rounded-r-lg transition-colors`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length > 0 ? (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id} // ✅ FIXED
              product={product}
              viewMode={viewMode}
              onDelete={onDeleteProduct}
              onUpdate={onUpdateProduct}
              onView={onViewProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {filterCategory === "all" ? "No Products Found" : `No ${filterCategory} Products`}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            {filterCategory === "all"
              ? "Start building your inventory by adding your first product or service."
              : `No products found in the ${filterCategory} category. Try a different filter or add new products.`}
          </p>
          <button
            onClick={onAddProduct}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Product
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard
