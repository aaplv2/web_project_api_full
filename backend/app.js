const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users.js");
const cardsRoute = require("./routes/cards.js");
const { login, createUser } = require("./controllers/users.js");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb")

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };

  next();
});

app.post("/signin", login);
app.post("/signup", createUser);

app.use(express.json());
app.use("/users", usersRoute);
app.use("/cards", cardsRoute);
app.get("*", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App esta detectando el puerto ${PORT}`);
});
