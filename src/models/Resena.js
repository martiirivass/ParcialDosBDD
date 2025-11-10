import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  puntuacion: { type: Number, required: true, min: 1, max: 5 },
  comentario: { type: String, trim: true }
}, { timestamps: true });

export default mongoose.model("Resena", resenaSchema);
