import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

// Middleware que verifica si el usuario envía un token válido
export const verificarToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token no proporcionado. Debe iniciar sesión."
    });
  }

  try {
    // Decodifica el token usando la clave secreta de .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscamos el usuario en la base de datos
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o usuario no encontrado."
      });
    }

    // Guardamos el usuario completo en req.usuario
    req.usuario = usuario;
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token inválido o expirado."
    });
  }
};

// Middleware que verifica si el usuario logueado es administrador
export const verificarAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== "administrador") {
    return res.status(403).json({
      success: false,
      message: "Acceso denegado: se requiere rol de administrador."
    });
  }
  next();
};
