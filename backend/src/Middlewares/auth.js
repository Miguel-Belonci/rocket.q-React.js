import jwt from "jsonwebtoken";

function AuthMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded;

    req.userId = id;
    req.userRole = role;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
}

export default AuthMiddleware;
