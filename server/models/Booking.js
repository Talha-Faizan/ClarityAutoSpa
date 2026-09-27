const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  acuityAppointmentId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  serviceName: { type: String },
  appointmentTime: { type: Date, required: true },
  syncedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
