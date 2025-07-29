// // controllers/productController.js
// const Product = require("../model/Addproduct");

// exports.createProduct = async (req, res) => {
//   try {
//     const newProduct = await Product.create(req.body);
//     res.status(201).json({ success: true, product: newProduct });
//   } catch (error) {
//     console.error("Error saving product:", error);
//     res.status(500).json({ success: false, message: "Failed to save product." });
//   }
// };



// // controllers/AddProduct.js
// const Product = require("../model/Addproduct");

// // Existing single product save
// exports.createProduct = async (req, res) => {
//   try {
//     const newProduct = await Product.create(req.body);
//     res.status(201).json({ success: true, product: newProduct });
//   } catch (error) {
//     console.error("Error saving product:", error);
//     res.status(500).json({ success: false, message: "Failed to save product." });
//   }
// };

// // ✅ NEW: Bulk product save
// exports.createProductsBulk = async (req, res) => {
//   try {
//     const { products } = req.body;

//     if (!Array.isArray(products)) {
//       return res.status(400).json({ success: false, message: "Products must be an array" });
//     }

//     const operations = products.map((product) => ({
//       updateOne: {
//         filter: { id: product.id },
//         update: { $set: product },
//         upsert: true, // Create if doesn't exist
//       },
//     }));

//     const result = await Product.bulkWrite(operations);

//     res.status(200).json({
//       success: true,
//       message: "Products processed successfully",
//       added: result.upsertedCount,
//       updated: result.modifiedCount,
//     });
//   } catch (error) {
//     console.error("Bulk product save error:", error);
//     res.status(500).json({ success: false, message: "Bulk product save failed." });
//   }
// };


// controllers/AddProduct.js
const Product = require("../model/Addproduct");

// Existing single product save
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "Failed to save product." });
  }
};

// Existing bulk product save
exports.createProductsBulk = async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ success: false, message: "Products must be an array" });
    }

    const operations = products.map((product) => ({
      updateOne: {
        filter: { id: product.id },
        update: { $set: product },
        upsert: true,
      },
    }));

    const result = await Product.bulkWrite(operations);

    res.status(200).json({
      success: true,
      message: "Products processed successfully",
      added: result.upsertedCount,
      updated: result.modifiedCount,
    });
  } catch (error) {
    console.error("Bulk product save error:", error);
    res.status(500).json({ success: false, message: "Bulk product save failed." });
  }
};

// ✅ NEW: Get all products from DB
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products." });
  }
};

// Fetch only name, sku, status
exports.getProductStockInfo = async (req, res) => {
  try {
    const products = await Product.find({}, 'name sku status');
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching product stock info:", error);
    res.status(500).json({ success: false, message: "Failed to fetch product stock info." });
  }
};
