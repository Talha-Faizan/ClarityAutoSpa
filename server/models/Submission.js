const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  vehicle: { type: String, required: true }, // year/make/model
  serviceNeeded: { type: String, required: true },
  message: { type: String },
  photos: [{ 
    url: String,
    id: String
  }],
  miniDetailAcknowledged: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
