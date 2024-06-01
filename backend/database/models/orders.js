import { model } from "mongoose";
import order from "../schemas/order.js";

const Order = model("Order", order);

export default Order;
