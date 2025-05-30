const { Router } = require('express');

const authController = require('../controllers/auth');

const router = Router();

router.get(
  '/logout',
  authController.currentUser,
  authController.restrictTo('user'),
  authController.logout
);

module.exports = router;
