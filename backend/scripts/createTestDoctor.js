const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createTestDoctor = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Check if test doctor already exists
    const existingDoctor = await Doctor.findOne({ email: 'testdoctor@example.com' });
    if (existingDoctor) {
      console.log('Test doctor already exists');
      process.exit(0);
    }

    // Create new test doctor
    const hashedPassword = await bcrypt.hash('password123', 10);
    const doctor = new Doctor({
      name: 'Test Doctor',
      email: 'testdoctor@example.com',
      password: hashedPassword,
      specialization: 'General Medicine',
      licenseNumber: 'TEST123'
    });

    await doctor.save();
    console.log('Test doctor created successfully');
    console.log('Email: testdoctor@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createTestDoctor(); 
