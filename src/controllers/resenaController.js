import Resena from "../models/Resena.js";
import Producto from "../models/Producto.js";

// Listar reseñas
export const listarResenas = async (req, res) => {
  try {
    const resenas = await Resena.find()
      .populate("usuario", "nombre")
      .populate("producto", "nombre");
    res.json({ success: true, data: resenas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener reseña por ID
export const obtenerResena = async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id)
      .populate("usuario", "nombre")
      .populate("producto", "nombre");

    if (!resena) {
      return res.status(404).json({ success: false, error: "Reseña no encontrada" });
    }

    res.json({ success: true, data: resena });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Crear nueva reseña
export const crearResena = async (req, res) => {
  try {
    const { producto, comentario, puntuacion } = req.body;

    const productoExiste = await Producto.findById(producto);
    if (!productoExiste) {
      return res.status(404).json({ success: false, error: "Producto no encontrado" });
    }

    const nuevaResena = new Resena({
      usuario: req.usuario.id,
      producto,
      comentario,
      puntuacion
    });

    await nuevaResena.save();
    res.status(201).json({ success: true, data: nuevaResena });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Actualizar reseña
export const actualizarResena = async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("usuario", "nombre")
      .populate("producto", "nombre");

    if (!resenaActualizada) {
      return res.status(404).json({ success: false, error: "Reseña no encontrada" });
    }

    res.json({ success: true, data: resenaActualizada });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Eliminar reseña
export const eliminarResena = async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
    if (!resenaEliminada) {
      return res.status(404).json({ success: false, error: "Reseña no encontrada" });
    }
    res.json({ success: true, message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
