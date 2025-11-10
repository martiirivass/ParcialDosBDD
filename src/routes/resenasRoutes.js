import express from "express";
import {
  listarResenas,
  obtenerResena,
  crearResena,
  actualizarResena,
  eliminarResena
} from "../controllers/resenaController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Listar todas las reseñas (público)
router.get("/", listarResenas);

// Obtener reseña por ID
router.get("/:id", obtenerResena);

// Crear reseña (solo usuarios logueados)
router.post("/", verificarToken, crearResena);

// Actualizar reseña (solo autor o admin)
router.put("/:id", verificarToken, actualizarResena);

// Eliminar reseña (solo autor o admin)
router.delete("/:id", verificarToken, eliminarResena);

export default router;
