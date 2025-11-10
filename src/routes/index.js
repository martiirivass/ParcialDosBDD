import express from "express";

import usuariosRoutes from "./usuariosRoutes.js";
import productosRoutes from "./productosRoutes.js";
import categoriasRoutes from "./categoriasRoutes.js";
import carritosRoutes from "./carritosRoutes.js";
import pedidosRoutes from "./pedidosRoutes.js";
import resenasRoutes from "./resenasRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/usuarios", usuariosRoutes);
router.use("/productos", productosRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/carritos", carritosRoutes);
router.use("/pedidos", pedidosRoutes);
router.use("/resenas", resenasRoutes);
router.use("/auth", authRoutes);

export default router;
