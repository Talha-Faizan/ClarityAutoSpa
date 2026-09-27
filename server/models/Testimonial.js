const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  quote: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  photoUrl: { type: String },
  photoId: { type: String }, // Used by ImageKit
  isFeatured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
