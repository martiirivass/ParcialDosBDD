import express from "express";
import {
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuarioController.js";
import { verificarToken, verificarAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  listar todos los usuarios (solo admin)
router.get("/", verificarToken, verificarAdmin, listarUsuarios);

//  traer usuario por ID (usuario logueado o admin)
router.get("/:id", verificarToken, obtenerUsuario);

//  actualizar usuario (solo admin)
router.put("/:id", verificarToken, verificarAdmin, actualizarUsuario);

//  eliminar usuario (solo admin)
router.delete("/:id", verificarToken, verificarAdmin, eliminarUsuario);

export default router;
