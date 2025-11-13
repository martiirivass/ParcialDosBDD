import Carrito from "../models/Carrito.js";
import Producto from "../models/Producto.js";

// Obtener el carrito del usuario logueado
export const obtenerCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    let carrito = await Carrito.findOne({ usuario: usuarioId })
      .populate("items.producto", "nombre precio stock");

    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: "Carrito vacío o no encontrado"
      });
    }

    // Si por alguna razón items viene undefined, lo normalizamos
    if (!Array.isArray(carrito.items)) {
      carrito.items = [];
    }

    if (carrito.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Carrito vacío o no encontrado"
      });
    }

    res.json({ success: true, data: carrito });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Agregar producto al carrito
export const agregarProducto = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { productoId, cantidad } = req.body;

    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({ success: false, message: "Stock insuficiente" });
    }

    // Buscar o crear carrito del usuario
    let carrito = await Carrito.findOne({ usuario: usuarioId });

    if (!carrito) {
      carrito = new Carrito({ usuario: usuarioId, items: [] });
    }

    // Asegurarnos que items sea un array
    if (!Array.isArray(carrito.items)) {
      carrito.items = [];
    }

    // Buscar si el producto ya está en el carrito
    const itemExistente = carrito.items.find(
      (item) => item.producto.toString() === productoId
    );

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      carrito.items.push({ producto: productoId, cantidad });
    }

    // Descontar stock
    producto.stock -= cantidad;
    await producto.save();
    await carrito.save();

    res.status(200).json({
      success: true,
      message: "Producto agregado al carrito",
      carrito
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Eliminar producto (de a 1 o cantidad)
export const eliminarProducto = async (req, res) => {
  try {
    const { productoId } = req.params;
    const carrito = await Carrito.findOne({ usuario: req.usuario._id });

    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado"
      });
    }

    const item = carrito.items.find(i => i.producto.toString() === productoId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "El producto no está en el carrito"
      });
    }

    // Reintegrar stock
    const producto = await Producto.findById(productoId);
    if (producto) {
      producto.stock += item.cantidad;
      await producto.save();
    }

    // Eliminar el producto del carrito
    carrito.items = carrito.items.filter(i => i.producto.toString() !== productoId);
    await carrito.save();

    res.json({
      success: true,
      message: "Producto eliminado del carrito y stock actualizado"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Vaciar carrito completo
export const vaciarCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const carrito = await Carrito.findOne({ usuario: usuarioId }).populate("items.producto");

    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado"
      });
    }

    if (!Array.isArray(carrito.items) || carrito.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "El carrito ya está vacío o no existe"
      });
    }

    for (const item of carrito.items) {
      const producto = await Producto.findById(item.producto._id);
      if (producto) {
        producto.stock += item.cantidad;
        await producto.save();
      }
    }

    carrito.items = [];
    await carrito.save();

    res.json({
      success: true,
      message: "Carrito vaciado correctamente"
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
