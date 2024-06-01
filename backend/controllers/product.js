import Product from "../database/models/product.js";

export const allProducts = async (req, res) => {
  try {
    const filters = {};

    if (req.query.name) {
      filters.name = { $regex: new RegExp(req.query.name, "i") };
    }

    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.minPrice) {
      filters.price = { $gte: parseInt(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      filters.price = { $lte: parseInt(req.query.maxPrice) };
    }

    if (req.query.enable !== undefined) {
      filters.enable = req.query.enable === "true";
    }

    const products = await Product.find(filters);
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

export const allCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const oneProduct = async (req, res) => {
  try {
    const select = await Product.findById(req.params.id);
    if (!select) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json(select);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    let newProduct = new Product(req.body);
    let savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(202).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
