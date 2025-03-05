const fs = require("fs");
const path = require("path");

exports.getOrderHistory = (req, res) => {
  const filePath = path.join(__dirname, "../data/orders.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading order history" });
    }
    res.json(JSON.parse(data));
  });
};
