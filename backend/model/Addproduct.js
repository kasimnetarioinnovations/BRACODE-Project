const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: false
  },
  brand: {
    type: String,
    required: false
  },
  bundleItems: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: true
  },
  discountPeriodFrom: {
    type: Date
  },
  discountPeriodTo: {
    type: Date
  },
  discountPrice: {
    type: String
  },
  ean: {
    type: String
  },
  hasVariants: {
    type: Boolean,
    default: false
  },
  hsnSac: {
    type: String
  },
  id: {
    type: String,
    unique: true
  },
  itemType: {
    type: String,
    enum: ['goods', 'service'], // adjust if more types
    default: 'goods'
  },
  keywords: {
    type: [String],
    default: []
  },
  name: {
    type: String,
    required: true
  },
  priceIncludeGst: {
    type: Boolean,
    default: false
  },
  productType: {
    type: String,
    enum: ['variant', 'single'], // adjust as needed
    default: 'single'
  },
  purchasePrice: {
    type: Number
  },
  quantity: {
    type: Number
  },
  sellingPrice: {
    type: Number
  },
  seoDescription: {
    type: String
  },
  seoTitle: {
    type: String
  },
  sku: {
    type: String
  },
  status: {
    type: String,
    enum: ['returnable', 'non-returnable'], // update if needed
    default: 'returnable'
  },
  stock: {
    type: Number
  },
  stockEntries: {
    type: [mongoose.Schema.Types.Mixed], // adjust if structure known
    default: []
  },
  subCategory: {
    type: String
  },
  supplierSku: {
    type: String
  },
  taxRate: {
    type: String
  },
  track: {
    type: String,
    enum: ['serial', 'lot', 'none'], // update as needed
    default: 'none'
  },
  unit: {
    type: String
  },
  variants: {
    type: [mongoose.Schema.Types.Mixed], // adjust if structure known
    default: []
  },
  warehouse: {
    type: String
  },
  wholesalePrice: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
