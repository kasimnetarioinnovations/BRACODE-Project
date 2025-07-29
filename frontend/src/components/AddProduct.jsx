"use client"

import { useState } from "react"
import { ArrowLeft, Menu, CheckCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import StepIndicator from "./StepIndicator"
import GeneralInformation from "./form-steps/GeneralInformation"
import PricingTax from "./form-steps/PricingTax"
import DescriptionMedia from "./form-steps/DescriptionMedia"
import Variants from "./form-steps/Variants"

const AddProduct = ({ onSave, onCancel, onMenuClick }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [formData, setFormData] = useState({
    itemType: "goods",
    productType: "simple",
    status: "returnable",
    priceIncludeGst: false,
    keywords: [],
    variants: [],
    bundleItems: [],
    stock: 0,
    stockEntries: [],
    track: "serial",
  })

  const steps = [
    {
      id: 1,
      title: "General Information",
      subtitle: "Basic Info • Category • Supplier • Inventory • Product Type",
      description: "All basic information related to your product",
    },
    {
      id: 2,
      title: "Pricing & Tax",
      subtitle: "All price and tax-related information",
      description: "All price and tax-related",
    },
    {
      id: 3,
      title: "Description & Media",
      subtitle: "Images • Description • Documents • SEO",
      description: "Images • Description • Documents • SEO",
    },
    {
      id: 4,
      title: "Variants",
      subtitle: "Product Type and Variants",
      description: "Product Type and Variants",
    },
  ]

  const handleNext = async () => {
    if (currentStep < steps.length && !isAnimating) {
      setIsAnimating(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      setCurrentStep(currentStep + 1)
      setIsAnimating(false)
    }
  }

  const handlePrevious = async () => {
    if (currentStep > 1 && !isAnimating) {
      setIsAnimating(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      setCurrentStep(currentStep - 1)
      setIsAnimating(false)
    }
  }

  const handleSave = () => {
    const productToSave = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    onSave(productToSave)
    setShowSuccess(true)
  }

  const handleSaveAsDraft = () => {
    const drafts = JSON.parse(localStorage.getItem("munc-product-drafts") || "[]")
    const draftProduct = {
      ...formData,
      id: Date.now().toString(),
      isDraft: true,
      createdAt: new Date().toISOString(),
    }
    drafts.push(draftProduct)
    localStorage.setItem("munc-product-drafts", JSON.stringify(drafts))
    alert("Product saved as draft successfully!")
  }

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const isFormValid = () => {
    return formData.name && formData.sku && formData.category
  }

  const getStepTitle = () => {
    const step = steps.find((s) => s.id === currentStep)
    return step ? step.title : ""
  }

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      >
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-8 pb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <p className="text-gray-600 dark:text-gray-400 mb-8">The product has been successfully added.</p>
              <Button onClick={onCancel} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add More Product
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4"
      >
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <motion.h1
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
          >
            {getStepTitle()}
          </motion.h1>
        </div>
      </motion.div>

      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-6"
      >
        <StepIndicator steps={steps} currentStep={currentStep} />
      </motion.div>

      {/* Form Content with Animation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                scale: { duration: 0.2 },
              }}
              className="w-full"
            >
              {currentStep === 1 && <GeneralInformation formData={formData} updateFormData={updateFormData} />}
              {currentStep === 2 && <PricingTax formData={formData} updateFormData={updateFormData} />}
              {currentStep === 3 && <DescriptionMedia formData={formData} updateFormData={updateFormData} />}
              {currentStep === 4 && <Variants formData={formData} updateFormData={updateFormData} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center space-x-3">
            {currentStep > 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Button variant="outline" onClick={handlePrevious} disabled={isAnimating} className="px-6">
                  Previous
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="outline" onClick={handleSaveAsDraft} disabled={isAnimating} className="px-6">
                Save as draft
              </Button>
            </motion.div>

            {currentStep < steps.length ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button onClick={handleNext} disabled={isAnimating} className="px-8 bg-blue-600 hover:bg-blue-700">
                  {isAnimating ? "Loading..." : "Next"}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={handleSave}
                  disabled={!isFormValid() || isAnimating}
                  className="px-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Save
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AddProduct
