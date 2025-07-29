"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, DollarSign, Package, Download } from "lucide-react"

const ReportsView = ({ products, stocks, sales, returns }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [reportType, setReportType] = useState("overview")

  // Calculate metrics
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.status === "completed" ? sale.totalPrice : 0), 0)
  const totalRefunds = returns.reduce((sum, ret) => sum + (ret.status === "completed" ? ret.totalRefund : 0), 0)
  const netRevenue = totalRevenue - totalRefunds
  const totalProducts = products.length
  const lowStockItems = stocks.filter((stock) => stock.currentStock <= stock.minStock).length
  const totalStockValue = stocks.reduce((sum, stock) => sum + stock.totalValue, 0)

  // Sales by status
  const salesByStatus = sales.reduce((acc, sale) => {
    acc[sale.status] = (acc[sale.status] || 0) + 1
    return acc
  }, {})

  // Top selling products
  const productSales = sales.reduce((acc, sale) => {
    if (sale.status === "completed") {
      acc[sale.productId] = (acc[sale.productId] || 0) + sale.quantity
    }
    return acc
  }, {})

  const topProducts = Object.entries(productSales)
    .map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId)
      return { product, quantity }
    })
    .filter((item) => item.product)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)

  // Monthly sales data (mock data for chart)
  const monthlySales = [
    { month: "Jan", sales: 45000, orders: 23 },
    { month: "Feb", sales: 52000, orders: 28 },
    { month: "Mar", sales: 48000, orders: 25 },
    { month: "Apr", sales: 61000, orders: 32 },
    { month: "May", sales: 55000, orders: 29 },
    { month: "Jun", sales: 67000, orders: 35 },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{netRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-600 dark:text-green-400">+12.5% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{sales.length}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">+8.2% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Stock Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalStockValue.toLocaleString()}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">{lowStockItems} low stock items</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹
                {sales.length > 0
                  ? Math.round(totalRevenue / sales.filter((s) => s.status === "completed").length).toLocaleString()
                  : 0}
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400">+5.1% from last month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Sales Trend</h3>
          <div className="space-y-4">
            {monthlySales.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">{data.month}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-32">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(data.sales / 70000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ₹{data.sales.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{data.orders} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Status Distribution</h3>
          <div className="space-y-4">
            {Object.entries(salesByStatus).map(([status, count]) => {
              const percentage = (count / sales.length) * 100
              const getStatusColor = (status) => {
                switch (status) {
                  case "completed":
                    return "bg-green-600"
                  case "pending":
                    return "bg-yellow-600"
                  case "cancelled":
                    return "bg-red-600"
                  case "refunded":
                    return "bg-purple-600"
                  default:
                    return "bg-gray-600"
                }
              }

              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize w-20">
                      {status}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-32">
                      <div
                        className={`h-2 rounded-full ${getStatusColor(status)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{count}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top Products and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.product.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.product.sku}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{item.quantity} sold</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    ₹{((item.product.sellingPrice || 0) * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Returns */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Returns</h3>
          <div className="space-y-4">
            {returns.slice(0, 5).map((returnItem, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{returnItem.productName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{returnItem.returnNumber}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ₹{returnItem.totalRefund.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{returnItem.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsView
