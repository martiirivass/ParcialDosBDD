import jwt from "jsonwebtoken";


  //Middleware que verifica si el usuario envía un token válido.
  //para proteger rutas que solo pueden acceder usuarios logueados.
export const verificarToken = (req, res, next) => {
  // El token llega en el header "Authorization: Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Token no proporcionado. Debe iniciar sesión."
    });
  }

  try {
    // Decodifica el token usando la clave secreta de .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Guardamos la info del usuario (id, rol) en req.usuario
    req.usuario = decoded;
    next(); // pasa al siguiente middleware o controlador
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Token inválido o expirado."
    });
  }
};

  //Middleware que verifica si el usuario logueado es administrador.
  //Se usa en rutas exclusivas de admin (por ejemplo, crear o eliminar productos).

export const verificarAdmin = (req, res, next) => {
  if (req.usuario.rol !== "administrador") {
    return res.status(403).json({
      success: false,
      error: "Acceso denegado: se requiere rol de administrador."
    });
  }
  next();
};
