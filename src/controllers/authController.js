import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registrar usuario (solo cliente)
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, direccion, telefono } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    // Crear el usuario SIEMPRE como cliente
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: hash,
      direccion,
      telefono,
      rol: "cliente"
    });

    await nuevoUsuario.save();

    res.status(201).json({ success: true, message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordValida) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: "Login exitoso",
      token
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
