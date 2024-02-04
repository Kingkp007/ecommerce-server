import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        pinCode: {
          type: Number,
          required: true,
        },
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },

      subtotal: {
        type: Number,
        required: true,
      },
      shippingCharges: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      orderItems: [
        {
          name: String,
          photo: String,
          price: Number,
          quantity: Number,
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
        },
      ],  
},
{
    timestamps: true,
  }
)


const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel ;