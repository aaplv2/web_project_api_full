const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { NotFoundError, BadRequestError } = require("../middlewares/errors");

const ERROR_CODE = 400;
const AUTHENTICATION_ERROR_CODE = 401;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users) {
        res.send({ data: users });
      } else {
        throw new NotFoundError("No se encontró ningún usuario con ese ID");
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return new BadRequestError("Id de usuario no válida");
      }
    })
    .catch(next());
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError("No se encontró ningún usuario con ese ID");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return new BadRequestError("Id de usuario no válida");
      }
    })
    .catch(next());
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((users) => {
      if (users) {
        res.send({ data: users });
      } else {
        throw new NotFoundError("No se encontró ningún usuario con ese ID");
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return new BadRequestError("Id de usuario no válida");
      }
    })
    .catch(next());
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, about, avatar, email: email, password: hash })
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      return new BadRequestError(
        "Se pasaron datos inválidos a los métodos para crear un usuario."
      );
    })
    .catch(next());
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => {
      throw new NotFoundError("No se encontró ningún usuario con ese ID");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return new BadRequestError("Id de usuario no válida");
      }
    })
    .catch(next());
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => {
      throw new NotFoundError("No se encontró ningún usuario con ese ID");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return new BadRequestError("Id de usuario no válida");
      }
    })
    .catch(next());
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Email o contraseña incorrecta"));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Email o contraseña incorrecta"));
      }
      const token = jwt.sign({ _id: user._id }, "Clave-secreta", {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(AUTHENTICATION_ERROR_CODE).send({ message: err.message });
    });
};
