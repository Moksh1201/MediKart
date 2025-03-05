const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
require("dotenv").config();
const orderController = require("./controllers/orderController");

const app = express();
const PORT = process.env.PORT || 5000;
const medicineRoutes = require("./routes/medicineRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("uploads"));
app.use("/images", express.static("routes/images"));
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.get("/api/order-history", orderController.getOrderHistory);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the MediStore Admin Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


