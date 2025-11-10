import Carrito from "../models/Carrito.js";
import Producto from "../models/Producto.js";

//Obtener el carrito del usuario logueado
export const obtenerCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuario: req.usuario.id })
      .populate("productos.producto", "nombre precio");

    if (!carrito) {
      return res.status(404).json({ success: false, error: "El usuario no tiene un carrito creado" });
    }

    res.json({ success: true, data: carrito });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//Agregar producto al carrito
export const agregarProducto = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;

    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ success: false, error: "Producto no encontrado" });
    }

    let carrito = await Carrito.findOne({ usuario: req.usuario.id });

    // Si no tiene carrito, se crea
    if (!carrito) {
      carrito = new Carrito({
        usuario: req.usuario.id,
        productos: [{ producto: productoId, cantidad }]
      });
    } else {
      // Si ya existe el producto en el carrito, sumamos la cantidad
      const item = carrito.productos.find(p => p.producto.toString() === productoId);
      if (item) {
        item.cantidad += cantidad;
      } else {
        carrito.productos.push({ producto: productoId, cantidad });
      }
    }

    await carrito.save();
    res.json({ success: true, data: carrito });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//Eliminar un producto del carrito
export const eliminarProducto = async (req, res) => {
  try {
    const { productoId } = req.params;

    const carrito = await Carrito.findOne({ usuario: req.usuario.id });
    if (!carrito) {
      return res.status(404).json({ success: false, error: "Carrito no encontrado" });
    }

    carrito.productos = carrito.productos.filter(p => p.producto.toString() !== productoId);
    await carrito.save();

    res.json({ success: true, data: carrito });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//Vaciar el carrito completo
export const vaciarCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuario: req.usuario.id });
    if (!carrito) {
      return res.status(404).json({ success: false, error: "Carrito no encontrado" });
    }

    carrito.productos = [];
    await carrito.save();

    res.json({ success: true, message: "Carrito vaciado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
