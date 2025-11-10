import express from "express";
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/productoController.js";
import { verificarToken, verificarAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Listar todos los productos (público)
router.get("/", listarProductos);

// Otener producto por ID (público)
router.get("/:id", obtenerProducto);

// Crear producto (solo admin)
router.post("/", verificarToken, verificarAdmin, crearProducto);

//  Actualizar producto (solo admin)
router.put("/:id", verificarToken, verificarAdmin, actualizarProducto);

// Eliminar producto (solo admin)
router.delete("/:id", verificarToken, verificarAdmin, eliminarProducto);

export default router;
