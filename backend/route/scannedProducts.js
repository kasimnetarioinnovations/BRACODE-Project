const express = require("express");
const router = express.Router();
const { saveScannedProduct ,getScannedProducts } = require("../controller/scannedProductController");

router.post("/scanned-products", saveScannedProduct);
router.get('/scanned-products', getScannedProducts); // 👈 GET route

module.exports = router;
