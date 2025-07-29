"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Package, ArrowLeft, QrCode, X } from "lucide-react"
import QRCode from "qrcode"

const ProductDetail = ({ products, onBack }) => {
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")
  const [product, setProduct] = useState(null)
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [showQrModal, setShowQrModal] = useState(false)

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find((p) => p.id === productId)
      setProduct(foundProduct)
    }
  }, [productId, products])

  const generateQRCode = async () => {
    const url = `${window.location.origin}?id=${product.id}`
    try {
      const dataUrl = await QRCode.toDataURL(url, { width: 300 });
      setQrCodeUrl(dataUrl);
      setShowQrModal(true);
    } catch (err) {
      console.error("Failed to generate QR code", err)
    }
  };

  if (!product) {
    return (
      <div className="p-6">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-4">
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-6">
            <Package className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">SKU: {product.sku}</p>
          </div>
          <button
            onClick={generateQRCode}
            className="ml-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center transition-colors"
          >
            <QrCode size={20} className="mr-2" />
            Generate QR
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Category:</strong> {product.category}</li>
                    <li><strong>Sub-category:</strong> {product.subCategory}</li>
                    <li><strong>Brand:</strong> {product.brand}</li>
                    <li><strong>Selling Price:</strong> ₹{product.sellingPrice}</li>
                    <li><strong>Status:</strong> {product.status}</li>
                </ul>
            </div>
             <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
            </div>
        </div>
        
        {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Variants</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Color</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Size</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {product.variants.map(variant => (
                                <tr key={variant.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{variant.color}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{variant.size}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">₹{variant.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{variant.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>

      {showQrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" onClick={() => setShowQrModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">Scan QR Code</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Scan this code with your mobile device to view product details.</p>
            <img src={qrCodeUrl} alt={`QR code for ${product.name}`} className="mx-auto" />
            <a 
              href={qrCodeUrl} 
              download={`${product.sku}-qrcode.png`} 
              className="w-full mt-6 px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 font-medium transition-colors block"
            >
                Download QR Code
            </a>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductDetail
