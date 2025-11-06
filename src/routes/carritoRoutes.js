import express from "express";
import {
  obtenerCarrito,
  agregarProducto,
  eliminarProducto,
  vaciarCarrito
} from "../controllers/carritoController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// obtener el carrito del usuario logueado
router.get("/", verificarToken, obtenerCarrito);

// agregar producto al carrito
router.post("/", verificarToken, agregarProducto);

// eliminar un producto específico del carrito
router.delete("/:productoId", verificarToken, eliminarProducto);

// vaciar el carrito completo
router.delete("/", verificarToken, vaciarCarrito);

export default router;
