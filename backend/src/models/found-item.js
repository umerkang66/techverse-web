const mongoose = require('mongoose');
const User = require('./user');

const foundItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    returned: {
      type: Boolean,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const FoundItem = mongoose.model('FoundItem', foundItemSchema);

module.exports = FoundItem;
