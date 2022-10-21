const router = require('express').Router();

const {
  userAvatarValid,
  parameterIdValid,
  userValid,
} = require('../middlewares/validation');
const
  {
    getUser,
    getUserId,
    updateUser,
    updateUserAvatar,
    userInfo,
  } = require('../controllers/users');

router.get('/', getUser);
router.get('/me', userInfo);
router.get('/:id', parameterIdValid('id'), getUserId);
router.patch('/me', userValid, updateUser);
router.patch('/me/avatar', userAvatarValid, updateUserAvatar);

module.exports = router;
