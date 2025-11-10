import Categoria from "../models/Categoria.js";

// Listar todas las categorías
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json({ success: true, data: categorias });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener una categoría por ID
export const obtenerCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ success: false, error: "Categoría no encontrada" });
    }
    res.json({ success: true, data: categoria });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Crear nueva categoría
export const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const categoriaExistente = await Categoria.findOne({ nombre });
    if (categoriaExistente) {
      return res.status(400).json({ success: false, error: "Ya existe una categoría con ese nombre" });
    }

    const nuevaCategoria = new Categoria({ nombre, descripcion });
    await nuevaCategoria.save();

    res.status(201).json({ success: true, data: nuevaCategoria });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Actualizar categoría
export const actualizarCategoria = async (req, res) => {
  try {
    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ success: false, error: "Categoría no encontrada" });
    }

    res.json({ success: true, data: categoriaActualizada });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Eliminar categoría
export const eliminarCategoria = async (req, res) => {
  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoriaEliminada) {
      return res.status(404).json({ success: false, error: "Categoría no encontrada" });
    }
    res.json({ success: true, message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
