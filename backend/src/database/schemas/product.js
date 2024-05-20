import { Schema } from "mongoose";

const product = new Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  enable: { type: Boolean, default: true },
});

export default product;
