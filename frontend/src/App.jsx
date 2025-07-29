// "use client";

// import { useState, useEffect } from "react";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./components/Dashboard";
// import AddProduct from "./components/AddProduct";
// import AuthModal from "./components/AuthModal";
// import NotificationPanel from "./components/NotificationPanel";
// import SettingsModal from "./components/SettingsModal";
// import Header from "./components/Header";
// import ProductScanner from "./components/ProductScanner";
// import StocksView from "./components/StocksView";
// import SalesView from "./components/SalesView";
// import DocumentsView from "./components/DocumentsView";
// import ReportsView from "./components/ReportsView";
// import ReturnAuditView from "./components/ReturnAuditView";
// import PosView from "./components/PosView";
// import ProductDetail from "./components/ProductDetail";
// import { Package, TrendingUp, DollarSign, Warehouse } from "lucide-react";
// import axios from "axios";

// // Sample data generators
// const generateSampleProducts = () => [

//   {
//     id: "2",
//     createdAt: new Date().toISOString(),
//     itemType: "services",
//     name: "Technical Consultation",
//     sku: "SRV-001",
//     category: "consulting",
//     subCategory: "technical",
//     productType: "simple",
//     serviceType: "one-time",
//     duration: 2,
//     durationUnit: "hours",
//     status: "returnable",
//     sellingPrice: 2500,
//     description: "Expert technical consultation for IT infrastructure",
//     keywords: ["consultation", "technical", "expert"],
//   },
//   {
//     id: "3",
//     createdAt: new Date().toISOString(),
//     itemType: "goods",
//     name: "Smartphone Case Premium",
//     sku: "ACC-001",
//     barcode: "9876543210987",
//     category: "electronics",
//     subCategory: "accessories",
//     brand: "generic",
//     productType: "variant",
//     supplier: "supplier2",
//     supplierSku: "SUP-ACC-001",
//     warehouse: "warehouse-b",
//     status: "returnable",
//     purchasePrice: 200,
//     sellingPrice: 500,
//     initialStock: 100,
//     reorderLevel: 20,
//     description: "Protective smartphone case with premium materials",
//     variants: [
//       {
//         id: "v4",
//         color: "Red",
//         size: "iPhone 14",
//         material: "Silicone",
//         weight: "50g",
//         sku: "ACC-001-RED",
//         price: 500,
//         stock: 25,
//       },
//       {
//         id: "v5",
//         color: "Blue",
//         size: "iPhone 14",
//         material: "Leather",
//         weight: "60g",
//         sku: "ACC-001-BLU",
//         price: 600,
//         stock: 20,
//       },
//     ],
//   },
// ];

// const generateSampleStocks = (products) =>
//   products.map((product, index) => ({
//     id: `stock-${product.id}`,
//     productId: product.id,
//     productName: product.name,
//     sku: product.sku,
//     currentStock: product.initialStock || Math.floor(Math.random() * 100) + 10,
//     minStock: product.reorderLevel || 10,
//     maxStock: (product.initialStock || 50) * 2,
//     location:
//       product.warehouse === "warehouse-a"
//         ? "Main Warehouse - Delhi"
//         : product.warehouse === "warehouse-b"
//         ? "Secondary Warehouse - Mumbai"
//         : "Regional Warehouse - Bangalore",
//     lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
//     status: Math.random() > 0.3 ? "in-stock" : "low-stock",
//     unitCost: product.purchasePrice || Math.floor(Math.random() * 1000) + 100,
//     totalValue:
//       (product.purchasePrice || Math.floor(Math.random() * 1000) + 100) *
//       (product.initialStock || Math.floor(Math.random() * 100) + 10),
//   }));

// const generateSampleSales = (products) => {
//   const sales = [];
//   for (let i = 0; i < 15; i++) {
//     const product = products[Math.floor(Math.random() * products.length)];
//     const quantity = Math.floor(Math.random() * 5) + 1;
//     const unitPrice = product.sellingPrice || Math.floor(Math.random() * 1000) + 100;
//     sales.push({
//       id: `sale-${Date.now()}-${i}`,
//       invoiceNumber: `INV-${String(i + 1).padStart(4, "0")}`,
//       productId: product.id,
//       productName: product.name,
//       sku: product.sku,
//       quantity,
//       unitPrice,
//       totalPrice: unitPrice * quantity,
//       customerName: `Customer ${i + 1}`,
//       customerEmail: `customer${i + 1}@example.com`,
//       customerPhone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
//       saleDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
//       status: ["completed", "pending", "cancelled", "refunded"][Math.floor(Math.random() * 4)],
//       paymentMethod: ["card", "cash", "upi", "bank-transfer"][Math.floor(Math.random() * 4)],
//       discount: Math.floor(Math.random() * 10),
//       tax: 18,
//       notes: `Sale transaction for ${product.name}`,
//     });
//   }
//   return sales;
// };

// const generateSampleDocuments = () => [
//   {
//     id: "doc-1",
//     name: "Inventory Report Q4 2024",
//     type: "report",
//     category: "inventory",
//     url: "/documents/inventory-q4.pdf",
//     createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
//     size: 2048576,
//     description: "Quarterly inventory analysis and stock movement report",
//     tags: ["inventory", "quarterly", "analysis"],
//   },
//   {
//     id: "doc-2",
//     name: "Sales Invoice #INV-0001",
//     type: "invoice",
//     category: "sales",
//     url: "/documents/invoice-001.pdf",
//     createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
//     size: 1024000,
//     description: "Sales invoice for Premium Wireless Headphones",
//     tags: ["invoice", "sales", "customer"],
//   },
//   {
//     id: "doc-3",
//     name: "Purchase Order #PO-2024-001",
//     type: "purchase-order",
//     category: "procurement",
//     url: "/documents/po-001.pdf",
//     createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
//     size: 856432,
//     description: "Purchase order for electronics inventory restocking",
//     tags: ["purchase", "procurement", "supplier"],
//   },
//   {
//     id: "doc-4",
//     name: "Tax Compliance Report 2024",
//     type: "tax-report",
//     category: "compliance",
//     url: "/documents/tax-report-2024.pdf",
//     createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
//     size: 3145728,
//     description: "Annual tax compliance and GST filing report",
//     tags: ["tax", "compliance", "gst"],
//   },
// ];

// const generateSampleReturns = (products, sales) => {
//   const returns = [];
//   for (let i = 0; i < 8; i++) {
//     const sale = sales[Math.floor(Math.random() * sales.length)];
//     const product = products.find((p) => p.id === sale.productId);
//     returns.push({
//       id: `return-${Date.now()}-${i}`,
//       returnNumber: `RET-${String(i + 1).padStart(4, "0")}`,
//       saleId: sale.id,
//       invoiceNumber: sale.invoiceNumber,
//       productId: product.id,
//       productName: product.name,
//       sku: product.sku,
//       quantity: Math.floor(Math.random() * sale.quantity) + 1,
//       unitPrice: sale.unitPrice,
//       totalRefund: sale.unitPrice * (Math.floor(Math.random() * sale.quantity) + 1),
//       customerName: sale.customerName,
//       customerEmail: sale.customerEmail,
//       returnDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
//       reason: ["defective", "wrong-item", "customer-request", "damaged"][Math.floor(Math.random() * 4)],
//       status: ["pending", "approved", "rejected", "completed"][Math.floor(Math.random() * 4)],
//       condition: ["new", "used", "damaged"][Math.floor(Math.random() * 3)],
//       refundMethod: sale.paymentMethod,
//       notes: `Return request for ${product.name} - ${["Quality issue", "Size mismatch", "Changed mind", "Received damaged"][Math.floor(Math.random() * 4)]}`,
//       processedBy: "Admin User",
//       processedAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
//     });
//   }
//   return returns;
// };

// // Dashboard Stats Component
// const DashboardStats = ({ products, stocks, sales }) => {
//   const totalProducts = products.length;
//   const lowStockItems = stocks.filter((s) => s.currentStock <= s.minStock).length;
//   const totalSales = sales.reduce((sum, sale) => sum + (sale.status === "completed" ? sale.totalPrice : 0), 0);
//   const completedSales = sales.filter((s) => s.status === "completed").length;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//         <div className="flex items-center">
//           <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
//             <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//           </div>
//           <div className="ml-4">
//             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
//             <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalProducts}</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//         <div className="flex items-center">
//           <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
//             <Warehouse className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
//           </div>
//           <div className="ml-4">
//             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
//             <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowStockItems}</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//         <div className="flex items-center">
//           <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
//             <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
//           </div>
//           <div className="ml-4">
//             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
//             <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalSales.toLocaleString()}</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//         <div className="flex items-center">
//           <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
//             <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//           </div>
//           <div className="ml-4">
//             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Orders</p>
//             <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedSales}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Content Component
// const AppContent = () => {
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [products, setProducts] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [sales, setSales] = useState([]);
//   const [documents, setDocuments] = useState([]);
//   const [returns, setReturns] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authMode, setAuthMode] = useState("login");
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { user, isAuthenticated, notifications, addNotification } = useAuth();

//   // // Load data from localStorage on component mount
//   // useEffect(() => {
//   //   const loadData = () => {
//   //     try {
//   //       // Load products
//   //       const savedProducts = localStorage.getItem("munc-inventory-products");
//   //       let loadedProducts = [];
//   //       if (savedProducts) {
//   //         loadedProducts = JSON.parse(savedProducts);
//   //       } else {
//   //         loadedProducts = generateSampleProducts();
//   //         localStorage.setItem("munc-inventory-products", JSON.stringify(loadedProducts));
//   //       }
//   //       setProducts(loadedProducts);

//   //       // Load stocks
//   //       const savedStocks = localStorage.getItem("munc-inventory-stocks");
//   //       let loadedStocks = [];
//   //       if (savedStocks) {
//   //         loadedStocks = JSON.parse(savedStocks);
//   //       } else {
//   //         loadedStocks = generateSampleStocks(loadedProducts);
//   //         localStorage.setItem("munc-inventory-stocks", JSON.stringify(loadedStocks));
//   //       }
//   //       setStocks(loadedStocks);

//   //       // Load sales
//   //       const savedSales = localStorage.getItem("munc-inventory-sales");
//   //       let loadedSales = [];
//   //       if (savedSales) {
//   //         loadedSales = JSON.parse(savedSales);
//   //       } else {
//   //         loadedSales = generateSampleSales(loadedProducts);
//   //         localStorage.setItem("munc-inventory-sales", JSON.stringify(loadedSales));
//   //       }
//   //       setSales(loadedSales);

//   //       // Load documents
//   //       const savedDocuments = localStorage.getItem("munc-inventory-documents");
//   //       let loadedDocuments = [];
//   //       if (savedDocuments) {
//   //         loadedDocuments = JSON.parse(savedDocuments);
//   //       } else {
//   //         loadedDocuments = generateSampleDocuments();
//   //         localStorage.setItem("munc-inventory-documents", JSON.stringify(loadedDocuments));
//   //       }
//   //       setDocuments(loadedDocuments);

//   //       // Load returns
//   //       const savedReturns = localStorage.getItem("munc-inventory-returns");
//   //       let loadedReturns = [];
//   //       if (savedReturns) {
//   //         loadedReturns = JSON.parse(savedReturns);
//   //       } else {
//   //         loadedReturns = generateSampleReturns(loadedProducts, loadedSales);
//   //         localStorage.setItem("munc-inventory-returns", JSON.stringify(loadedReturns));
//   //       }
//   //       setReturns(loadedReturns);
//   //     } catch (error) {
//   //       console.error("Error loading data:", error);
//   //       // Reset data if corrupted
//   //       const freshProducts = generateSampleProducts();
//   //       setProducts(freshProducts);
//   //       setStocks(generateSampleStocks(freshProducts));
//   //       setSales(generateSampleSales(freshProducts));
//   //       setDocuments(generateSampleDocuments());
//   //       setReturns(generateSampleReturns(freshProducts, generateSampleSales(freshProducts)));
//   //     }
//   //   };

//   //   loadData();
//   // }, []);



//   // // // Save data to localStorage whenever data changes
//   // useEffect(() => {
//   //   if (products.length > 0) {
//   //     localStorage.setItem("munc-inventory-products", JSON.stringify(products));
//   //   }
//   // }, [products]);
  
//   // ✅ Load data from localStorage
//   useEffect(() => {
//     const loadData = () => {
//       try {
//         // Products
//         const savedProducts = localStorage.getItem("munc-inventory-products");
//         let loadedProducts = [];
//         if (savedProducts) {
//           loadedProducts = JSON.parse(savedProducts);
//         } else {
//           loadedProducts = generateSampleProducts();
//           localStorage.setItem("munc-inventory-products", JSON.stringify(loadedProducts));
//         }
//         setProducts(loadedProducts);

//         // Stocks
//         const savedStocks = localStorage.getItem("munc-inventory-stocks");
//         let loadedStocks = [];
//         if (savedStocks) {
//           loadedStocks = JSON.parse(savedStocks);
//         } else {
//           loadedStocks = generateSampleStocks(loadedProducts);
//           localStorage.setItem("munc-inventory-stocks", JSON.stringify(loadedStocks));
//         }
//         setStocks(loadedStocks);

//         // Sales
//         const savedSales = localStorage.getItem("munc-inventory-sales");
//         let loadedSales = [];
//         if (savedSales) {
//           loadedSales = JSON.parse(savedSales);
//         } else {
//           loadedSales = generateSampleSales(loadedProducts);
//           localStorage.setItem("munc-inventory-sales", JSON.stringify(loadedSales));
//         }
//         setSales(loadedSales);

//         // Documents
//         const savedDocuments = localStorage.getItem("munc-inventory-documents");
//         let loadedDocuments = [];
//         if (savedDocuments) {
//           loadedDocuments = JSON.parse(savedDocuments);
//         } else {
//           loadedDocuments = generateSampleDocuments();
//           localStorage.setItem("munc-inventory-documents", JSON.stringify(loadedDocuments));
//         }
//         setDocuments(loadedDocuments);

//         // Returns
//         const savedReturns = localStorage.getItem("munc-inventory-returns");
//         let loadedReturns = [];
//         if (savedReturns) {
//           loadedReturns = JSON.parse(savedReturns);
//         } else {
//           loadedReturns = generateSampleReturns(loadedProducts, loadedSales);
//           localStorage.setItem("munc-inventory-returns", JSON.stringify(loadedReturns));
//         }
//         setReturns(loadedReturns);
//       } catch (error) {
//         console.error("Error loading localStorage data:", error);
//         const freshProducts = generateSampleProducts();
//         setProducts(freshProducts);
//         setStocks(generateSampleStocks(freshProducts));
//         setSales(generateSampleSales(freshProducts));
//         setDocuments(generateSampleDocuments());
//         setReturns(generateSampleReturns(freshProducts, generateSampleSales(freshProducts)));
//       }
//     };

//     loadData();
//   }, []);

// // 🔁 Save to DB helper
// const saveProductsToDB = async (dataToSave) => {
//   try {
//     const response = await axios.post("http://localhost:5000/api/products/bulk", {
//       products: dataToSave,
//     });

//     if (response.data.success) {
//       console.log(`✅ Products saved to DB: ${response.data.added} added, ${response.data.updated} updated`);
//     }
//   } catch (error) {
//     console.error("❌ Failed to save products to DB:", error.response?.data || error.message);
//   }
// };
// const fetchProductsFromDB = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/api/products");

//     // Check if response structure is as expected
//     if (response?.data?.success && Array.isArray(response.data.products)) {
//       setProducts(response.data.products);
//       console.log("Fetched from DB:", response.data.products);
//     } else {
//       console.error("Unexpected API response:", response);
//     }
//   } catch (error) {
//     console.error("Failed to fetch products from DB:", error);
//   }
// };


// useEffect(() => {
//   fetchProductsFromDB();
// }, []);


// useEffect(() => {
//   const loadData = () => {
//     try {
//       const savedProducts = localStorage.getItem("munc-inventory-products");
//       let loadedProducts = [];
//       if (savedProducts) {
//         loadedProducts = JSON.parse(savedProducts);
//       } else {
//         loadedProducts = generateSampleProducts();
//         localStorage.setItem("munc-inventory-products", JSON.stringify(loadedProducts));
//       }
//       setProducts(loadedProducts);
//       saveProductsToDB(loadedProducts); // 🔁 Save immediately after load

//       // ... repeat for other sections like stocks, etc.
//     } catch (error) {
//       console.error("Error loading localStorage data:", error);
//     }
//   };

//   loadData();
// }, []);

// useEffect(() => {
//   if (products.length === 0) return;
//   localStorage.setItem("munc-inventory-products", JSON.stringify(products));
//   saveProductsToDB(products); // Save on update
// }, [products]);




//   useEffect(() => {
//     if (stocks.length > 0) {
//       localStorage.setItem("munc-inventory-stocks", JSON.stringify(stocks));
//     }
//   }, [stocks]);

//   useEffect(() => {
//     if (sales.length > 0) {
//       localStorage.setItem("munc-inventory-sales", JSON.stringify(sales));
//     }
//   }, [sales]);

//   useEffect(() => {
//     if (documents.length > 0) {
//       localStorage.setItem("munc-inventory-documents", JSON.stringify(documents));
//     }
//   }, [documents]);

//   useEffect(() => {
//     if (returns.length > 0) {
//       localStorage.setItem("munc-inventory-returns", JSON.stringify(returns));
//     }
//   }, [returns]);

//   const handleAddProduct = (product) => {
//     const newProduct = {
//       ...product,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//     };

//     setProducts((prev) => [...prev, newProduct]);

//     // Create stock entry for new product
//     if (newProduct.itemType === "goods") {
//       const newStock = {
//         id: `stock-${newProduct.id}`,
//         productId: newProduct.id,
//         productName: newProduct.name,
//         sku: newProduct.sku,
//         currentStock: newProduct.initialStock || 0,
//         minStock: newProduct.reorderLevel || 10,
//         maxStock: (newProduct.initialStock || 0) * 2,
//         location:
//           newProduct.warehouse === "warehouse-a"
//             ? "Main Warehouse - Delhi"
//             : newProduct.warehouse === "warehouse-b"
//             ? "Secondary Warehouse - Mumbai"
//             : "Regional Warehouse - Bangalore",
//         lastUpdated: new Date().toISOString(),
//         status: "in-stock",
//         unitCost: newProduct.purchasePrice || 0,
//         totalValue: (newProduct.purchasePrice || 0) * (newProduct.initialStock || 0),
//       };
//       setStocks((prev) => [...prev, newStock]);
//     }

//     setCurrentView("dashboard");

//     addNotification({
//       title: `${newProduct.itemType === "services" ? "Service" : "Product"} Added Successfully`,
//       message: `${newProduct.name} has been added to your inventory.`,
//       type: "success",
//       read: false,
//     });
//   };

//   const handleDeleteProduct = (productId) => {
//     const product = products.find((p) => p.id === productId);
//     setProducts((prev) => prev.filter((p) => p.id !== productId));
//     setStocks((prev) => prev.filter((s) => s.productId !== productId));

//     addNotification({
//       title: `${product?.itemType === "services" ? "Service" : "Product"} Deleted`,
//       message: `${product?.name || "Item"} has been removed from inventory.`,
//       type: "info",
//       read: false,
//     });
//   };

//   const handleUpdateProduct = (updatedProduct) => {
//     setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));

//     addNotification({
//       title: `${updatedProduct.itemType === "services" ? "Service" : "Product"} Updated`,
//       message: `${updatedProduct.name} has been updated successfully.`,
//       type: "success",
//       read: false,
//     });
//   };

//   const handleSale = (cartItems) => {
//     const timestamp = Date.now();
//     const newSales = cartItems.map((item, index) => {
//       const saleId = `sale-${timestamp}-${index}-${item.id}`;
//       return {
//         id: saleId,
//         invoiceNumber: `INV-${timestamp}-${index}`,
//         productId: item.id,
//         productName: item.name,
//         sku: item.sku,
//         quantity: item.quantity,
//         unitPrice: item.sellingPrice,
//         totalPrice: item.sellingPrice * item.quantity,
//         customerName: "Walk-in Customer",
//         customerEmail: "n/a",
//         customerPhone: "n/a",
//         saleDate: new Date().toISOString(),
//         status: "completed",
//         paymentMethod: "cash",
//         discount: 0,
//         tax: 18,
//         notes: `POS sale for ${item.name}`,
//       };
//     });

//     setSales((prev) => [...prev, ...newSales]);

//     // Update stock
//     const updatedStocks = stocks.map((stock) => {
//       const itemInCart = cartItems.find((item) => item.id === stock.productId);
//       if (itemInCart) {
//         return {
//           ...stock,
//           currentStock: stock.currentStock - itemInCart.quantity,
//           lastUpdated: new Date().toISOString(),
//         };
//       }
//       return stock;
//     });
//     setStocks(updatedStocks);

//     setCurrentView("sales");

//     addNotification({
//       title: "Sale Completed",
//       message: `Successfully processed a sale with ${cartItems.length} items.`,
//       type: "success",
//       read: false,
//     });
//   };

//   const handleViewProduct = (productId) => {
//     window.history.pushState({}, "", `?id=${productId}`);
//     setCurrentView("product-detail");
//   };

//   // Filter products based on search term
//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.category?.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
//         <div className="max-w-md w-full">
//           <div className="text-center mb-8">
//             <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
//               <Package className="w-10 h-10 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">MUN-C</h1>
//             <p className="text-gray-600 dark:text-gray-400 text-lg">Inventory Management System</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-8">
//               Sign in to access your inventory management dashboard and start managing your products efficiently.
//             </p>
//             <div className="space-y-4">
//               <button
//                 onClick={() => {
//                   setAuthMode("login");
//                   setShowAuthModal(true);
//                 }}
//                 className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-md"
//               >
//                 Sign In to Dashboard
//               </button>
//               <button
//                 onClick={() => {
//                   setAuthMode("signup");
//                   setShowAuthModal(true);
//                 }}
//                 className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
//               >
//                 Create New Account
//               </button>
//             </div>
//           </div>
//         </div>

//         <AuthModal
//           isOpen={showAuthModal}
//           onClose={() => setShowAuthModal(false)}
//           mode={authMode}
//           onModeChange={setAuthMode}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar
//         currentView={currentView}
//         setCurrentView={setCurrentView}
//         isOpen={sidebarOpen}
//         setIsOpen={setSidebarOpen}
//       />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header
//           onAddProduct={() => setCurrentView("add-product")}
//           onShowNotifications={() => setShowNotifications(true)}
//           onShowSettings={() => setShowSettings(true)}
//           onShowScanner={() => setCurrentView("scanner")}
//           searchTerm={searchTerm}
//           onSearchChange={setSearchTerm}
//           onMenuClick={() => setSidebarOpen(true)}
//         />

//         <main className="flex-1 overflow-x-hidden overflow-y-auto">
//           {currentView === "dashboard" && (
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
//                   <p className="text-gray-600 dark:text-gray-400 mt-1">
//                     Welcome back, {user?.name}! Here's your inventory overview.
//                   </p>
//                 </div>
//               </div>

//               <DashboardStats products={products} stocks={stocks} sales={sales} />

//               <Dashboard
//                 products={searchTerm ? filteredProducts : products}
//                 onAddProduct={() => setCurrentView("add-product")}
//                 onDeleteProduct={handleDeleteProduct}
//                 onUpdateProduct={handleUpdateProduct}
//                 onViewProduct={handleViewProduct}
//               />
//             </div>
//           )}

//           {currentView === "add-product" && (
//             <AddProduct onSave={handleAddProduct} onCancel={() => setCurrentView("dashboard")} />
//           )}

//           {currentView === "scanner" && (
//             <ProductScanner
//               products={products}
//               onClose={() => setCurrentView("dashboard")}
//               onMenuClick={() => setSidebarOpen(true)}
//             />
//           )}

//           {currentView === "stocks" && (
//             <StocksView
//               stocks={stocks}
//               products={products}
//               onUpdateStock={(updatedStock) => {
//                 setStocks((prev) => prev.map((s) => (s.id === updatedStock.id ? updatedStock : s)));
//               }}
//             />
//           )}

//           {currentView === "sales" && (
//             <SalesView
//               sales={sales}
//               products={products}
//               onAddSale={(newSale) => {
//                 setSales((prev) => [...prev, { ...newSale, id: Date.now().toString() }]);
//               }}
//               onUpdateSale={(updatedSale) => {
//                 setSales((prev) => prev.map((s) => (s.id === updatedSale.id ? updatedSale : s)));
//               }}
//             />
//           )}

//           {currentView === "documents" && (
//             <DocumentsView
//               documents={documents}
//               onAddDocument={(newDoc) => {
//                 setDocuments((prev) => [...prev, { ...newDoc, id: Date.now().toString() }]);
//               }}
//               onDeleteDocument={(docId) => {
//                 setDocuments((prev) => prev.filter((d) => d.id !== docId));
//               }}
//             />
//           )}

//           {currentView === "report" && (
//             <ReportsView products={products} stocks={stocks} sales={sales} returns={returns} />
//           )}

//           {currentView === "return-audit" && (
//             <ReturnAuditView
//               returns={returns}
//               sales={sales}
//               products={products}
//               onUpdateReturn={(updatedReturn) => {
//                 setReturns((prev) => prev.map((r) => (r.id === updatedReturn.id ? updatedReturn : r)));
//               }}
//               onAddReturn={(newReturn) => {
//                 setReturns((prev) => [...prev, { ...newReturn, id: Date.now().toString() }]);
//               }}
//             />
//           )}

//           {currentView === "pos" && <PosView products={products} onSale={handleSale} />}

//           {currentView === "product-detail" && (
//             <ProductDetail products={products} onBack={() => setCurrentView("dashboard")} />
//           )}
//         </main>
//       </div>

//       {/* Modals */}
//       <AuthModal
//         isOpen={showAuthModal}
//         onClose={() => setShowAuthModal(false)}
//         mode={authMode}
//         onModeChange={setAuthMode}
//       />

//       <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

//       <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
//     </div>
//   );
// };

// function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;

"use client";

import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import AuthModal from "./components/AuthModal";
import NotificationPanel from "./components/NotificationPanel";
import SettingsModal from "./components/SettingsModal";
import Header from "./components/Header";
import ProductScanner from "./components/ProductScanner";
import StocksView from "./components/StocksView";
import SalesView from "./components/SalesView";
import DocumentsView from "./components/DocumentsView";
import ReportsView from "./components/ReportsView";
import ReturnAuditView from "./components/ReturnAuditView";
import PosView from "./components/PosView";
import ProductDetail from "./components/ProductDetail";
import { Package, TrendingUp, DollarSign, Warehouse } from "lucide-react";
import axios from "axios";

// Sample data generators
const generateSampleProducts = () => [
  {
    id: "1",
    createdAt: new Date().toISOString(),
    itemType: "goods",
    name: "Premium Wireless Headphones",
    sku: "WH-001",
    barcode: "1234567890123",
    category: "electronics",
    subCategory: "accessories",
    brand: "apple",
    productType: "variant",
    supplier: "supplier1",
    supplierSku: "SUP-WH-001",
    warehouse: "warehouse-a",
    status: "returnable",
    purchasePrice: 8000,
    sellingPrice: 12000,
    initialStock: 50,
    reorderLevel: 10,
    description: "High-quality wireless headphones with noise cancellation",
    keywords: ["wireless", "headphones", "premium"],
    variants: [
      { id: "v1", color: "Black", size: "", material: "", weight: "", sku: "WH-001-BLK", price: 12000, stock: 20 },
      { id: "v2", color: "White", size: "", material: "", weight: "", sku: "WH-001-WHT", price: 12000, stock: 15 },
      { id: "v3", color: "Silver", size: "", material: "", weight: "", sku: "WH-001-SLV", price: 12500, stock: 15 },
    ],
  },
  {
    id: "2",
    createdAt: new Date().toISOString(),
    itemType: "services",
    name: "Technical Consultation",
    sku: "SRV-001",
    category: "consulting",
    subCategory: "technical",
    productType: "simple",
    serviceType: "one-time",
    duration: 2,
    durationUnit: "hours",
    status: "returnable",
    sellingPrice: 2500,
    description: "Expert technical consultation for IT infrastructure",
    keywords: ["consultation", "technical", "expert"],
  },
  {
    id: "3",
    createdAt: new Date().toISOString(),
    itemType: "goods",
    name: "Smartphone Case Premium",
    sku: "ACC-001",
    barcode: "9876543210987",
    category: "electronics",
    subCategory: "accessories",
    brand: "generic",
    productType: "variant",
    supplier: "supplier2",
    supplierSku: "SUP-ACC-001",
    warehouse: "warehouse-b",
    status: "returnable",
    purchasePrice: 200,
    sellingPrice: 500,
    initialStock: 100,
    reorderLevel: 20,
    description: "Protective smartphone case with premium materials",
    variants: [
      {
        id: "v4",
        color: "Red",
        size: "iPhone 14",
        material: "Silicone",
        weight: "50g",
        sku: "ACC-001-RED",
        price: 500,
        stock: 25,
      },
      {
        id: "v5",
        color: "Blue",
        size: "iPhone 14",
        material: "Leather",
        weight: "60g",
        sku: "ACC-001-BLU",
        price: 600,
        stock: 20,
      },
    ],
  },
];

const generateSampleStocks = (products) =>
  products.map((product, index) => ({
    id: `stock-${product.id}`,
    productId: product.id,
    productName: product.name,
    sku: product.sku,
    currentStock: product.initialStock || Math.floor(Math.random() * 100) + 10,
    minStock: product.reorderLevel || 10,
    maxStock: (product.initialStock || 50) * 2,
    location:
      product.warehouse === "warehouse-a"
        ? "Main Warehouse - Delhi"
        : product.warehouse === "warehouse-b"
        ? "Secondary Warehouse - Mumbai"
        : "Regional Warehouse - Bangalore",
    lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: Math.random() > 0.3 ? "in-stock" : "low-stock",
    unitCost: product.purchasePrice || Math.floor(Math.random() * 1000) + 100,
    totalValue:
      (product.purchasePrice || Math.floor(Math.random() * 1000) + 100) *
      (product.initialStock || Math.floor(Math.random() * 100) + 10),
  }));

const generateSampleSales = (products) => {
  const sales = [];
  for (let i = 0; i < 15; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;
    const unitPrice = product.sellingPrice || Math.floor(Math.random() * 1000) + 100;
    sales.push({
      id: `sale-${Date.now()}-${i}`,
      invoiceNumber: `INV-${String(i + 1).padStart(4, "0")}`,
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
      customerName: `Customer ${i + 1}`,
      customerEmail: `customer${i + 1}@example.com`,
      customerPhone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      saleDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: ["completed", "pending", "cancelled", "refunded"][Math.floor(Math.random() * 4)],
      paymentMethod: ["card", "cash", "upi", "bank-transfer"][Math.floor(Math.random() * 4)],
      discount: Math.floor(Math.random() * 10),
      tax: 18,
      notes: `Sale transaction for ${product.name}`,
    });
  }
  return sales;
};

const generateSampleDocuments = () => [
  {
    id: "doc-1",
    name: "Inventory Report Q4 2024",
    type: "report",
    category: "inventory",
    url: "/documents/inventory-q4.pdf",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    size: 2048576,
    description: "Quarterly inventory analysis and stock movement report",
    tags: ["inventory", "quarterly", "analysis"],
  },
  {
    id: "doc-2",
    name: "Sales Invoice #INV-0001",
    type: "invoice",
    category: "sales",
    url: "/documents/invoice-001.pdf",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    size: 1024000,
    description: "Sales invoice for Premium Wireless Headphones",
    tags: ["invoice", "sales", "customer"],
  },
  {
    id: "doc-3",
    name: "Purchase Order #PO-2024-001",
    type: "purchase-order",
    category: "procurement",
    url: "/documents/po-001.pdf",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    size: 856432,
    description: "Purchase order for electronics inventory restocking",
    tags: ["purchase", "procurement", "supplier"],
  },
  {
    id: "doc-4",
    name: "Tax Compliance Report 2024",
    type: "tax-report",
    category: "compliance",
    url: "/documents/tax-report-2024.pdf",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    size: 3145728,
    description: "Annual tax compliance and GST filing report",
    tags: ["tax", "compliance", "gst"],
  },
];

const generateSampleReturns = (products, sales) => {
  const returns = [];
  for (let i = 0; i < 8; i++) {
    const sale = sales[Math.floor(Math.random() * sales.length)];
    const product = products.find((p) => p.id === sale.productId);
    returns.push({
      id: `return-${Date.now()}-${i}`,
      returnNumber: `RET-${String(i + 1).padStart(4, "0")}`,
      saleId: sale.id,
      invoiceNumber: sale.invoiceNumber,
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      quantity: Math.floor(Math.random() * sale.quantity) + 1,
      unitPrice: sale.unitPrice,
      totalRefund: sale.unitPrice * (Math.floor(Math.random() * sale.quantity) + 1),
      customerName: sale.customerName,
      customerEmail: sale.customerEmail,
      returnDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
      reason: ["defective", "wrong-item", "customer-request", "damaged"][Math.floor(Math.random() * 4)],
      status: ["pending", "approved", "rejected", "completed"][Math.floor(Math.random() * 4)],
      condition: ["new", "used", "damaged"][Math.floor(Math.random() * 3)],
      refundMethod: sale.paymentMethod,
      notes: `Return request for ${product.name} - ${["Quality issue", "Size mismatch", "Changed mind", "Received damaged"][Math.floor(Math.random() * 4)]}`,
      processedBy: "Admin User",
      processedAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  return returns;
};

// Dashboard Stats Component
const DashboardStats = ({ products, stocks, sales }) => {
  const totalProducts = products.length;
  const lowStockItems = stocks.filter((s) => s.currentStock <= s.minStock).length;
  const totalSales = sales.reduce((sum, sale) => sum + (sale.status === "completed" ? sale.totalPrice : 0), 0);
  const completedSales = sales.filter((s) => s.status === "completed").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalProducts}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <Warehouse className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowStockItems}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalSales.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Orders</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedSales}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Content Component
const AppContent = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [sales, setSales] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [returns, setReturns] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scannedProducts, setScannedProducts] = useState([]);

  const { user, isAuthenticated, notifications, addNotification } = useAuth();

  // Load data from localStorage on component mount
  // useEffect(() => {
  //   const loadData = () => {
  //     try {
  //       // Load products
  //       const savedProducts = localStorage.getItem("munc-inventory-products");
  //       let loadedProducts = [];
  //       if (savedProducts) {
  //         loadedProducts = JSON.parse(savedProducts);
  //       } else {
  //         loadedProducts = generateSampleProducts();
  //         localStorage.setItem("munc-inventory-products", JSON.stringify(loadedProducts));
  //       }
  //       setProducts(loadedProducts);

  //       // Load stocks
  //       const savedStocks = localStorage.getItem("munc-inventory-stocks");
  //       let loadedStocks = [];
  //       if (savedStocks) {
  //         loadedStocks = JSON.parse(savedStocks);
  //       } else {
  //         loadedStocks = generateSampleStocks(loadedProducts);
  //         localStorage.setItem("munc-inventory-stocks", JSON.stringify(loadedStocks));
  //       }
  //       setStocks(loadedStocks);

  //       // Load sales
  //       const savedSales = localStorage.getItem("munc-inventory-sales");
  //       let loadedSales = [];
  //       if (savedSales) {
  //         loadedSales = JSON.parse(savedSales);
  //       } else {
  //         loadedSales = generateSampleSales(loadedProducts);
  //         localStorage.setItem("munc-inventory-sales", JSON.stringify(loadedSales));
  //       }
  //       setSales(loadedSales);

  //       // Load documents
  //       const savedDocuments = localStorage.getItem("munc-inventory-documents");
  //       let loadedDocuments = [];
  //       if (savedDocuments) {
  //         loadedDocuments = JSON.parse(savedDocuments);
  //       } else {
  //         loadedDocuments = generateSampleDocuments();
  //         localStorage.setItem("munc-inventory-documents", JSON.stringify(loadedDocuments));
  //       }
  //       setDocuments(loadedDocuments);

  //       // Load returns
  //       const savedReturns = localStorage.getItem("munc-inventory-returns");
  //       let loadedReturns = [];
  //       if (savedReturns) {
  //         loadedReturns = JSON.parse(savedReturns);
  //       } else {
  //         loadedReturns = generateSampleReturns(loadedProducts, loadedSales);
  //         localStorage.setItem("munc-inventory-returns", JSON.stringify(loadedReturns));
  //       }
  //       setReturns(loadedReturns);
  //     } catch (error) {
  //       console.error("Error loading data:", error);
  //       // Reset data if corrupted
  //       const freshProducts = generateSampleProducts();
  //       setProducts(freshProducts);
  //       setStocks(generateSampleStocks(freshProducts));
  //       setSales(generateSampleSales(freshProducts));
  //       setDocuments(generateSampleDocuments());
  //       setReturns(generateSampleReturns(freshProducts, generateSampleSales(freshProducts)));
  //     }
  //   };

  //   loadData();
  // }, []);
// useEffect(() => {
//   axios.get("http://localhost:5000/api/products") // ✅ sahi route
//     .then((res) => {
//       setProducts(res.data.products); // products update
//       console.log("✅ Products loaded");
//     })
//     .catch((err) => {
//       console.error("❌ Error loading products:", err.message);
//     });
// }, []);
 useEffect(() => {
    // Manual products
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data.products || []);
        console.log("✅ Products loaded");
      })
      .catch((err) => {
        console.error("❌ Error loading products:", err.message);
      });

    // ✅ Scanned products
    axios.get("http://localhost:5000/api/scanned-products")
      .then((res) => {
        console.log("Scanned response:", res.data); // Debug
        setScannedProducts(res.data || []);
        console.log("✅ Scanned products loaded");
      })
      .catch((err) => {
        console.error("❌ Error loading scanned products:", err.message);
      });
  }, []);

useEffect(() => {
  axios.get("http://localhost:5000/api/products/stock-info") // ✅ sahi route
    .then((res) => {
      setStocks(res.data.products); // stocks ke info milega (name, sku, status)
    })
    .catch((err) => {
      console.error("❌ Error loading stocks:", err.message);
    });
}, []);



  

  // Save data to localStorage whenever data changes
  // useEffect(() => {
  //   if (products.length > 0) {
  //     localStorage.setItem("munc-inventory-products", JSON.stringify(products));
  //   }
  // }, [products]);
  useEffect(() => {
  if (products.length > 0) {
    axios.post("http://localhost:5000/api/products/bulk", {
      products: products,
    })
    .then(() => console.log("✅ Products saved to database"))
    .catch((err) => console.error("❌ Error saving products:", err));
  }
}, [products]);


  // useEffect(() => {
  //   if (stocks.length > 0) {
  //     localStorage.setItem("munc-inventory-stocks", JSON.stringify(stocks));
  //   }
  // }, [stocks]);
useEffect(() => {
  if (stocks.length > 0) {
    axios.post("http://localhost:5000/api/stocks/bulk", {
      stocks: stocks,
    })
    .then(() => console.log("✅ Stocks saved to database"))
    .catch((err) => console.error("❌ Error saving stocks:", err));
  }
}, [stocks]);

 
  useEffect(() => {
    if (sales.length > 0) {
      localStorage.setItem("munc-inventory-sales", JSON.stringify(sales));
    }
  }, [sales]);

  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem("munc-inventory-documents", JSON.stringify(documents));
    }
  }, [documents]);

  useEffect(() => {
    if (returns.length > 0) {
      localStorage.setItem("munc-inventory-returns", JSON.stringify(returns));
    }
  }, [returns]);


  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) => [...prev, newProduct]);

    // Create stock entry for new product
    if (newProduct.itemType === "goods") {
      const newStock = {
        id: `stock-${newProduct.id}`,
        productId: newProduct.id,
        productName: newProduct.name,
        sku: newProduct.sku,
        currentStock: newProduct.initialStock || 0,
        minStock: newProduct.reorderLevel || 10,
        maxStock: (newProduct.initialStock || 0) * 2,
        location:
          newProduct.warehouse === "warehouse-a"
            ? "Main Warehouse - Delhi"
            : newProduct.warehouse === "warehouse-b"
            ? "Secondary Warehouse - Mumbai"
            : "Regional Warehouse - Bangalore",
        lastUpdated: new Date().toISOString(),
        status: "in-stock",
        unitCost: newProduct.purchasePrice || 0,
        totalValue: (newProduct.purchasePrice || 0) * (newProduct.initialStock || 0),
      };
      setStocks((prev) => [...prev, newStock]);
    }

    setCurrentView("dashboard");

    addNotification({
      title: `${newProduct.itemType === "services" ? "Service" : "Product"} Added Successfully`,
      message: `${newProduct.name} has been added to your inventory.`,
      type: "success",
      read: false,
    });
  };

  const handleDeleteProduct = (productId) => {
    const product = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setStocks((prev) => prev.filter((s) => s.productId !== productId));

    addNotification({
      title: `${product?.itemType === "services" ? "Service" : "Product"} Deleted`,
      message: `${product?.name || "Item"} has been removed from inventory.`,
      type: "info",
      read: false,
    });
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));

    addNotification({
      title: `${updatedProduct.itemType === "services" ? "Service" : "Product"} Updated`,
      message: `${updatedProduct.name} has been updated successfully.`,
      type: "success",
      read: false,
    });
  };

  const handleSale = (cartItems) => {
    const timestamp = Date.now();
    const newSales = cartItems.map((item, index) => {
      const saleId = `sale-${timestamp}-${index}-${item.id}`;
      return {
        id: saleId,
        invoiceNumber: `INV-${timestamp}-${index}`,
        productId: item.id,
        productName: item.name,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.sellingPrice,
        totalPrice: item.sellingPrice * item.quantity,
        customerName: "Walk-in Customer",
        customerEmail: "n/a",
        customerPhone: "n/a",
        saleDate: new Date().toISOString(),
        status: "completed",
        paymentMethod: "cash",
        discount: 0,
        tax: 18,
        notes: `POS sale for ${item.name}`,
      };
    });

    setSales((prev) => [...prev, ...newSales]);

    // Update stock
    const updatedStocks = stocks.map((stock) => {
      const itemInCart = cartItems.find((item) => item.id === stock.productId);
      if (itemInCart) {
        return {
          ...stock,
          currentStock: stock.currentStock - itemInCart.quantity,
          lastUpdated: new Date().toISOString(),
        };
      }
      return stock;
    });
    setStocks(updatedStocks);

    setCurrentView("sales");

    addNotification({
      title: "Sale Completed",
      message: `Successfully processed a sale with ${cartItems.length} items.`,
      type: "success",
      read: false,
    });
  };

  const handleViewProduct = (productId) => {
    window.history.pushState({}, "", `?id=${productId}`);
    setCurrentView("product-detail");
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">MUN-C</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Inventory Management System</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign in to access your inventory management dashboard and start managing your products efficiently.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-md"
              >
                Sign In to Dashboard
              </button>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuthModal(true);
                }}
                className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onAddProduct={() => setCurrentView("add-product")}
          onShowNotifications={() => setShowNotifications(true)}
          onShowSettings={() => setShowSettings(true)}
          onShowScanner={() => setCurrentView("scanner")}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {currentView === "dashboard" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Welcome back, {user?.name}! Here's your inventory overview.
                  </p>
                </div>
              </div>

              <DashboardStats products={products} stocks={stocks} sales={sales} />

              <Dashboard
                products={searchTerm ? filteredProducts : products}
                onAddProduct={() => setCurrentView("add-product")}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
                onViewProduct={handleViewProduct}
              />
            </div>
          )}

          {currentView === "add-product" && (
            <AddProduct onSave={handleAddProduct} onCancel={() => setCurrentView("dashboard")} />
          )}

          {currentView === "scanner" && (
            <ProductScanner
              products={products}
              onClose={() => setCurrentView("dashboard")}
              onMenuClick={() => setSidebarOpen(true)}
            />
          )}

          {currentView === "stocks" && (
            <StocksView
              stocks={stocks}
              products={products}
              onUpdateStock={(updatedStock) => {
                setStocks((prev) => prev.map((s) => (s.id === updatedStock.id ? updatedStock : s)));
              }}
            />
          )}

          {currentView === "sales" && (
            <SalesView
              sales={sales}
              products={products}
              onAddSale={(newSale) => {
                setSales((prev) => [...prev, { ...newSale, id: Date.now().toString() }]);
              }}
              onUpdateSale={(updatedSale) => {
                setSales((prev) => prev.map((s) => (s.id === updatedSale.id ? updatedSale : s)));
              }}
            />
          )}

          {currentView === "documents" && (
            <DocumentsView
              documents={documents}
              onAddDocument={(newDoc) => {
                setDocuments((prev) => [...prev, { ...newDoc, id: Date.now().toString() }]);
              }}
              onDeleteDocument={(docId) => {
                setDocuments((prev) => prev.filter((d) => d.id !== docId));
              }}
            />
          )}

          {currentView === "report" && (
            <ReportsView products={products} stocks={stocks} sales={sales} returns={returns} />
          )}

          {currentView === "return-audit" && (
            <ReturnAuditView
              returns={returns}
              sales={sales}
              products={products}
              onUpdateReturn={(updatedReturn) => {
                setReturns((prev) => prev.map((r) => (r.id === updatedReturn.id ? updatedReturn : r)));
              }}
              onAddReturn={(newReturn) => {
                setReturns((prev) => [...prev, { ...newReturn, id: Date.now().toString() }]);
              }}
            />
          )}

          {currentView === "pos" && <PosView products={products} onSale={handleSale} />}

          {currentView === "product-detail" && (
            <ProductDetail products={products} onBack={() => setCurrentView("dashboard")} />
          )}
        </main>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

