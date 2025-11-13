import express from "express";
import {
  obtenerCarrito,
  agregarProducto,
  eliminarProducto,
  vaciarCarrito
} from "../controllers/carritoController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas requieren usuario logueado
router.get("/", verificarToken, obtenerCarrito);
router.post("/", verificarToken, agregarProducto);
router.delete("/:productoId", verificarToken, eliminarProducto);
router.delete("/", verificarToken, vaciarCarrito);

export default router;
