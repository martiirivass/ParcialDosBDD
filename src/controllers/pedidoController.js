import Pedido from "../models/Pedido.js";
import Carrito from "../models/Carrito.js";
import Producto from "../models/Producto.js";

// Listar todos los pedidos (solo admin)
export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("usuario", "nombre correo")
      .populate("items.producto", "nombre precio");
    res.json({ success: true, data: pedidos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Listar pedidos de un usuario específico (logueado o admin)
export const listarPedidosPorUsuario = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.params.userId })
      .populate("items.producto", "nombre precio");

    if (!pedidos.length) {
      return res.status(404).json({ success: false, message: "No hay pedidos para este usuario" });
    }

    res.json({ success: true, data: pedidos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Crear un pedido basado SIEMPRE en el carrito
export const crearPedido = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    // Buscar carrito con productos
    const carrito = await Carrito.findOne({ usuario: usuarioId })
      .populate("items.producto");

    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No hay productos en el carrito para generar el pedido"
      });
    }

    // Armar los productos del pedido desde el carrito
    const productosPedido = carrito.items.map((item) => ({
      producto: item.producto._id,
      cantidad: item.cantidad,
      subtotal: item.producto.precio * item.cantidad
    }));

    const total = productosPedido.reduce((acc, item) => acc + item.subtotal, 0);

    const metodoPago = req.body?.metodoPago ?? "efectivo";

    // Crear pedido
    const nuevoPedido = new Pedido({
      usuario: usuarioId,
      items: productosPedido,
      metodoPago,
      total
    });

    await nuevoPedido.save();

    // Vaciar carrito
    carrito.items = [];
    await carrito.save();

    res.status(201).json({
      success: true,
      message: "Pedido creado exitosamente desde el carrito",
      data: nuevoPedido
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Actualizar estado (solo admin)
export const actualizarEstado = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ success: false, message: "Pedido no encontrado" });

    pedido.estado = req.body.estado;
    await pedido.save();

    res.json({ success: true, message: "Estado del pedido actualizado", data: pedido });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
