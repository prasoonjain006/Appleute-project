const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
