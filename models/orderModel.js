const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  productId : {
    type: String,
    required: [true, "Please enter productId"],
  },
  user : {
    type: String,
    required: [true, "Please enter userId"],
  },

  // products: [
    // {
      // productId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'products',
      //   required: true
      // },
       // Reference to the product document
    //   name: { type: String, required: true },
    //   price: { type: Number, required: true },
    //   image: { type: String },
    //   stock: { type: Number, required: true }
    // }
  // ],
   // Array of product details
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'users',
  //   required: true
  // },
},
  {
    timestamps: true,
  }
)


const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;



// shippingInfo: {
//     address: {
//       type: String,
//       required: true,
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     state: {
//       type: String,
//       required: true,
//     },
//     country: {
//       type: String,
//       required: true,
//     },
//     pinCode: {
//       type: Number,
//       required: true,
//     },
//   },

// subtotal: {
//   type: Number,
//   required: true,
// },
// shippingCharges: {
//   type: Number,
//   required: true,
// },
// total: {
//   type: Number,
//   required: true,
// },