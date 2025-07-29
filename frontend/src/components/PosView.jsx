"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, DollarSign, X, Printer, QrCode, Eye, Package, Download } from "lucide-react"

const PosView = ({ products, onSale }) => {
  const [cart, setCart] = useState([])
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [qrCodeData, setQrCodeData] = useState("")




  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }])
    setSelectedProduct(product)
    setShowProductDetails(true)
  }
  const handleProductClick = (product) => {
  setSelectedProduct(product);
  setShowDetailsModal(true);
};

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    )
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const total = cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0)
  
  // Generate QR code for selected product
  useEffect(() => {
    const generateQR = async () => {
      if (selectedProduct) {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify({
          id: selectedProduct.id,
          name: selectedProduct.name,
          sku: selectedProduct.sku,
          price: selectedProduct.sellingPrice
        }))}`;
        setQrCodeData(qrCodeUrl);
      }
    };
    generateQR();
  }, [selectedProduct]);
  
  // Function to print receipt
  const printReceipt = () => {
    // Create a print window
    const printWindow = window.open('', '_blank', 'width=300,height=600');
    
    // Generate receipt HTML content
    const receiptContent = `
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              width: 300px;
              margin: 0 auto;
              padding: 10px;
              font-size: 12px;
            }
            .header {
              text-align: center;
              margin-bottom: 10px;
            }
            .divider {
              border-top: 1px dotted #000;
              margin: 10px 0;
            }
            .item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            .total {
              font-weight: bold;
              margin-top: 10px;
              text-align: right;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>MUN-C Inventory</h2>
            <p>Receipt #${Date.now().toString().substring(8)}</p>
            <p>${new Date().toLocaleString()}</p>
          </div>
          <div class="divider"></div>
          <div>
            ${cart.map(item => `
              <div class="item">
                <div>${item.name} x ${item.quantity}</div>
                <div>₹${(item.sellingPrice * item.quantity).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
          <div class="divider"></div>
          <div class="total">
            <div class="item">
              <div>Total:</div>
              <div>₹${total.toFixed(2)}</div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="footer">
            <p>Thank you for your purchase!</p>
          </div>
        </body>
      </html>
    `;
    
    // Write the receipt content to the print window
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    
    // Print the receipt
    printWindow.print();
    // Close the print window after printing
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };

  return (
    <div className="flex h-full bg-gray-100 dark:bg-gray-800">
      {/* Product Selection */}
      <div className="w-1/2 p-4 flex flex-col">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <div className="grid grid-cols-3 gap-4 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-white rounded-lg shadow cursor-pointer"
             onClick={() => handleProductClick(product)}
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-2">
                  <Package className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-bold truncate">{product.name}</h3>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-green-600 font-semibold">₹{product.sellingPrice}</p>
                <span className="text-xs text-gray-500">{product.sku}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-1/2 p-4 bg-white dark:bg-gray-700">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        <div className="flex-grow overflow-y-auto">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center justify-between mb-2">
              <div>
                <p className="font-bold">{item.name}</p>
                <p>₹{item.sellingPrice}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 mr-2 border rounded"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xl font-bold">
            <p>Total</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onSale(cart)}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center"
            >
              <DollarSign size={20} className="mr-2" />
              Complete Sale
            </button>
            <button
              onClick={printReceipt}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center"
            >
              <Printer size={20} className="mr-2" />
              Print
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Details Modal */}
      {showDetailsModal  && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Product Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4 flex items-start">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {selectedProduct.sku}</p>
                {selectedProduct.barcode && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">Barcode: {selectedProduct.barcode}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                <p className="text-lg font-bold">₹{selectedProduct.sellingPrice}</p>
              </div>
              {selectedProduct.initialStock !== undefined && (
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Stock</p>
                  <p className="text-lg font-bold">{selectedProduct.initialStock} units</p>
                </div>
              )}
            </div>
            
            {selectedProduct.description && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedProduct.description}</p>
              </div>
            )}
            
            {/* QR Code */}
            <div className="mb-4 flex flex-col items-center">
              <h4 className="text-sm font-medium mb-2">Product QR Code</h4>
              {qrCodeData && (
                <div className="bg-white p-2 border rounded-lg shadow-sm mb-2">
                  <img src={qrCodeData} alt="Product QR Code" className="w-36 h-36" />
                </div>
              )}
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = qrCodeData;
                  link.download = `${selectedProduct.sku}-qrcode.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="text-sm text-blue-600 flex items-center"
              >
                <Download className="w-4 h-4 mr-1" />
                Download QR Code
              </button>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => addToCart(selectedProduct)}  
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PosView
