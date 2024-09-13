const { AuthneticationError } = require("./errors");

require("dotenv").config();
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  console.log("string");
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    const errorAuth = new AuthneticationError("Se requiere autorización");
    next(errorAuth)
  }

  const token = authorization.replace("Bearer", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const errorAuth = new AuthneticationError("Se requiere autorización");
    next(errorAuth)
  }

  req.user = payload;

  next();
};
