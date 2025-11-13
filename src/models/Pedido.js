import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true
  },
  cantidad: { type: Number, required: true },
  subtotal: { type: Number, required: true }
}, { _id: false });

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  items: [itemSchema],
  fecha: { type: Date, default: Date.now },
  estado: {
    type: String,
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
    default: "pendiente"
  },
  metodoPago: {
    type: String,
    enum: ["efectivo", "tarjeta", "transferencia"],
    required: true
  },
  total: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Pedido", pedidoSchema);
