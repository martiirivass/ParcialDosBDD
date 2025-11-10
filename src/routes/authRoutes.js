import express from "express"; //cargamos modulo de express para cargar rutas
import { registrarUsuario, loginUsuario } from "../controllers/authController.js"; //import controladores

const router = express.Router();


router.post("/register", registrarUsuario);  //definimos Rutas


router.post("/login", loginUsuario);  //Definimos rutas

export default router;
