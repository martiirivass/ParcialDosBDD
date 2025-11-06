import Pedido from "../models/Pedido.js";
import Carrito from "../models/Carrito.js";
import Producto from "../models/Producto.js";

// listar todos los pedidos (solo admin)
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

// listar pedidos del usuario logueado
export const listarPedidosUsuario = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id })
      .populate("items.producto", "nombre precio");
    res.json({ success: true, data: pedidos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// crear pedido (a partir del carrito del usuario)
export const crearPedido = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuario: req.usuario.id }).populate(
      "productos.producto"
    );

    if (!carrito || carrito.productos.length === 0) {
      return res.status(400).json({ success: false, error: "El carrito está vacío" });
    }

    const items = carrito.productos.map((item) => ({
      producto: item.producto._id,
      cantidad: item.cantidad,
      subtotal: item.producto.precio * item.cantidad
    }));

    const total = items.reduce((acc, i) => acc + i.subtotal, 0);

    const nuevoPedido = new Pedido({
      usuario: req.usuario.id,
      items,
      total,
      metodoPago: req.body.metodoPago || "efectivo",
      estado: "pendiente"
    });

    await nuevoPedido.save();

    // vaciar el carrito después de crear el pedido
    carrito.productos = [];
    await carrito.save();

    res.status(201).json({ success: true, data: nuevoPedido });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// actualizar el estado de un pedido (solo admin)
export const actualizarEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    ).populate("usuario", "nombre");

    if (!pedido) {
      return res.status(404).json({ success: false, error: "Pedido no encontrado" });
    }

    res.json({ success: true, data: pedido });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
