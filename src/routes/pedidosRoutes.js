import express from "express";
import {
  listarPedidos,
  listarPedidosPorUsuario,
  crearPedido,
  actualizarEstado
} from "../controllers/pedidoController.js";
import { verificarToken, verificarAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Listar todos los pedidos (solo admin)
router.get("/", verificarToken, verificarAdmin, listarPedidos);

// Listar pedidos del usuario logueado o admin
router.get("/user/:userId", verificarToken, listarPedidosPorUsuario);

// Crear un pedido
router.post("/", verificarToken, crearPedido);

// Actualizar estado (solo admin)
router.patch("/:id/status", verificarToken, verificarAdmin, actualizarEstado);

export default router;
