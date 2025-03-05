const express = require("express");
const { getDoctors, addDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctorController");

router.get("/", getDoctors);
router.post("/", addDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/doctorAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const PrescriptionRequest = require('../models/PrescriptionRequest');

// Get all pending prescription requests
router.get('/prescription-requests', auth, async (req, res) => {
  try {
    const requests = await PrescriptionRequest.find({ status: 'pending' });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve prescription
router.put('/approve-prescription/:id', auth, async (req, res) => {
  try {
    const request = await PrescriptionRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    request.status = 'approved';
    await request.save();
    res.json({ message: 'Prescription approved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject prescription
router.put('/reject-prescription/:id', auth, async (req, res) => {
  try {
    const request = await PrescriptionRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    request.status = 'rejected';
    await request.save();
    res.json({ message: 'Prescription rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Doctor Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
