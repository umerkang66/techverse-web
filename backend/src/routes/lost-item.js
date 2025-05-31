const { Router } = require('express');

const lostItemController = require('../controllers/lost-item');
const authController = require('../controllers/auth');

const router = Router();

router.get('/', lostItemController.getLostItems);

router.post(
  '/',
  authController.currentUser,
  authController.restrictTo('user', 'admin'),
  lostItemController.createLostItem
);

router.delete(
  '/:id',
  authController.currentUser,
  authController.restrictTo('admin'),
  lostItemController.deleteLostItemAdmin
);

router.get('/admin', lostItemController.getLostItemsAdmin);

router.get(
  '/set-received/:id',
  authController.currentUser,
  authController.restrictTo('user'),
  lostItemController.setReceived
);

module.exports = router;
