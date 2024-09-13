const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const { celebrate, errors } = require("celebrate");

const { loginValidator, signUpValidator } = require("./models/validation.js");

const usersRoute = require("./routes/users.js");
const cardsRoute = require("./routes/cards.js");

const { login, createUser } = require("./controllers/users.js");

const auth = require("./middlewares/auth.js");
const { NotFoundError } = require("./middlewares/errors.js");
const { requestLogger, errorLogger } = require("./middlewares/logger.js");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true,
    // [
    //   "https://api.aroundfull.chickenkiller.com",
    //   "https://aroundfull.chickenkiller.com",
    //   "https://www.aroundfull.chickenkiller.com",
    //   "api.aroundfull.chickenkiller.com",
    //   "aroundfull.chickenkiller.com",
    //   "www.aroundfull.chickenkiller.com",
    // ],
  })
);
app.options("*", cors({ origin: true }));

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signin", celebrate({ body: loginValidator }), login);
app.post("/signup", celebrate({ body: signUpValidator }), createUser);

app.use(auth);

app.use("/users", usersRoute);
app.use("/cards", cardsRoute);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
});

app.get("*", (req, res) => {
  const error = new NotFoundError("Recurso solicitado no encontrado");
  res.status(error.statusCode).send(error.message);
});

app.listen(PORT, () => {
  console.log(`App esta detectando el puerto ${PORT}`);
});
