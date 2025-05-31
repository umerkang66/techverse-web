const { Router } = require('express');

const foundItemController = require('../controllers/found-item');
const authController = require('../controllers/auth');

const router = Router();

router.get('/', foundItemController.getFoundItems);

router.post(
  '/',
  authController.currentUser,
  authController.restrictTo('user'),
  foundItemController.createFoundItem
);

router.get(
  '/set-returned/:id',
  authController.currentUser,
  foundItemController.setReturned
);

module.exports = router;
