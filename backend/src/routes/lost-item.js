const { Router } = require('express');

const lostItemController = require('../controllers/lost-item');
const authController = require('../controllers/auth');

const router = Router();

router.get('/', lostItemController.getLostItems);

router.post(
  '/',
  authController.currentUser,
  authController.restrictTo('user'),
  lostItemController.createLostItem
);

router.post(
  '/set-received/:id',
  authController.currentUser,
  authController.restrictTo('user'),
  lostItemController.setReceived
);

module.exports = router;
