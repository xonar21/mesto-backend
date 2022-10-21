const Card = require('../models/card');

const ErrorBadRequest = require('../errors/errorBadRequest');

const ErrorNotFound = require('../errors/errorNotFound');

const Forbidden = require('../errors/Forbidden');

module.exports.deleteCard = (req, res, next) => {
  const { cardid } = req.params;
  const userId = req.user._id;

  Card.findById({ _id: cardid })
    .orFail(() => {
      throw new ErrorNotFound(`Карточка с id ${cardid} не найдена!`);
    })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new Forbidden('Отказано в удалении. Пользователь не является владельцом карточки');
      }
      return Card.findByIdAndRemove(card._id);
    })
    .then((card) => res.send({ message: 'Успешно удалена карточка:', data: card }))
    .catch(next);
};

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

module.exports.setCardLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardid,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new ErrorNotFound('Передан несуществующий _id карточки.'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные для постановки/снятии лайка.'));
      } else if (err.name === 'CastError') {
        next(new ErrorBadRequest('Передан несуществующий _id карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardid,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new ErrorNotFound('Передан несуществующий _id карточки.'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные для постановки/снятии лайка.'));
      } else if (err.name === 'CastError') {
        next(new ErrorBadRequest('Передан несуществующий _id карточки.'));
      } else {
        next(err);
      }
    });
};
