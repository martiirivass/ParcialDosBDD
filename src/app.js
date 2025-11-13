import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js";

import Usuario from "./models/Usuario.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(express.json());

// Crear admin automáticamente si no existe
const crearAdminDefault = async () => {
  try {
    const existe = await Usuario.findOne({ correo: "admin@mail.com" });
    if (existe) return;

    const contraseñaHash = await bcrypt.hash("admin123", 10);

    await Usuario.create({
      nombre: "Administrador",
      correo: "admin@mail.com",
      contraseña: contraseñaHash,
      rol: "administrador"
    });

    console.log("Admin creado automáticamente");
  } catch (err) {
    console.log("Error creando admin:", err.message);
  }
};

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Conectado a la base de datos");
    await crearAdminDefault(); // CREA EL ADMIN
  })
  .catch(err => console.error("Error al conectar a la base de datos:", err));

// Rutas principales
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ message: "API del Parcial de Bases de Datos II funcionando correctamente" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
