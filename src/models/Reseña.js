import mongoose from "mongoose";

const reseñaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, //ref al usuario
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true }, //ref al producto
  calificacion: { type: Number, required: true, min: 1, max: 5 },  //obligatorio min1 y max5
  comentario: { type: String, trim: true }  //opcional
}, { timestamps: true });

export default mongoose.model("Reseña", reseñaSchema);
