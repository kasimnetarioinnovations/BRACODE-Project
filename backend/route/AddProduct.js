// // routes/productRoutes.js
// const express = require("express");
// const router = express.Router();
// const { createProduct } = require("../controller/AddProduct");

// router.post("/products", createProduct);

// module.exports = router;

// // routes/productRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   createProduct,
//   createProductsBulk,
// } = require("../controller/AddProduct");

// router.post("/products", createProduct);           // existing
// router.post("/products/bulk", createProductsBulk); // ✅ new bulk route

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  createProduct,
  createProductsBulk,
  getAllProducts, // 👈 add this
  getProductStockInfo
} = require("../controller/AddProduct");

router.post("/products", createProduct);
router.post("/products/bulk", createProductsBulk);
router.get("/products", getAllProducts); // 👈 GET method for fetching all products
router.get("/products/stock-info", getProductStockInfo); // ✅ new route

module.exports = router;

