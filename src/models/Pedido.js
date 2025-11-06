import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, //referencia a usuario que hizo la compra
    //array con los productos comprados, cantidad y subtotal
  items: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
    cantidad: { type: Number, required: true },
    subtotal: { type: Number, required: true }
  }],
  fecha: { type: Date, default: Date.now },
    //permite controlar el flujo del pedido con el enum
  estado: {
    type: String,
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
    default: "pendiente"
  },
    //enum para restringir solo los medios de pago válidos
  metodoPago: {
    type: String,
    enum: ["efectivo", "tarjeta", "transferencia"]
  },
  //suma de los subtotales
  total: { type: Number, required: true }
}, { timestamps: true });   //guarda automaticamente la fecha de creación/modificacion.

export default mongoose.model("Pedido", pedidoSchema);
