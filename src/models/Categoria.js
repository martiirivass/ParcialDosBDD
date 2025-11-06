import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true }, //obligatorio y unico
  descripcion: String  //opcional
}, { timestamps: true });  //agrega fecha de creación y actualización automática

export default mongoose.model("Categoria", categoriaSchema);
