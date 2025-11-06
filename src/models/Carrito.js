import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
    unique: true
  },
  productos: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
    cantidad: { type: Number, default: 1, min: 1 }
  }]
}, { timestamps: true });

export default mongoose.model("Carrito", carritoSchema);
