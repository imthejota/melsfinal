import Order from "../database/models/orders.js";
import Product from "../database/models/product.js";

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva orden
export const createOrder = async (req, res) => {
  try {
    const { customerName, products, totalAmount, paymentMethod } = req.body;

    if (!customerName || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    for (let item of products) {
      const { product, quantity, price } = item;
      if (!product || !quantity || !price || quantity <= 0 || price <= 0) {
        return res.status(400).json({ message: "Invalid product data" });
      }
      const productExists = await Product.findById(product);
      if (!productExists) {
        return res
          .status(404)
          .json({ message: `Product with id ${product} not found` });
      }
    }

    const newOrder = new Order({
      customerName,
      products,
      totalAmount,
      paymentMethod,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una orden existente
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, products } = req.body;

    if (!customerName && (!products || !Array.isArray(products))) {
      return res.status(400).json({ message: "Invalid update data" });
    }

    if (products) {
      for (let item of products) {
        const { product, quantity, price } = item;
        if (!product || !quantity || !price || quantity <= 0 || price <= 0) {
          return res.status(400).json({ message: "Invalid product data" });
        }
        const productExists = await Product.findById(product);
        if (!productExists) {
          return res.status(404).json({
            message: `Product with id ${product} not found`,
          });
        }
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una orden
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar un producto a una orden existente
export const addProductToOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity, price } = req.body;

    if (!productId || !quantity || !price || quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.products.push({ product: productId, quantity, price });
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto de una orden existente
export const removeProductFromOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const productIndex = order.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    order.products.splice(productIndex, 1);
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
