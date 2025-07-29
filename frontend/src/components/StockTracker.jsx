"use client"

import { useState } from "react"
import { Plus, Package, MapPin, Calendar, User, Trash2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const StockTracker = ({ formData, updateFormData, onStockChange }) => {
  const [newEntry, setNewEntry] = useState({
    quantity: "",
    reason: "",
    location: "",
    notes: "",
  })

  const stockReasons = [
    { value: "initial", label: "Initial Stock", color: "bg-blue-100 text-blue-800" },
    { value: "restocking", label: "Restocking", color: "bg-green-100 text-green-800" },
    { value: "return", label: "Customer Return", color: "bg-yellow-100 text-yellow-800" },
    { value: "adjustment", label: "Stock Adjustment", color: "bg-purple-100 text-purple-800" },
    { value: "transfer", label: "Warehouse Transfer", color: "bg-orange-100 text-orange-800" },
    { value: "production", label: "Production", color: "bg-indigo-100 text-indigo-800" },
  ]

  const locations = [
    "Main Warehouse - Delhi",
    "Secondary Warehouse - Mumbai",
    "Regional Warehouse - Bangalore",
    "Store Front",
  ]

  const handleAddStock = () => {
    if (!newEntry.quantity || !newEntry.reason || !newEntry.location) {
      alert("Please fill in all required fields")
      return
    }

    const quantity = Number.parseInt(newEntry.quantity)
    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity")
      return
    }

    const stockEntry = {
      id: Date.now().toString(),
      quantity: quantity,
      reason: newEntry.reason,
      location: newEntry.location,
      notes: newEntry.notes,
      timestamp: new Date().toISOString(),
      user: "Current User",
    }

    const updatedEntries = [...(formData.stockEntries || []), stockEntry]
    const newTotalStock = updatedEntries.reduce((total, entry) => total + entry.quantity, 0)

    updateFormData({
      stockEntries: updatedEntries,
      stock: newTotalStock,
    })

    onStockChange(newTotalStock)

    // Reset form
    setNewEntry({
      quantity: "",
      reason: "",
      location: "",
      notes: "",
    })
  }

  const handleRemoveEntry = (entryId) => {
    const updatedEntries = formData.stockEntries.filter((entry) => entry.id !== entryId)
    const newTotalStock = updatedEntries.reduce((total, entry) => total + entry.quantity, 0)

    updateFormData({
      stockEntries: updatedEntries,
      stock: newTotalStock,
    })

    onStockChange(newTotalStock)
  }

  const getReasonColor = (reason) => {
    const reasonObj = stockReasons.find((r) => r.value === reason)
    return reasonObj ? reasonObj.color : "bg-gray-100 text-gray-800"
  }

  const getReasonLabel = (reason) => {
    const reasonObj = stockReasons.find((r) => r.value === reason)
    return reasonObj ? reasonObj.label : reason
  }

  const totalStock = formData.stock || 0
  const totalEntries = formData.stockEntries?.length || 0

  return (
    <div className="space-y-6">
      {/* Stock Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Stock Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalStock}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Stock</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalEntries}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Stock Entries</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formData.stockEntries?.filter((e) => e.reason === "initial").length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Initial Entries</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Stock Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Stock Entry</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={newEntry.quantity}
                onChange={(e) => setNewEntry((prev) => ({ ...prev, quantity: e.target.value }))}
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason *</Label>
              <Select
                value={newEntry.reason}
                onValueChange={(value) => setNewEntry((prev) => ({ ...prev, reason: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {stockReasons.map((reason) => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select
                value={newEntry.location}
                onValueChange={(value) => setNewEntry((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                value={newEntry.notes}
                onChange={(e) => setNewEntry((prev) => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          <Button onClick={handleAddStock} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Stock Entry
          </Button>
        </CardContent>
      </Card>

      {/* Stock History */}
      {formData.stockEntries && formData.stockEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Stock History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.stockEntries.map((entry, index) => (
                <div key={entry.id}>
                  <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={getReasonColor(entry.reason)}>{getReasonLabel(entry.reason)}</Badge>
                        <span className="font-semibold text-lg">+{entry.quantity} units</span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{entry.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{entry.user}</span>
                        </div>
                      </div>

                      {entry.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{entry.notes}"</p>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveEntry(entry.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {index < formData.stockEntries.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default StockTracker
