const LostItem = require('../models/lost-item');
const AppError = require('../utils/app-error');
const cloudinary = require('../utils/cloudinary');

exports.getLostItems = async (req, res, next) => {
  const lostItems = await LostItem.find({ received: false });

  res.send({ data: lostItems });
};

exports.createLostItem = async (req, res, next) => {
  const user = req.user;
  const { name, category, dateLost, image, description, location } = req.body;

  let imagedata = { public_id: '', url: '' };

  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'techverse/items',
    });
    imagedata.public_id = uploadResponse.public_id;
    imagedata.url = uploadResponse.url;
  }

  // date -> yy/mm/dd
  const lostItem = new LostItem({
    name,
    user: user.id,
    category,
    dateLost: new Date(dateLost),
    description,
    location,
    image: imagedata,
  });

  await lostItem.save();

  res.status(201).send({
    data: {
      message: 'Item created',
    },
  });
};

exports.setReceived = async (req, res, next) => {
  const user = req.user;
  const itemId = req.params.id;

  const item = await LostItem.findById(itemId);

  if (user._id.toString() !== item.user.toString() && user.role != 'admin') {
    return next(new AppError('You cannot set it Received', 400));
  }

  item.received = true;
  await item.save();

  res.status(201).send({
    data: {
      message: 'Item Set Received',
    },
  });
};
