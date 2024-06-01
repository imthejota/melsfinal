import { Router } from "express";
import {
  allCategories,
  allProducts,
  createProduct,
  oneProduct,
  updateProduct,
} from "../controllers/product.js";
const routerProduct = Router();

routerProduct.get("/", allProducts);
routerProduct.get("/categorias", allCategories);
routerProduct.get("/:id", oneProduct);
routerProduct.post("/", createProduct);
routerProduct.put("/:id", updateProduct);
export default routerProduct;
