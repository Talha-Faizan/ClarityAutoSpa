const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  time: { type: String, default: '' },
  acuityLink: { type: String, default: '' },
  carType: { type: String, default: 'All Vehicles' },
  displayOrder: { type: Number, default: 0 },
  imageUrl: { type: String },
  imageId: { type: String }, // Used by ImageKit to delete/replace
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
