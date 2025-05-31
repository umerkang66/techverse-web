const { Router } = require('express');

const foundItemController = require('../controllers/found-item');
const authController = require('../controllers/auth');

const router = Router();

router.get('/', foundItemController.getFoundItems);

router.post(
  '/',
  authController.currentUser,
  authController.restrictTo('user', 'admin'),
  foundItemController.createFoundItem
);

router.delete(
  '/:id',
  authController.currentUser,
  authController.restrictTo('admin'),
  foundItemController.deleteFoundItemAdmin
);

router.get('/admin', foundItemController.getFoundItemsAdmin);

router.get(
  '/set-returned/:id',
  authController.currentUser,
  foundItemController.setReturned
);

module.exports = router;
