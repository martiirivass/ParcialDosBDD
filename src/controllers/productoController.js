import Producto from "../models/Producto.js";

// Listar todos los productos
export const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.find().populate("categoria", "nombre");
    res.json({ success: true, data: productos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener producto por ID
export const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate("categoria", "nombre");
    if (!producto) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }
    res.json({ success: true, data: producto });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Crear nuevo producto
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json({ success: true, data: nuevoProducto });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Actualizar producto 
export const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("categoria", "nombre");

    if (!productoActualizado) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    res.json({ success: true, data: productoActualizado });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Eliminar o reducir cantidad de un producto del carrito
export const eliminarProducto = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { productoId } = req.params;
    const { cantidad } = req.body; // cantidad opcional que se desea eliminar

    // Buscar el carrito del usuario
    const carrito = await Carrito.findOne({ usuario: usuarioId });
    if (!carrito) {
      return res.status(404).json({ success: false, message: "Carrito no encontrado" });
    }

    // Buscar el producto dentro del carrito
    const itemIndex = carrito.items.findIndex(
      (item) => item.producto.toString() === productoId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Producto no encontrado en el carrito" });
    }

    // Recuperamos el producto real de la colección de productos
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ success: false, message: "Producto inexistente" });
    }

    const item = carrito.items[itemIndex];
    const cantidadEliminar = cantidad || item.cantidad; // si no se especifica, elimina todo

    if (cantidadEliminar >= item.cantidad) {
      // Eliminar el producto completamente del carrito
      carrito.items.splice(itemIndex, 1);
      producto.stock += item.cantidad; // devolver todo al stock
    } else {
      // Restar solo la cantidad deseada
      item.cantidad -= cantidadEliminar;
      producto.stock += cantidadEliminar; // reintegrar esa cantidad al stock
    }

    // Guardar cambios
    await producto.save();
    await carrito.save();

    res.json({
      success: true,
      message: `Se eliminaron ${cantidadEliminar} unidad(es) del producto del carrito`,
      carrito
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
