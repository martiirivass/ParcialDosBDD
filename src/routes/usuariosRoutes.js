import express from "express";
import {
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuarioController.js";

import { verificarToken, verificarAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// SOLO ADMIN
router.get("/", verificarToken, verificarAdmin, listarUsuarios);

// ADMIN o LOGUEADO
router.get("/:id", verificarToken, obtenerUsuario);

// ADMIN o LOGUEADO
router.put("/:id", verificarToken, actualizarUsuario);

// SOLO ADMIN
router.delete("/:id", verificarToken, verificarAdmin, eliminarUsuario);

export default router;
