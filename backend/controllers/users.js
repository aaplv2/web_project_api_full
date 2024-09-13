const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const {
  NotFoundError,
  BadRequestError,
  AuthneticationError,
} = require("../middlewares/errors");

require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;

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
    });
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
    });
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
    });
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
    });
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
    });
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
    });
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
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch((err) => {
      return new AuthneticationError("Error de autenticación");
    });
};
