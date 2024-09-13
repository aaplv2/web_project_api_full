const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        return /https?:\/\/(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z]{2,})?([a-zA-Z0-9\-._~:\/?%#\[\]@!$&\'()*+,;=]*)?/gm.test(
          v
        );
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Formato de correo electrónico incorrecto",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
