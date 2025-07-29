"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, X, Package, BarChart3, ShoppingCart, Save, Trash2, Edit2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"

const Variants = ({ formData, updateFormData }) => {
  const [activeTab, setActiveTab] = useState("Color")
  const [selectedValue, setSelectedValue] = useState("")
  const [variants, setVariants] = useState(formData?.variants || [])
  const [showVariantsList, setShowVariantsList] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [editingVariant, setEditingVariant] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  
  const prevVariantsRef = useRef(formData?.variants || [])

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const variantTabs = [
    "Color",
    "Size",
    "Expiry",
    "Material",
    "Model",
    "Weight",
    "Skin type",
    "Packaging type",
    "Flavour",
    "Gender",
  ]

  const attributeOptions = {
    Color: [
      { value: "red", label: "Red", color: "#ef4444" },
      { value: "blue", label: "Blue", color: "#3b82f6" },
      { value: "green", label: "Green", color: "#10b981" },
      { value: "black", label: "Black", color: "#000000" },
      { value: "white", label: "White", color: "#ffffff" },
      { value: "yellow", label: "Yellow", color: "#f59e0b" },
      { value: "purple", label: "Purple", color: "#8b5cf6" },
      { value: "orange", label: "Orange", color: "#f97316" },
      { value: "pink", label: "Pink", color: "#ec4899" },
      { value: "gray", label: "Gray", color: "#6b7280" },
      { value: "brown", label: "Brown", color: "#92400e" },
      { value: "navy", label: "Navy Blue", color: "#1e3a8a" },
      { value: "maroon", label: "Maroon", color: "#7f1d1d" },
      { value: "gold", label: "Gold", color: "#d97706" },
      { value: "silver", label: "Silver", color: "#9ca3af" },
    ],
    Size: [
      { value: "xs", label: "Extra Small (XS)" },
      { value: "s", label: "Small (S)" },
      { value: "m", label: "Medium (M)" },
      { value: "l", label: "Large (L)" },
      { value: "xl", label: "Extra Large (XL)" },
      { value: "xxl", label: "Double XL (XXL)" },
      { value: "xxxl", label: "Triple XL (XXXL)" },
      { value: "28", label: "28 inches" },
      { value: "30", label: "30 inches" },
      { value: "32", label: "32 inches" },
      { value: "34", label: "34 inches" },
      { value: "36", label: "36 inches" },
      { value: "38", label: "38 inches" },
      { value: "40", label: "40 inches" },
      { value: "42", label: "42 inches" },
    ],
    Material: [
      { value: "cotton", label: "100% Cotton" },
      { value: "polyester", label: "Polyester" },
      { value: "silk", label: "Pure Silk" },
      { value: "wool", label: "Wool" },
      { value: "leather", label: "Genuine Leather" },
      { value: "plastic", label: "High Quality Plastic" },
      { value: "metal", label: "Stainless Steel" },
      { value: "wood", label: "Natural Wood" },
      { value: "bamboo", label: "Eco-friendly Bamboo" },
      { value: "glass", label: "Tempered Glass" },
      { value: "ceramic", label: "Ceramic" },
      { value: "rubber", label: "Natural Rubber" },
    ],
    Model: [
      { value: "premium", label: "Premium Model" },
      { value: "standard", label: "Standard Model" },
      { value: "basic", label: "Basic Model" },
      { value: "pro", label: "Pro Model" },
      { value: "lite", label: "Lite Model" },
      { value: "deluxe", label: "Deluxe Model" },
      { value: "sport", label: "Sport Model" },
      { value: "classic", label: "Classic Model" },
    ],
    Weight: [
      { value: "50g", label: "50 grams" },
      { value: "100g", label: "100 grams" },
      { value: "250g", label: "250 grams" },
      { value: "500g", label: "500 grams" },
      { value: "1kg", label: "1 kilogram" },
      { value: "2kg", label: "2 kilograms" },
      { value: "5kg", label: "5 kilograms" },
      { value: "10kg", label: "10 kilograms" },
    ],
    "Skin type": [
      { value: "oily", label: "Oily Skin" },
      { value: "dry", label: "Dry Skin" },
      { value: "combination", label: "Combination Skin" },
      { value: "sensitive", label: "Sensitive Skin" },
      { value: "normal", label: "Normal Skin" },
      { value: "acne", label: "Acne Prone Skin" },
      { value: "mature", label: "Mature Skin" },
    ],
    "Packaging type": [
      { value: "box", label: "Box Packaging" },
      { value: "bottle", label: "Bottle Packaging" },
      { value: "tube", label: "Tube Packaging" },
      { value: "sachet", label: "Sachet Packaging" },
      { value: "jar", label: "Jar Packaging" },
      { value: "pouch", label: "Pouch Packaging" },
      { value: "can", label: "Can Packaging" },
      { value: "blister", label: "Blister Pack" },
    ],
    Flavour: [
      { value: "vanilla", label: "Vanilla" },
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "mint", label: "Fresh Mint" },
      { value: "orange", label: "Orange" },
      { value: "lemon", label: "Lemon" },
      { value: "mango", label: "Mango" },
      { value: "apple", label: "Apple" },
      { value: "berry", label: "Mixed Berry" },
      { value: "coconut", label: "Coconut" },
    ],
    Gender: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "unisex", label: "Unisex" },
      { value: "boys", label: "Boys" },
      { value: "girls", label: "Girls" },
      { value: "kids", label: "Kids" },
      { value: "baby", label: "Baby" },
    ],
  }

  // Update parent form data when variants change
  useEffect(() => {
    if (JSON.stringify(prevVariantsRef.current) !== JSON.stringify(variants)) {
      prevVariantsRef.current = variants
      updateFormData({ variants })
    }
  }, [variants, updateFormData])

  const showError = (message) => {
    setError(message)
    setTimeout(() => setError(""), 5000)
  }

  const clearError = () => {
    setError("")
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setSelectedValue("")
    clearError()
  }

  const handleValueSelect = (value) => {
    setSelectedValue(value)
    clearError()
  }

  const generateVariantSKU = (type, value) => {
    try {
      const baseSKU = formData?.sku || "PROD"
      const typeCode = type.substring(0, 3).toUpperCase()
      const valueCode = value.substring(0, 3).toUpperCase()
      const timestamp = Date.now().toString().slice(-4)
      return `${baseSKU}-${typeCode}-${valueCode}-${timestamp}`
    } catch (error) {
      console.error("Error generating SKU:", error)
      return `PROD-VAR-${Date.now()}`
    }
  }

  const addVariant = async () => {
    if (!selectedValue) {
      showError(`Please select a ${activeTab.toLowerCase()} option`)
      return
    }

    setIsLoading(true)
    clearError()

    try {
      const existingVariant = variants.find(
        (v) => v.type?.toLowerCase() === activeTab.toLowerCase() && v.value === selectedValue,
      )

      if (existingVariant) {
        showError(`${activeTab} variant with "${selectedValue}" already exists!`)
        setIsLoading(false)
        return
      }

      const selectedOption = attributeOptions[activeTab]?.find((opt) => opt.value === selectedValue)

      const newVariant = {
        id: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: activeTab,
        value: selectedValue,
        label: selectedOption?.label || selectedValue,
        color: selectedOption?.color || null,
        sku: generateVariantSKU(activeTab, selectedValue),
        price: Number.parseFloat(formData?.sellingPrice) || 0,
        costPrice: Number.parseFloat(formData?.costPrice) || 0,
        stock: 0,
        minStock: 5,
        maxStock: 1000,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const updatedVariants = [...variants, newVariant]
      setVariants(updatedVariants)
      setSelectedValue("")
      setShowVariantsList(true)

      setTimeout(() => {
        alert(`✅ ${activeTab} variant "${selectedOption?.label || selectedValue}" added successfully!`)
      }, 100)
    } catch (error) {
      console.error("Error adding variant:", error)
      showError("Failed to add variant. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteVariant = (variantId) => {
    try {
      const variant = variants.find((v) => v.id === variantId)
      if (confirm(`Are you sure you want to delete the ${variant?.type} variant "${variant?.label}"?`)) {
        const updatedVariants = variants.filter((v) => v.id !== variantId)
        setVariants(updatedVariants)
        clearError()
      }
    } catch (error) {
      console.error("Error deleting variant:", error)
      showError("Failed to delete variant. Please try again.")
    }
  }

  const updateVariantField = (variantId, field, value) => {
    try {
      const updatedVariants = variants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              [field]: ["price", "costPrice", "stock", "minStock", "maxStock"].includes(field)
                ? Number.parseFloat(value) || 0
                : value,
              updatedAt: new Date().toISOString(),
            }
          : variant,
      )
      setVariants(updatedVariants)
      clearError()
    } catch (error) {
      console.error("Error updating variant:", error)
      showError("Failed to update variant. Please try again.")
    }
  }

  const toggleVariantStatus = (variantId) => {
    try {
      const updatedVariants = variants.map((variant) =>
        variant.id === variantId
          ? { ...variant, isActive: !variant.isActive, updatedAt: new Date().toISOString() }
          : variant,
      )
      setVariants(updatedVariants)
      clearError()
    } catch (error) {
      console.error("Error toggling variant status:", error)
      showError("Failed to update variant status. Please try again.")
    }
  }

  const duplicateVariant = (variantId) => {
    try {
      const originalVariant = variants.find((v) => v.id === variantId)
      if (originalVariant) {
        const duplicatedVariant = {
          ...originalVariant,
          id: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          sku: generateVariantSKU(originalVariant.type, originalVariant.value),
          label: `${originalVariant.label} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        const updatedVariants = [...variants, duplicatedVariant]
        setVariants(updatedVariants)
        clearError()
      }
    } catch (error) {
      console.error("Error duplicating variant:", error)
      showError("Failed to duplicate variant. Please try again.")
    }
  }

  if (!isMounted) {
    return (
      <Card className="w-full">
        <CardContent className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderProductTypeContent = () => {
    if (!formData?.productType) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Please select a product type first</p>
        </div>
      )
    }

    switch (formData.productType) {
      case "simple":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 md:py-12"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Package className="w-8 h-8 md:w-10 md:h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
              Simple Product
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6 max-w-md mx-auto px-4">
              This is a simple product without variants. You can manage basic inventory and pricing in the previous
              steps.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 px-4">
              <Badge className="bg-blue-100 text-blue-800 px-3 md:px-4 py-2">
                <Package className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Single Item
              </Badge>
              <Badge className="bg-green-100 text-green-800 px-3 md:px-4 py-2">
                <BarChart3 className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Basic Inventory
              </Badge>
            </div>
          </motion.div>
        )

      case "bundle":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 md:space-y-6">
            <div className="text-center py-6 md:py-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                Bundle Product
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6 max-w-md mx-auto px-4">
                Create a bundle by combining multiple products sold together as a package.
              </p>
            </div>
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Products to Bundle
                  </Button>
                  <div className="text-center py-6 md:py-8 text-gray-500 dark:text-gray-400">
                    <Package className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No bundle items added yet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case "variant":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 md:space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm md:text-base text-red-800 dark:text-red-200">{error}</p>
                    <Button variant="ghost" size="sm" onClick={clearError} className="text-red-600 hover:bg-red-100">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-right">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Product Type and Variants</p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {variantTabs.map((tab, index) => (
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant={activeTab === tab ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTabClick(tab)}
                      className={`w-full h-8 md:h-9 px-2 md:px-3 text-xs md:text-sm font-normal transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-blue-600 text-white shadow-sm border-blue-600"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {tab}
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 md:h-9 px-3 md:px-4 text-xs md:text-sm font-normal bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  + Add More
                </Button>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <Label className="text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2 md:mb-3 block">
                  Select {activeTab}
                </Label>

                {activeTab === "Expiry" ? (
                  <Input
                    type="date"
                    value={selectedValue}
                    onChange={(e) => handleValueSelect(e.target.value)}
                    className="w-full h-10 md:h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                ) : (
                  <Select value={selectedValue} onValueChange={handleValueSelect} disabled={isLoading}>
                    <SelectTrigger className="w-full h-10 md:h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 shadow-xl max-h-60 z-50">
                      {(attributeOptions[activeTab] || []).map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 cursor-pointer py-2 md:py-3"
                        >
                          <div className="flex items-center space-x-2 md:space-x-3">
                            {activeTab === "Color" && option.color && (
                              <div
                                className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300 shadow-sm flex-shrink-0"
                                style={{ backgroundColor: option.color }}
                              />
                            )}
                            <span className="text-sm md:text-base">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {selectedValue && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                  <Button
                    onClick={addVariant}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Add {activeTab} Variant
                  </Button>
                </motion.div>
              )}
            </div>

            {selectedValue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    {activeTab === "Color" &&
                      attributeOptions[activeTab]?.find((opt) => opt.value === selectedValue)?.color && (
                        <div
                          className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                          style={{
                            backgroundColor: attributeOptions[activeTab]?.find((opt) => opt.value === selectedValue)?.color,
                          }}
                        />
                      )}
                    <div>
                      <p className="text-sm md:text-base font-medium text-blue-900 dark:text-blue-100">
                        Selected {activeTab}:{" "}
                        {attributeOptions[activeTab]?.find((opt) => opt.value === selectedValue)?.label || selectedValue}
                      </p>
                      <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">Ready to add as variant</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedValue("")}
                    className="text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {variants.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">Total Variants: {variants.length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {variants.filter((v) => v.isActive).length} Active
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800 text-xs">
                      {variants.filter((v) => !v.isActive).length} Inactive
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVariantsList(!showVariantsList)}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50 w-full sm:w-auto"
                >
                  {showVariantsList ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showVariantsList ? "Hide" : "Show"} Variants
                </Button>
              </div>
            )}

            <AnimatePresence>
              {variants.length > 0 && showVariantsList && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 md:space-y-4"
                >
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Created Variants</h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {variants.map((variant) => (
                      <Card key={variant.id}>
                        <CardContent className="p-4 md:p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3 md:space-x-4">
                              {variant.color && (
                                <div
                                  className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                                  style={{ backgroundColor: variant.color }}
                                />
                              )}
                              <div>
                                <h5 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                                  {variant.label}
                                </h5>
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                  {variant.type} • {variant.sku}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={variant.isActive}
                                onCheckedChange={() => toggleVariantStatus(variant.id)}
                                className="data-[state=checked]:bg-blue-600"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteVariant(variant.id)}
                                className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <Separator className="my-3 md:my-4" />

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            <div>
                              <Label className="text-xs md:text-sm">Price</Label>
                              <Input
                                type="number"
                                value={variant.price}
                                onChange={(e) => updateVariantField(variant.id, "price", e.target.value)}
                                className="h-8 md:h-9 text-xs md:text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs md:text-sm">Cost</Label>
                              <Input
                                type="number"
                                value={variant.costPrice}
                                onChange={(e) => updateVariantField(variant.id, "costPrice", e.target.value)}
                                className="h-8 md:h-9 text-xs md:text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs md:text-sm">Stock</Label>
                              <Input
                                type="number"
                                value={variant.stock}
                                onChange={(e) => updateVariantField(variant.id, "stock", e.target.value)}
                                className="h-8 md:h-9 text-xs md:text-sm"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end mt-3 md:mt-4 space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => duplicateVariant(variant.id)}
                              className="text-xs md:text-sm"
                            >
                              <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              Duplicate
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingVariant(variant.id)}
                              className="text-xs md:text-sm"
                            >
                              <Edit2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Unknown product type</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {renderProductTypeContent()}
    </div>
  )
}

export default Variants
