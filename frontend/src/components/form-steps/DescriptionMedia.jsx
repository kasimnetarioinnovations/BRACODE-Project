"use client"

import { useState, useRef } from "react"
import { X, Sparkles, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const DescriptionMedia = ({ formData, updateFormData }) => {
  const [dragActive, setDragActive] = useState(false)
  const [images, setImages] = useState(formData.images || [])
  const [keywords, setKeywords] = useState(formData.keywords || [])
  const [newKeyword, setNewKeyword] = useState("")
  const fileInputRef = useRef(null)

  // AI-suggested keywords based on product type
  const aiSuggestedKeywords = [
    "Fittings",
    "Hinges",
    "Construction hardware materials",
    "Door and Windows",
    "Building supplies",
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files) => {
    const newImages = []
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            file: file,
            url: e.target.result,
            name: file.name,
            size: file.size,
          }
          newImages.push(newImage)
          if (newImages.length === files.length) {
            const updatedImages = [...images, ...newImages]
            setImages(updatedImages)
            updateFormData({ images: updatedImages })
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (imageId) => {
    const updatedImages = images.filter((img) => img.id !== imageId)
    setImages(updatedImages)
    updateFormData({ images: updatedImages })
  }

  const addKeyword = (keyword) => {
    if (keyword && !keywords.includes(keyword)) {
      const updatedKeywords = [...keywords, keyword]
      setKeywords(updatedKeywords)
      updateFormData({ keywords: updatedKeywords })
    }
  }

  const removeKeyword = (keywordToRemove) => {
    const updatedKeywords = keywords.filter((k) => k !== keywordToRemove)
    setKeywords(updatedKeywords)
    updateFormData({ keywords: updatedKeywords })
  }

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      addKeyword(newKeyword.trim())
      setNewKeyword("")
    }
  }

  const handleKeywordKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddKeyword()
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full">
        <CardContent className="p-8 space-y-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <Label htmlFor="description" className="text-base font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Add more about your product..."
              value={formData.description || ""}
              onChange={(e) => updateFormData({ description: e.target.value })}
              rows={6}
              className="w-full text-base resize-none"
            />
          </motion.div>

          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <motion.div className="space-y-6" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>

                <div>
                  <p className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    Drag your image here, or{" "}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-700 underline font-semibold"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400">Supports JPEG, PNG, JPG</p>
                </div>
              </motion.div>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                  Uploaded Images ({images.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      className="relative group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">{image.name}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* SEO Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-3">
              <Label htmlFor="seoTitle" className="text-base font-medium">
                SEO Meta Title
              </Label>
              <Input
                id="seoTitle"
                placeholder="Add Title"
                value={formData.seoTitle || ""}
                onChange={(e) => updateFormData({ seoTitle: e.target.value })}
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="seoDescription" className="text-base font-medium">
                SEO Meta Description
              </Label>
              <Input
                id="seoDescription"
                placeholder="Meta Description"
                value={formData.seoDescription || ""}
                onChange={(e) => updateFormData({ seoDescription: e.target.value })}
                className="h-12 text-base"
              />
            </div>
          </motion.div>

          {/* AI Keywords Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <Label className="text-lg font-semibold text-gray-900 dark:text-white">AI Keywords</Label>
            </div>

            <p className="text-base text-gray-600 dark:text-gray-400">
              Based on your product data, we've identified <strong>5 keywords</strong> that may be a good fit for your
              product.
            </p>

            {/* AI Suggested Keywords */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {aiSuggestedKeywords.map((keyword, index) => (
                  <motion.div
                    key={keyword}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => addKeyword(keyword)}
                      disabled={keywords.includes(keyword)}
                      className={`h-10 text-sm font-medium transition-all duration-200 ${
                        keywords.includes(keyword)
                          ? "bg-blue-100 border-blue-300 text-blue-700"
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {keyword}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Manual Keyword Input */}
            <div className="space-y-3">
              <Label htmlFor="keywords" className="text-base font-medium">
                Add Custom Keywords
              </Label>
              <div className="flex space-x-3">
                <Input
                  id="keywords"
                  placeholder="Enter keyword and press Enter"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={handleKeywordKeyPress}
                  className="h-12 text-base flex-1"
                />
                <Button onClick={handleAddKeyword} className="h-12 px-6">
                  Add
                </Button>
              </div>
            </div>

            {/* Selected Keywords */}
            {keywords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <Label className="text-base font-medium">Selected Keywords ({keywords.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <motion.div
                      key={keyword}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        <span>{keyword}</span>
                        <button
                          onClick={() => removeKeyword(keyword)}
                          className="ml-1 hover:text-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DescriptionMedia
