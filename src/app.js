import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch(err => console.error("Error al conectar a la base de datos:", err));

// Rutas principales
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ message: "API del Parcial de Bases de Datos II funcionando correctamente" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
