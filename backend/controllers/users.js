const bcrypt = require("bcrypt")
const User = require("../models/user");

const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res.status(SERVER_ERROR_CODE).send({ message: err.message })
    );
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name && err.name === "CastError") {
        return res
          .status(ERROR_CODE)
          .send({ message: "Id de usuario no válida" });
      }
      res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
  .then(hash =>
    User.create({ name, about, avatar, email: email, password: hash, })
  )
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(ERROR_CODE).send({
        message:
          "Se pasaron datos inválidos a los métodos para crear un usuario.",
      })
    );
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = NOT_FOUND_CODE;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name && err.name === "CastError") {
        return res
          .status(ERROR_CODE)
          .send({ message: "Id de usuario no válida" });
      }
      res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario con esa id");
      error.statusCode = NOT_FOUND_CODE;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name && err.name === "CastError") {
        return res
          .status(ERROR_CODE)
          .send({ message: "Id de usuario no válida" });
      }
      res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};
