"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Camera,
  Package,
  DollarSign,
  Warehouse,
  Menu,
  Download,
  Scan,
  AlertCircle,
  CheckCircle,
  Search,
  Eye,
  Upload,
} from "lucide-react";
import jsQR from "jsqr";
import { QRCodeCanvas } from "qrcode.react";
import LiveQRScanner from "./LiveQRScanner"; // Import the dedicated live scanner
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductScanner = ({ products = [], onClose, onMenuClick }) => {
  const [showLiveScanner, setShowLiveScanner] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [qrCodeData, setQrCodeData] = useState(""); // This will store the URL for the generated QR image
  const [scanHistory, setScanHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const fileInputRef = useRef(null);
  const [product, setProduct] = useState(null);

  // Sample products if none provided
  const sampleProducts = [
    {
      id: "1",
      name: "Wireless Headphones",
      sku: "WH-001",
      barcode: "123456789012",
      category: "Electronics",
      brand: "TechSound",
      sellingPrice: 2999,
      initialStock: 50,
      description: "Premium wireless headphones with noise cancellation",
    },
    {
      id: "2",
      name: "Cotton T-Shirt",
      sku: "CT-002",
      barcode: "234567890123",
      category: "Clothing",
      brand: "ComfortWear",
      sellingPrice: 599,
      initialStock: 100,
      description: "100% cotton comfortable t-shirt",
    },
    {
      id: "3",
      name: "Smartphone Case",
      sku: "SC-003",
      barcode: "345678901234",
      category: "Accessories",
      brand: "ProtectPlus",
      sellingPrice: 299,
      initialStock: 200,
      description: "Durable smartphone protective case",
    },
  ];
  const handleSaveScan = async (product) => {
    if (!product) return toast.error("No product scanned");

    try {
      await axios.post("http://localhost:5000/api/scanned-products", {
        id: product._id,
        name: product.name,
        sku: product.sku,
        barcode: product.barcode,
        category: product.category,
        brand: product.brand,
        sellingPrice: product.sellingPrice,
        stock: product.stock,
        scannedAt: new Date().toISOString(),
      });

      toast.success("✅ Scanned product saved");
    } catch (error) {
      console.error("Save scan error:", error);
      toast.error("❌ Failed to save scan");
    }
  };


  const productsList = products.length > 0 ? products : sampleProducts;

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "success" }),
      3000
    );
  };

  // Generate QR code when product is scanned or selected
  useEffect(() => {
    const generateQR = () => {
      if (scannedProduct) {
        // Use a simple JSON string for QR code data
        const qrData = JSON.stringify({
          id: scannedProduct.id,
          name: scannedProduct.name,
          sku: scannedProduct.sku,
          price: scannedProduct.sellingPrice,
        });
        // QRCodeCanvas will render the QR code, we don't need to generate a URL here
        // The QR code will be rendered directly in the JSX
      }
    };
    generateQR();
  }, [scannedProduct]);

  const resetScanner = () => {
    setScannedProduct(null);
    setQrCodeData("");
    setShowProductDetails(false);
    showNotification("Scanner reset.", "info");
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code-canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${scannedProduct.sku}-qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      showNotification("QR Code downloaded!");
    }
  };

  const searchProducts = (query) => {
    if (!query) return productsList;
    return productsList.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
    );
  };

  const selectProduct = (product) => {
    setScannedProduct(product);
    setScanHistory((prev) => [...prev, { ...product, scannedAt: new Date() }]);
    showNotification("Product selected!");

    // Also show some random products
    const random = productsList
      .filter((p) => p.id !== product.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setRandomProducts(random);
  };

  const handleLiveScanSuccess = (decodedText) => {
    setShowLiveScanner(false); // Close the scanner modal
    try {
      // Attempt to parse as JSON first (for QR codes with structured data)
      const parsedData = JSON.parse(decodedText);
      if (parsedData.id) {
        const product = productsList.find(
          (p) => p.id === parsedData.id || p.barcode === parsedData.id
        );
        if (product) {
          setScannedProduct(product);
          setScanHistory((prev) => [
            ...prev,
            { ...product, scannedAt: new Date(), scannedBy: "live-scanner" },
          ]);
          showNotification("Product scanned successfully!");
        } else {
          showNotification("Product not found for scanned data.", "error");
          setScannedProduct({
            id: "unknown",
            name: "Unknown Product",
            sku: decodedText,
            description: `Scanned data: ${decodedText}`,
          });
        }
      } else {
        // If not structured JSON, treat as a simple barcode/text
        const product = productsList.find(
          (p) => p.barcode === decodedText || p.sku === decodedText
        );
        if (product) {
          setScannedProduct(product);
          setScanHistory((prev) => [
            ...prev,
            { ...product, scannedAt: new Date(), scannedBy: "live-scanner" },
          ]);
          showNotification("Product scanned successfully!");
        } else {
          showNotification(
            "Product not found for scanned barcode/text.",
            "error"
          );
          setScannedProduct({
            id: "unknown",
            name: "Unknown Product",
            sku: decodedText,
            description: `Scanned barcode/text: ${decodedText}`,
          });
        }
      }
    } catch (error) {
      // If parsing fails, treat as a simple barcode/text
      const product = productsList.find(
        (p) => p.barcode === decodedText || p.sku === decodedText
      );
      if (product) {
        setScannedProduct(product);
        setScanHistory((prev) => [
          ...prev,
          { ...product, scannedAt: new Date(), scannedBy: "live-scanner" },
        ]);
        showNotification("Product scanned successfully!");
      } else {
        showNotification(
          "Product not found for scanned barcode/text.",
          "error"
        );
        setScannedProduct({
          id: "unknown",
          name: "Unknown Product",
          sku: decodedText,
          description: `Scanned barcode/text: ${decodedText}`,
        });
      }
    }
  };

  const handleQrCodeUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.crossOrigin = "anonymous"; // Important for canvas operations to avoid CORS issues
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          try {
            const parsedData = JSON.parse(code.data);
            if (parsedData.id) {
              const product = productsList.find(
                (p) => p.id === parsedData.id || p.barcode === parsedData.id
              );
              if (product) {
                setScannedProduct(product);
                setScanHistory((prev) => [
                  ...prev,
                  { ...product, scannedAt: new Date(), scannedBy: "upload" },
                ]);
                showNotification("Product scanned successfully from upload!");
              } else {
                showNotification(
                  "Product not found for uploaded QR data.",
                  "error"
                );
                setScannedProduct({
                  id: "unknown",
                  name: "Unknown Product",
                  sku: parsedData.sku || code.data,
                  description: `Scanned data from upload: ${code.data}`,
                });
              }
            } else {
              // If not structured JSON, treat as a simple barcode/text
              const product = productsList.find(
                (p) => p.barcode === code.data || p.sku === code.data
              );
              if (product) {
                setScannedProduct(product);
                setScanHistory((prev) => [
                  ...prev,
                  { ...product, scannedAt: new Date(), scannedBy: "upload" },
                ]);
                showNotification("Product scanned successfully from upload!");
              } else {
                showNotification(
                  "Product not found for uploaded barcode/text.",
                  "error"
                );
                setScannedProduct({
                  id: "unknown",
                  name: "Unknown Product",
                  sku: code.data,
                  description: `Scanned barcode/text from upload: ${code.data}`,
                });
              }
            }
          } catch (error) {
            // If parsing fails, treat as a simple barcode/text
            const product = productsList.find(
              (p) => p.barcode === code.data || p.sku === code.data
            );
            if (product) {
              setScannedProduct(product);
              setScanHistory((prev) => [
                ...prev,
                { ...product, scannedAt: new Date(), scannedBy: "upload" },
              ]);
              showNotification("Product scanned successfully from upload!");
            } else {
              showNotification(
                "Product not found for uploaded barcode/text.",
                "error"
              );
              setScannedProduct({
                id: "unknown",
                name: "Unknown Product",
                sku: code.data,
                description: `Scanned barcode/text from upload: ${code.data}`,
              });
            }
          }
        } else {
          showNotification(
            "No QR code or barcode found in the image.",
            "error"
          );
        }
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Product Scanner
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {productsList.length} products
            </span>
            {scanHistory.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {scanHistory.length} scanned
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div
          className={`mx-4 mt-4 p-3 rounded-lg flex items-center gap-2 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : notification.type === "error"
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-4 h-4" />
          ) : notification.type === "error" ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <Scan className="w-4 h-4" />
          )}
          {notification.message}
        </div>
      )}

      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {!scannedProduct ? (
          <div className="max-w-4xl mx-auto">
            {/* Scanner Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Scan Product Barcode/QR Code
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Use your camera to scan a product's barcode or QR code, or
                upload an image.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowLiveScanner(true)}
                  className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 text-lg"
                >
                  <Camera className="w-6 h-6" />
                  Start Live Scan
                </button>
                <label
                  htmlFor="upload-qr"
                  className="px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2 text-lg cursor-pointer"
                >
                  <Upload className="w-6 h-6" />
                  Upload Image to Scan
                  <input
                    id="upload-qr"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleQrCodeUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            {/* Product Search Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Or Search Products Manually
              </h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, SKU, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchProducts(searchQuery)
                  .slice(0, 6)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            SKU: {product.sku}
                          </p>
                        </div>
                        <Package className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {product.category}
                      </p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">
                        ₹{product.sellingPrice?.toLocaleString()}
                      </p>
                      <button
                        onClick={() => selectProduct(product)}
                        className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Select Product
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {randomProducts.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Other Random Products
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {randomProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            SKU: {product.sku}
                          </p>
                        </div>
                        <Package className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {product.category}
                      </p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">
                        ₹{product.sellingPrice?.toLocaleString()}
                      </p>
                      <button
                        onClick={() => selectProduct(product)}
                        className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Select Product
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-green-50 dark:bg-green-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Product Found!
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {scannedProduct.barcode
                        ? `Barcode: ${scannedProduct.barcode}`
                        : `SKU: ${scannedProduct.sku}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Product Info */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {scannedProduct.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      SKU: {scannedProduct.sku}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Category: {scannedProduct.category || "N/A"} • Brand:{" "}
                      {scannedProduct.brand || "N/A"}
                    </p>
                    {scannedProduct.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {scannedProduct.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Selling Price
                        </p>
                        <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
                          ₹
                          {scannedProduct.sellingPrice?.toLocaleString() ||
                            "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Warehouse className="w-6 h-6 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          Stock Available
                        </p>
                        <p className="text-lg font-bold text-green-900 dark:text-green-100">
                          {scannedProduct.initialStock || "N/A"} units
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Product QR Code
                  </h4>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow border">
                      <QRCodeCanvas
                        value={JSON.stringify({
                          id: scannedProduct.id,
                          name: scannedProduct.name,
                          sku: scannedProduct.sku,
                          price: scannedProduct.sellingPrice,
                        })}
                        size={192}
                        id="qr-code-canvas"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={downloadQR}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download QR Code
                      </button>
                      <button
                        onClick={() =>
                          setShowProductDetails(!showProductDetails)
                        }
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        {showProductDetails ? "Hide" : "Show"} Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                {showProductDetails && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Additional Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Product ID:
                        </span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {scannedProduct.id}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          SKU:
                        </span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {scannedProduct.sku}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Category:
                        </span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {scannedProduct.category || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Brand:
                        </span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {scannedProduct.brand || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={resetScanner}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Scan className="w-4 h-4" />
                    Scan Another Product
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    Close Scanner
                  </button>
                  <button onClick={() => handleSaveScan(scannedProduct)} style={{backgroundColor:"rgb(27 75 209)", color:"white", borderRadius:"5px", padding:"5px 8px"}}>
                   + Add To Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showLiveScanner && (
        <LiveQRScanner
          onScanSuccess={handleLiveScanSuccess}
          onClose={() => setShowLiveScanner(false)}
        />
      )}
    </div>
  );
};

export default ProductScanner;
