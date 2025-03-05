const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Multer setup for prescription uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// JSON file to store order details
const ORDERS_FILE = "./data/orders.json";

// Load existing orders or initialize an empty array
const loadOrders = () => {
  if (fs.existsSync(ORDERS_FILE)) {
    const data = fs.readFileSync(ORDERS_FILE);
    return JSON.parse(data);
  }
  return [];
};

// Save order details to JSON file
const saveOrder = (order) => {
  const orders = loadOrders();
  orders.push(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
};

// Handle order placement
router.post("/", upload.single("prescription"), (req, res) => {
  const { medicineId, medicineName, quantity, age, address, pincode } = req.body;
  const prescriptionFile = req.file;

  if (!prescriptionFile) {
    return res.status(400).json({ message: "Prescription upload required" });
  }

  const newOrder = {
    medicineId,
    medicineName,
    quantity,
    age,
    address,
    pincode,
    prescription: prescriptionFile.filename,
    timestamp: new Date().toISOString(),
  };

  saveOrder(newOrder);

  res.json({
    message: "Order received. Doctors will review your prescription.",
    orderDetails: newOrder,
  });
});

module.exports = router;
