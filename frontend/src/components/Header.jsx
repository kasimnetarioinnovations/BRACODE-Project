"use client"
import { Search, Bell, Settings, Plus, QrCode, Menu, Sun, Moon } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"

const Header = ({
  onAddProduct,
  onShowNotifications,
  onShowSettings,
  onShowScanner,
  searchTerm,
  onSearchChange,
  onMenuClick,
}) => {
  const { user, notifications } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, SKU, or categories..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* QR Scanner */}
          <button
            onClick={onShowScanner}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Open QR Scanner"
          >
            <QrCode className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Add Product */}
          <button
            onClick={onAddProduct}
            className="hidden sm:flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>

          {/* Mobile Add Button */}
          <button
            onClick={onAddProduct}
            className="sm:hidden p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button
            onClick={onShowNotifications}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onShowSettings}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff`}
              alt={user?.name}
              className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
