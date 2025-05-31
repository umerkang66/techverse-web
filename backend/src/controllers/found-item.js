const FoundItem = require('../models/found-item');
const AppError = require('../utils/app-error');
const cloudinary = require('../utils/cloudinary');

exports.getFoundItems = async (req, res, next) => {
  const foundItems = await FoundItem.find({ returned: false });
  res.send({ data: foundItems });
};

exports.createFoundItem = async (req, res, next) => {
  const user = req.user;
  const { name, category, image, description, location } = req.body;

  let imagedata = { public_id: '', url: '' };

  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'techverse/items',
    });
    imagedata.public_id = uploadResponse.public_id;
    imagedata.url = uploadResponse.url;
  }

  const foundItem = new FoundItem({
    name,
    user: user.id,
    category,
    description,
    location,
    image: imagedata,
    returned: false,
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

  if (user._id.toString() !== item.user.toString() && user.role != 'admin') {
    return next(new AppError('You cannot set it Returned', 400));
  }

  item.returned = true;
  await item.save();

  res.status(201).send({
    data: {
      message: 'Item Set Returned',
    },
  });
};
