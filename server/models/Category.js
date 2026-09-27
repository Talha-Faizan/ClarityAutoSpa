const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['service', 'car'] 
  },
  name: { 
    type: String, 
    required: true 
  },
  displayOrder: { 
    type: Number, 
    default: 0 
  },
}, { timestamps: true });

// Compound unique index: no duplicate names within the same type
categorySchema.index({ type: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
