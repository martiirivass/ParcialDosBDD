import express from "express";
import {
  listarPedidos,
  listarPedidosUsuario,
  crearPedido,
  actualizarEstado
} from "../controllers/pedidoController.js";
import { verificarToken, verificarAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// listar todos los pedidos (solo admin)
router.get("/", verificarToken, verificarAdmin, listarPedidos);

// listar pedidos del usuario logueado
router.get("/mios", verificarToken, listarPedidosUsuario);

// crear un nuevo pedido (cliente logueado)
router.post("/", verificarToken, crearPedido);

// actualizar estado del pedido (solo admin)
router.put("/:id", verificarToken, verificarAdmin, actualizarEstado);

export default router;
