const mongoose = require("mongoose");

const scannedProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  sku: String,
  barcode: String,
  category: String,
  brand: String,
  sellingPrice: Number,
  stock: Number,
  scannedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ScannedProduct", scannedProductSchema);
