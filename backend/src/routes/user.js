const { Router } = require('express');

const authController = require('../controllers/auth');

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get(
  '/logout',
  authController.currentUser,
  authController.restrictTo('user'),
  authController.logout
);
router.get('/me', authController.me);

module.exports = router;
