"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"

const PricingTax = ({ formData, updateFormData }) => {
  const handleChange = (field, value) => {
    updateFormData({ [field]: value })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full">
        <CardContent className="p-8 space-y-8">
          {/* Purchase and Selling Price */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-3">
              <Label htmlFor="purchase-price" className="text-base font-medium">
                Purchase Price
              </Label>
              <Input
                id="purchase-price"
                type="number"
                value={formData.purchasePrice || ""}
                onChange={(e) => handleChange("purchasePrice", Number.parseFloat(e.target.value) || 0)}
                placeholder="Enter New Product Name"
                className="h-12 text-base"
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="selling-price" className="text-base font-medium">
                Selling Price
              </Label>
              <Input
                id="selling-price"
                type="number"
                value={formData.sellingPrice || ""}
                onChange={(e) => handleChange("sellingPrice", Number.parseFloat(e.target.value) || 0)}
                placeholder="Enter SKU"
                className="h-12 text-base"
                min="0"
                step="0.01"
              />
            </div>
          </motion.div>

          {/* Wholesale Price and Quantity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-3">
              <Label htmlFor="wholesale-price" className="text-base font-medium">
                Wholesale Price / Bulk Price
              </Label>
              <Select
                value={formData.wholesalePrice || ""}
                onValueChange={(value) => handleChange("wholesalePrice", value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bulk-10">10+ Units - 10% off</SelectItem>
                  <SelectItem value="bulk-50">50+ Units - 15% off</SelectItem>
                  <SelectItem value="bulk-100">100+ Units - 20% off</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="unit" className="text-base font-medium">
                Unit
              </Label>
              <Select value={formData.unit || ""} onValueChange={(value) => handleChange("unit", value)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pieces">Pieces</SelectItem>
                  <SelectItem value="kg">Kilograms</SelectItem>
                  <SelectItem value="liters">Liters</SelectItem>
                  <SelectItem value="meters">Meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Quantity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <Label htmlFor="quantity" className="text-base font-medium">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity || ""}
              onChange={(e) => handleChange("quantity", Number.parseInt(e.target.value) || 0)}
              placeholder="In No."
              className="h-12 text-base"
              min="0"
            />
          </motion.div>

          {/* Discount Price and Period */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="space-y-3">
              <Label htmlFor="discount-price" className="text-base font-medium">
                Discount Price
              </Label>
              <Select
                value={formData.discountPrice || ""}
                onValueChange={(value) => handleChange("discountPrice", value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-percent">5% Discount</SelectItem>
                  <SelectItem value="10-percent">10% Discount</SelectItem>
                  <SelectItem value="15-percent">15% Discount</SelectItem>
                  <SelectItem value="20-percent">20% Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="discount-period-from" className="text-base font-medium">
                Discount Period
              </Label>
              <Input
                id="discount-period-from"
                type="date"
                value={formData.discountPeriodFrom || ""}
                onChange={(e) => handleChange("discountPeriodFrom", e.target.value)}
                placeholder="From"
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="discount-period-to" className="text-base font-medium opacity-0">
                To
              </Label>
              <Input
                id="discount-period-to"
                type="date"
                value={formData.discountPeriodTo || ""}
                onChange={(e) => handleChange("discountPeriodTo", e.target.value)}
                placeholder="To"
                className="h-12 text-base"
              />
            </div>
          </motion.div>

          {/* Tax Rate */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <Label htmlFor="tax-rate" className="text-base font-medium">
              Tax Rate
            </Label>
            <Select value={formData.taxRate || ""} onValueChange={(value) => handleChange("taxRate", value)}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0% (Exempt)</SelectItem>
                <SelectItem value="5">5% GST</SelectItem>
                <SelectItem value="12">12% GST</SelectItem>
                <SelectItem value="18">18% GST</SelectItem>
                <SelectItem value="28">28% GST</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* HSN/SAC */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Label htmlFor="hsn-sac" className="text-base font-medium">
              HSN / SAC
            </Label>
            <Select value={formData.hsnSac || ""} onValueChange={(value) => handleChange("hsnSac", value)}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="HSN Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8517">8517 - Telephone sets</SelectItem>
                <SelectItem value="8471">8471 - Automatic data processing machines</SelectItem>
                <SelectItem value="6203">6203 - Men's suits, ensembles</SelectItem>
                <SelectItem value="6204">6204 - Women's suits, ensembles</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Price Include GST */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-between py-6 border-t border-gray-200 dark:border-gray-700"
          >
            <Label htmlFor="price-include-gst" className="text-base font-semibold text-gray-900 dark:text-white">
              Price Include GST
            </Label>
            <Switch
              id="price-include-gst"
              checked={formData.priceIncludeGst || false}
              onCheckedChange={(checked) => handleChange("priceIncludeGst", checked)}
              className="data-[state=checked]:bg-blue-600"
            />
          </motion.div>

          {/* GST Rate - Only show if Price Include GST is enabled */}
          {formData.priceIncludeGst && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <Label htmlFor="gst-rate" className="text-base font-medium">
                GST Rate
              </Label>
              <Select value={formData.gstRate || ""} onValueChange={(value) => handleChange("gstRate", value)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="0%" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="18">18%</SelectItem>
                  <SelectItem value="28">28%</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default PricingTax
