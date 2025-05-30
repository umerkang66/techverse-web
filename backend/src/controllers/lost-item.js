const LostItem = require('../models/lost-item');
const cloudinary = require('../utils/cloudinary');

exports.createLostItem = async (req, res, next) => {
  const { name, category, dateLost, image, description, location, received } =
    req.body;

  const { public_id, url } = await cloudinary.uploader.upload(image, {
    folder: 'techverse/items',
  });

  // date -> dd/mm/yyyy
  const lostItem = new LostItem({
    name,
    category,
    dateLost: new Date(dateLost).toLocaleString(),
    description,
    location,
    image: { public_id, url },
  });

  await lostItem.save();

  res.status(201).send({
    data: {
      message: 'Item created',
    },
  });
};
