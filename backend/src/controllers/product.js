import product from "../database/models/product";

export const allProducts = async (req, res) => {
  try {
    const filters = {};
    filters.enable = true;

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
      filters.enable = req.query.enable === "false";
    }

    const products = await productroduct.find(filters);
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

export const oneProduct = async (req, res) => {
  try {
    const select = await product.findById(req.params.id);
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
    let newProduct = new product(req.body);
    newProduct = await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(202).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
