async function RoleMiddleware(req, res, next) {
  const role = req.userRole;

  if (role !== "admin") {
    return res.status(403).json({ error: "Não autorizado!" });
  } else {
    next();
  }
}

export default RoleMiddleware;
