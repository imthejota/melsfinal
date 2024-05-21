import { model } from "mongoose";
import product from "../schemas/product.js";

const Product = model("Product", product);

export default Product;
