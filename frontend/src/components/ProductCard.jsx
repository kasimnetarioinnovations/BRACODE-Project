"use client"

import { useState } from "react"
import { Package, MoreVertical, Edit, Trash2, Eye, DollarSign, Warehouse, Tag } from "lucide-react"

const ProductCard = ({ product, viewMode, onDelete, onUpdate, onView }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      onDelete(product.id)
    }
    setShowMenu(false)
  }
  
  const handleEdit = () => {
    if (onUpdate) {
      onUpdate(product);
    }
    setShowMenu(false);
  }
  
  const handleView = () => {
    if (onView) {
      onView(product.id);
    }
    setShowMenu(false);
  }

  const formatPrice = (price) => {
    return price ? `₹${price.toLocaleString()}` : "N/A"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "returnable":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "non-returnable":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  if (viewMode === "list") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-gray-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{product.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 capitalize">
                  {product.itemType}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>SKU: {product.sku}</span>
                <span>Category: {product.category || "N/A"}</span>
                {product.brand && <span>Brand: {product.brand}</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatPrice(product.sellingPrice)}</p>
              {product.initialStock !== undefined && (
                <p className="text-sm text-gray-600 dark:text-gray-400">Stock: {product.initialStock}</p>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <button
                    onClick={handleView}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={handleEdit}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-gray-400" />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <button
                    onClick={() => {
                      setShowDetails(true)
                      setShowMenu(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {product.sku}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
              {product.status}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 capitalize">
              {product.itemType}
            </span>
            {product.category && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 capitalize">
                {product.category}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatPrice(product.sellingPrice)}
              </span>
            </div>

            {product.initialStock !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Stock:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{product.initialStock} units</span>
              </div>
            )}

            {product.variants && product.variants.length > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Variants:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.variants.length} options
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default ProductCard
