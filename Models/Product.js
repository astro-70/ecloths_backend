const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, enum: ["men", "women", "kids", "baby"], required: true },
    images: [String],
    colors: [String],
    sizes: [String],
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
