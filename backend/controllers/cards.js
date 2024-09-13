const { NotFoundError, BadRequestError } = require("../middlewares/errors");
const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({}).then((cards) => res.send({ data: cards }));
};

module.exports.createCard = (req, res) => {
  const { title, link, owner } = req.body;
  Card.create({ title, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      return new BadRequestError(
        "Se pasaron datos inválidos a los métodos para crear una tarjeta."
      );
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con esa id");
    })
    .then((card) => res.send(card));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con esa id");
    })
    .then(() => res.send({ message: "Like existoso" }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con esa id");
    })
    .then(() => res.send({ message: "dislike existoso" }));
};
