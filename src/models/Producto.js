import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true, min: 0 },   //obligatorio, mayor a 0
  stock: { type: Number, default: 0 },  //por defecto empieza en 0
  marca: String,
  categoria: {
    type: mongoose.Schema.Types.ObjectId,   //guarda una referencia al modelo de categoría
    ref: "Categoria",
    required: true
  },
  reseñas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reseña" }]  //guarda una referencia al modelo de reseñas
}, { timestamps: true });

export default mongoose.model("Producto", productoSchema);
