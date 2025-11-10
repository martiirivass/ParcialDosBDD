import express from "express";
import { listarUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario } from "../controllers/usuarioController.js";

const router = express.Router();

// Rutas de usuarios
router.get("/", listarUsuarios);
router.get("/:id", obtenerUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
