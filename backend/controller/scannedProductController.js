const ScannedProduct = require("../model/ScannedProduct");

const saveScannedProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      sku,
      barcode,
      category,
      brand,
      sellingPrice,
      stock,
      scannedAt,
    } = req.body;

    const newProduct = new ScannedProduct({
      id,
      name,
      sku,
      barcode,
      category,
      brand,
      sellingPrice,
      stock,
      scannedAt,
    });

    await newProduct.save();
    res.status(201).json({ message: "Scanned product saved successfully" });
  } catch (error) {
    console.error("Save scan error:", error);
    res.status(500).json({ error: "Server error saving scanned product" });
  }
};

const getScannedProducts = async (req, res) => {
  try {
    const scannedProducts = await ScannedProduct.find().sort({ scannedAt: -1 }); // latest first
    res.json(scannedProducts);
  } catch (error) {
    console.error("Fetch scan error:", error);
    res.status(500).json({ error: "Server error fetching scanned products" });
  }
};



module.exports = { saveScannedProduct,getScannedProducts, };
