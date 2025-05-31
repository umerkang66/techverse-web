const FoundItem = require('../models/found-item');
const AppError = require('../utils/app-error');
const cloudinary = require('../utils/cloudinary');

exports.getFoundItems = async (req, res, next) => {
  const foundItems = await FoundItem.find();

  res.send({ data: foundItems });
};

exports.createFoundItem = async (req, res, next) => {
  const user = req.user;
  const { name, category, image, description, location } = req.body;

  const { public_id, url } = await cloudinary.uploader.upload(image, {
    folder: 'techverse/items',
  });

  // date -> dd/mm/yyyy
  const foundItem = new FoundItem({
    name,
    user: user.id,
    category,
    description,
    location,
    image: { public_id, url },
  });

  await foundItem.save();

  res.status(201).send({
    data: {
      message: 'Item created',
    },
  });
};

exports.setReturned = async (req, res, next) => {
  const user = req.user;
  const itemId = req.params.id;

  const item = await FoundItem.findById(itemId);

  if (user.id !== item.user)
    return next(
      AppError('Only who have created the Found Item can set Returned')
    );

  item.returned = true;
  await item.save();

  res.status(201).send({
    data: {
      message: 'Item Set Returned',
    },
  });
};
