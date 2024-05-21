import { Router } from "express";
import {
    allOrders,
    createOrder,
    updateOrder /* ,
    addProductToOrder,
    removeProductFromOrder, */,
} from "../controllers/orders.js";
const routerOrder = Router();

routerOrder.get("/", allOrders);
routerOrder.post("/", createOrder);
routerOrder.put("/:id", updateOrder);
/* routerOrder.put("/", createOrder); */

export default routerOrder;
