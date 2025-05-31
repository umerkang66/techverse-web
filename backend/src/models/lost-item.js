const mongoose = require('mongoose');
const User = require('./user');

const lostItemSchema = new mongoose.Schema(
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
    dateLost: {
      type: Date,
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
    received: {
      type: Boolean,
      default: false,
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

const LostItem = mongoose.model('LostItem', lostItemSchema);

module.exports = LostItem;
