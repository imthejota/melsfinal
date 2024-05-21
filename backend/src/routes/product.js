import { Router } from "express";
import {
    allProducts,
    createProduct,
    oneProduct,
    updateProduct,
} from "../controllers/product.js";
const routerProduct = Router();

routerProduct.get("/", allProducts);
routerProduct.get("/:id", oneProduct);
routerProduct.post("/", createProduct);
routerProduct.put("/:id", updateProduct);
export default routerProduct;
