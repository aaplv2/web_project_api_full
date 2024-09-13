const { AuthneticationError } = require("./errors");

require("dotenv").config();
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return new AuthneticationError("Se requiere autorización");
  }

  const token = authorization.replace("Bearer", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return new AuthneticationError("Se requiere autorización");
  }

  req.user = payload;

  next();
};
