import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from '../config.js';

export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ msg: 'Token requerido' });

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ msg: 'Token inválido' });

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(401).json({ msg: 'No autorizado' });
      }

      req.user = decoded;
      next();
    });
  };
};
