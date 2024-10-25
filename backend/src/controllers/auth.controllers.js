import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { pool } from '../db.js';

export const register = async (req, res) => {
  const { nombre, email, pass, fk_tipo_usuario } = req.body;
  const llega  = req.body;
  console.log("Llegando: ", llega);
  try {
    const userFound = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
    if (userFound.rows.length > 0) return res.status(400).json(["El email ya está en uso"]);
    const passwordHash = await bcrypt.hash(pass, 10);
    const newUser = await pool.query(
      'INSERT INTO usuario (nombre, email, pass, fk_tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, passwordHash, fk_tipo_usuario]
    );
    const token = await createAccessToken({ id: newUser.rows[0].id_usuario });
    res.cookie('token', token);
    res.json({
      id: newUser.rows[0].id_usuario,
      username: newUser.rows[0].nombre,
      email: newUser.rows[0].email,
      fk_tipo_usuario: newUser.rows[0].fk_tipo_usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
    if (userFound.rows.length === 0) return res.status(400).json({ message: "Usuario no encontrado." });
    const isMatch = await bcrypt.compare(password, userFound.rows[0].pass);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta." });
    const token = await createAccessToken({ id: userFound.rows[0].id_usuario });
    res.cookie('token', token);

    res.json({
      id: userFound.rows[0].id_usuario,
      username: userFound.rows[0].nombre,
      email: userFound.rows[0].email,
      fk_tipo_usuario: userFound.rows[0].fk_tipo_usuario,
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout de usuario
export const logout = (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// Perfil de usuario autenticado
export const profile = async (req, res) => {
  try {
    const userFound = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [req.user.payload.id]);

    if (userFound.rows.length === 0) return res.status(400).json({ message: "Usuario no encontrado" });

    return res.json({
      id: userFound.rows[0].id_usuario,
      username: userFound.rows[0].nombre,
      email: userFound.rows[0].email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verificación de token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    try {
      const userFound = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [user.id]);

      if (userFound.rows.length === 0) return res.status(401).json({ message: "Unauthorized" });

      return res.json({
        id: userFound.rows[0].id_usuario,
        username: userFound.rows[0].nombre,
        email: userFound.rows[0].email,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};