const Card = require("../models/card");

const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res.status(SERVER_ERROR_CODE).send({ message: err.message })
    );
};

module.exports.createCard = (req, res) => {
  const { title, link, owner } = req.body;
  Card.create({ title, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(ERROR_CODE).send({
        message:
          "Se pasaron datos inválidos a los métodos para crear una tarjeta.",
      })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      res
        .status(NOT_FOUND_CODE)
        .send({ message: "No se ha encontrado ninguna tarjeta con esa id" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.send({ message: "Like existoso" }))
    .catch((err) => {
      res
        .status(NOT_FOUND_CODE)
        .send({ message: "No se ha encontrado ninguna tarjeta con esa id" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.send({ message: "dislike existoso" }))
    .catch((err) => {
      res
        .status(NOT_FOUND_CODE)
        .send({ message: "No se ha encontrado ninguna tarjeta con esa id" });
    });
};
