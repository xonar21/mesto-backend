const router = require('express').Router();

const users = require('./users');

const cards = require('./cards');

const ErrorNotFound = require('../errors/errorNotFound');

router.use('/users', users);
router.use('/cards', cards);

router.use((req, res, next) => {
  next(new ErrorNotFound('Данный путь не найден'));
});

module.exports = router;
