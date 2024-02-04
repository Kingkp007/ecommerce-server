const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter Photo"],
    },
    price: {
      type: Number,
      required: [true, "Please enter Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter Stock"],
    },
    category: {
      type: String,
      required: [true, "Please enter Category"], //use enum here instead this
      trim: true,
    },
    photo: {
      type: String,
      required: [true, "Please provide Image of product"],
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("products", productSchema);

module.exports = productModel ;
