const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');

async function createTestDoctor() {
  try {
    await mongoose.connect('your_mongodb_uri');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const doctor = new Doctor({
      name: 'Dr. John Doe',
      email: 'doctor@example.com',
      password: hashedPassword,
      specialization: 'General Medicine',
      licenseNumber: 'MED123456'
    });

    await doctor.save();
    console.log('Test doctor account created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test doctor:', error);
    process.exit(1);
  }
}

createTestDoctor(); 
