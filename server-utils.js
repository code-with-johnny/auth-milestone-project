export function withAuthenticationRequired(req, res, next) {
  if (!req.session.userId) return res.sendStatus(401);
  next();
}

export function withAdminRoleRequired(req, res, next) {
  const user = userData.find((user) => user.id === req.session.userId);
  if (!user) return res.sendStatus(401);
  if (user.role !== "admin") return res.sendStatus(403);
  next();
}
