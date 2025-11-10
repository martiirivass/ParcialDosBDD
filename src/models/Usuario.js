import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  correo: { type: String, required: true, unique: true, lowercase: true },
  contraseña: { type: String, required: true, minlength: 6 },
  direccion: {
    calle: String,
    ciudad: String,
    provincia: String,
    codigoPostal: String
  },
  telefono: String,
  rol: { type: String, enum: ["cliente", "administrador"], default: "cliente" }
}, { timestamps: true });

export default mongoose.model("Usuario", usuarioSchema);
