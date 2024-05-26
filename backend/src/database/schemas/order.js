import { Schema } from "mongoose";

const Order = new Schema({
  customerName: { type: String, required: true },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    },
  ],
  paymentMethod: { type: String },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // Ejemplo de campo adicional
  orderDate: { type: Date, default: Date.now },
});

export default Order;
