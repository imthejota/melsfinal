import product from "../database/models/product";

export const allProducts = async (req, res) => {
  try {
    const filters = {}; // Objeto para almacenar los filtros

    // Filtrar por nombre (si existe el parámetro `name` en la consulta)
    if (req.query.name) {
      filters.name = { $regex: new RegExp(req.query.name, "i") };
    }

    // Filtrar por categoría (si existe el parámetro `category` en la consulta)
    if (req.query.category) {
      filters.category = req.query.category;
    }

    // Filtrar por precio mínimo (si existe el parámetro `minPrice` en la consulta)
    if (req.query.minPrice) {
      filters.price = { $gte: parseInt(req.query.minPrice) };
    }

    // Filtrar por precio máximo (si existe el parámetro `maxPrice` en la consulta)
    if (req.query.maxPrice) {
      filters.price = { $lte: parseInt(req.query.maxPrice) };
    }

    // Filtrar por disponibilidad (si existe el parámetro `enable` en la consulta)
    if (req.query.enable !== undefined) {
      filters.enable = req.query.enable === "true"; // Convierte el string a boolean
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
