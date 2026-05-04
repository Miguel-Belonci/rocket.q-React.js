import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import { JWT_SECRET } from "../config/auth.js";

async function AuthMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { id } = decoded;
    const user = await Users.findByPk(id, {
      attributes: ["id", "email", "role", "active"],
    });

    if (!user) {
      return res.status(401).json({ error: "Token invalid" });
    }

    if (!user.active) {
      return res.status(401).json({ error: "Conta inativa" });
    }

    req.userId = id;
    req.userRole = user.role;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
}

export default AuthMiddleware;
