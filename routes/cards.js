const router = require('express').Router();

const {
  createCardValid,
  parameterIdValid,
} = require('../middlewares/validation');

const
  {
    createCard,
    getCard,
    deleteCard,
    setCardLikes,
    deleteCardLikes,
  } = require('../controllers/cards');

router.post('/', createCardValid, createCard);
router.get('/', getCard);
router.delete('/:cardid', parameterIdValid('cardid'), deleteCard);
router.put('/:cardid/likes', parameterIdValid('cardid'), setCardLikes);
router.delete('/:cardid/likes', parameterIdValid('cardid'), deleteCardLikes);

module.exports = router;
