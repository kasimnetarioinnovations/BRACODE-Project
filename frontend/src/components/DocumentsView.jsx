"use client"

import { useState, useEffect } from "react"
import { FileText, Download, Eye, Trash2, Plus, Search, Upload } from "lucide-react"

const DocumentsView = ({ documents = [], onAddDocument, onDeleteDocument }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const safeDocuments = Array.isArray(documents) ? documents : []

  const filteredDocuments = safeDocuments
    .filter((doc) => {
      const name = doc?.name || ''
      const description = doc?.description || ''
      const tags = Array.isArray(doc?.tags) ? doc.tags : []
      const type = doc?.type || ''

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tags.some((tag) => String(tag).toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesFilter = filterType === "all" || type === filterType

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const aDate = a?.createdAt ? new Date(a.createdAt) : new Date(0)
      const bDate = b?.createdAt ? new Date(b.createdAt) : new Date(0)
      const aName = a?.name || ''
      const bName = b?.name || ''
      const aSize = a?.size || 0
      const bSize = b?.size || 0
      const aType = a?.type || ''
      const bType = b?.type || ''

      switch (sortBy) {
        case "date":
          return bDate - aDate
        case "name":
          return aName.localeCompare(bName)
        case "size":
          return bSize - aSize
        case "type":
          return aType.localeCompare(bType)
        default:
          return 0
      }
    })

  const formatFileSize = (bytes) => {
    if (typeof bytes !== 'number' || bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getDocumentIcon = (type) => {
    switch (type) {
      case "invoice":
        return "📄"
      case "report":
        return "📊"
      case "purchase-order":
        return "🛒"
      case "tax-report":
        return "💰"
      default:
        return "📄"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "invoice":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "report":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "purchase-order":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "tax-report":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return 'N/A'
    }
  }

  if (!isClient) return null

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Organize and manage all your business documents</p>
        </div>
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onAddDocument}
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{safeDocuments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Invoices</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {safeDocuments.filter((d) => d?.type === "invoice").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Reports</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {safeDocuments.filter((d) => d?.type === "report").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Upload className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Size</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatFileSize(safeDocuments.reduce((sum, doc) => sum + (doc?.size || 0), 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="invoice">Invoices</option>
              <option value="report">Reports</option>
              <option value="purchase-order">Purchase Orders</option>
              <option value="tax-report">Tax Reports</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
              <option value="type">Sort by Type</option>
            </select>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <div
            key={document.id || `${document.name}-${document.type}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{getDocumentIcon(document.type)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {document.name || 'Untitled Document'}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(document.type)}`}
                  >
                    {document.type ? document.type.replace("-", " ") : 'Document'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteDocument(document.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {document.description || 'No description available'}
            </p>

            {document.tags && document.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {document.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{formatFileSize(document.size)}</span>
              <span>{formatDate(document.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || filterType !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Upload your first document to get started."}
          </p>
        </div>
      )}
    </div>
  )
}

export default DocumentsView
