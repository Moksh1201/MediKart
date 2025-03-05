const express = require("express");
const router = express.Router();

// Dummy medicine data
const medicines = [
  { id: 1, name: "Paracetamol", description: "Fever and pain relief", price: 50, image: "/images/paracetamol.jpg" },
  { id: 2, name: "Amoxicillin", description: "Antibiotic", price: 100, image: "/images/amoxicillin.jpg" },
  { id: 3, name: "Cetirizine", description: "For allergies", price: 70, image: "/images/cetirizine.jpg" }
];

// Route to get all medicines
router.get("/", (req, res) => {
  res.json(medicines);
});

module.exports = router;
