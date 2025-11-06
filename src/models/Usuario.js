import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({   //Definimos estructura de cada documento con mongoose.schema
  //campos obligatorios (required:true)
    nombre: { type: String, required: true, trim: true },
  correo: { type: String, required: true, unique: true, lowercase: true },
  contraseña: { type: String, required: true, minlength: 6 },
  //dirección como embebido con sus propios datos adentro)
  direccion: {
    calle: String,
    ciudad: String,
    provincia: String,
    codigoPostal: String
  },
  telefono: String,
  rol: { type: String, enum: ["cliente", "administrador"], default: "cliente" } //cliente por defecto
}, { timestamps: true });

export default mongoose.model("Usuario", usuarioSchema);
