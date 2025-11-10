import express from "express";
import {
  listarCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/categoriaController.js";
import { verificarToken, verificarAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Listar todas las categorías (pública)
router.get("/", listarCategorias);

// Obtener una categoría por ID (pública)
router.get("/:id", obtenerCategoria);

// Crear categoría (solo admin)
router.post("/", verificarToken, verificarAdmin, crearCategoria);

// Actualizar categoría (solo admin)
router.put("/:id", verificarToken, verificarAdmin, actualizarCategoria);

// Eliminar categoría (solo admin)
router.delete("/:id", verificarToken, verificarAdmin, eliminarCategoria);

export default router;
