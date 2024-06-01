import { Schema } from "mongoose";

const product = new Schema({
    name: { type: String, index: true },
    category: { type: String, index: true },
    description: String,
    price: Number,
    stock: { type: Number, default: 1 },
    enable: { type: Boolean, default: true, index: true },
});

export default product;
