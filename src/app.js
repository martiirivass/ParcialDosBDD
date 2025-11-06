import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares (funciones que se ejecutan antes de llegar a una ruta específica o entre rutas.)
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Conectado a MongoDB"))
  .catch(err => console.error(" Error al conectar MongoDB:", err));

// Rutas base
app.get("/", (req, res) => {
  res.json({ message: "API REST Parcial BD2 funcionando " });
});

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
