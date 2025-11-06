import express from "express"; //cargamos modulo de express para cargar rutas
import { registrarUsuario, loginUsuario } from "../controllers/authController.js"; //import controladores

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Registrar un nuevo usuario
 */
router.post("/register", registrarUsuario);  //definimos Rutas

/**
 * @route POST /api/auth/login
 * @desc Iniciar sesión y obtener un token JWT
 */
router.post("/login", loginUsuario);  //Definimos rutas

export default router;
