const { Joi } = require('celebrate')

const validator = require('validator')

const urlValidator = (value, helpers) => {
  if (validator.isURL(value)) {
    return value
  }

  return helpers.error('string.uri');

}

const loginValidator = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
})
const signUpValidator = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
});

const profileUpdateValidator = {
  name: Joi.string().required(),
  about: Joi.string().required()
}

const cardCreateValidator = {
  name: Joi.string().required(),
  link: Joi.string().required().custom(urlValidator),
};

const avatarUpdateValidator = {
  avatar: Joi.string().required().custom(urlValidator)
}

module.exports = {
  loginValidator,
  signUpValidator,
  profileUpdateValidator,
  cardCreateValidator,
  avatarUpdateValidator
}