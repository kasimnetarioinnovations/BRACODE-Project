"use client"

import { useState } from "react"
import { Package, BarChart3, ShoppingCart, TrendingUp, X, ChevronDown, ChevronRight } from "lucide-react"

const Sidebar = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const [expandedSections, setExpandedSections] = useState({
    inventory: true,
    sales: false,
    reports: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      view: "dashboard",
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: Package,
      isSection: true,
      children: [
        { id: "add-product", label: "Add Product", view: "add-product" },
        { id: "stocks", label: "Stock Management", view: "stocks" },
        { id: "scanner", label: "QR Scanner", view: "scanner" },
      ],
    },
    {
      id: "sales",
      label: "Sales",
      icon: ShoppingCart,
      isSection: true,
      children: [
        { id: "pos", label: "POS Terminal", view: "pos" },
        { id: "sales-view", label: "Sales Management", view: "sales" },
        { id: "return-audit", label: "Return & Audit", view: "return-audit" },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: TrendingUp,
      isSection: true,
      children: [
        { id: "documents", label: "Documents", view: "documents" },
        { id: "report", label: "Analytics", view: "report" },
      ],
    },
  ]

  const handleItemClick = (view) => {
    setCurrentView(view)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">MUN-C</h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            if (item.isSection) {
              const isExpanded = expandedSections[item.id]
              return (
                <div key={item.id}>
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => handleItemClick(child.view)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentView === child.view
                              ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.view)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === item.view
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Need Help?</h3>
            <p className="text-xs text-blue-700 dark:text-blue-400 mb-3">
              Check our documentation for detailed guides and tutorials.
            </p>
            <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
