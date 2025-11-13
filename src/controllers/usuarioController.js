import Usuario from "../models/Usuario.js";

// Listar usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-contraseña");
    res.json({ success: true, data: usuarios });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//Obtener usuario
export const obtenerUsuario = async (req, res) => {
  try {
    // Validar que el usuario esté autenticado
    if (!req.usuario) {
      return res.status(401).json({
        success: false,
        message: "No autorizado: token inválido o no proporcionado"
      });
    }

    const usuario = await Usuario.findById(req.params.id).select("-contraseña");

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    // Verificar si es su propio perfil o admin
    const esAdmin = req.usuario.rol === "administrador";
    const esPropietario = req.usuario._id?.toString() === usuario._id.toString();

    if (!esAdmin && !esPropietario) {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado: no puedes ver el perfil de otro usuario"
      });
    }

    // Si pasa las validaciones, devolver los datos
    res.json({ success: true, data: usuario });

  } catch (error) {
    console.error("Error en obtenerUsuario:", error.message);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener el usuario",
      error: error.message
    });
  }
};

// Actualizar usuario (solo admin o dueño)
export const actualizarUsuario = async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ success: false, message: "Token inválido o no proporcionado" });
    }

    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    const esAdmin = req.usuario.rol === "administrador";
    const esPropietario = req.usuario._id.toString() === usuario._id.toString();

    if (!esAdmin && !esPropietario) {
      return res.status(403).json({ success: false, message: "Acceso denegado: no puedes modificar otro usuario" });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-contraseña");
    res.json({ success: true, data: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Eliminar usuario (solo admin)
export const eliminarUsuario = async (req, res) => {
  try {
    if (req.usuario.rol !== "administrador") {
      return res.status(403).json({ success: false, message: "Solo los administradores pueden eliminar usuarios" });
    }

    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    res.json({ success: true, message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};