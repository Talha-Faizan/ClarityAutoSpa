const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AdminUser = require('../models/AdminUser');

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/clarity_auto_spa";

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Allow multiple admins to be created
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
      console.error('Usage: node createAdmin.js <email> <password>');
      process.exit(1);
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newAdmin = new AdminUser({
      email: email.toLowerCase(),
      passwordHash
    });

    await newAdmin.save();
    console.log(`Successfully created admin user: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();
