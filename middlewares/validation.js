const { celebrate, Joi, Segments } = require('celebrate');

const validateUrl = (value, helpers) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

  if (!regex.test(value)) {
    return helpers.error('Ссылка не валидна');
  }
  return value;
};

const registerValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
  }),
});

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
});

const userValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const parameterIdValid = (nameId) => celebrate({
  params: Joi.object().keys({
    [nameId]: Joi.string().hex().length(24),
  }),
});

module.exports = {
  registerValid,
  loginValid,
  userAvatarValid,
  createCardValid,
  parameterIdValid,
  userValid,
};
