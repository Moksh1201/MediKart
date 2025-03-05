const fs = require("fs");
const path = require("path");

// CommonJS already has __filename and __dirname
const dataFilePath = path.join(__dirname, "../data/medicines.json");

const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const getMedicines = (req, res) => {
  try {
    const medicines = readData();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medicines", error });
  }
};

const addMedicine = (req, res) => {
  try {
    const {
      name,
      company,
      description,
      category,
      price,
      quantity,
      restockThreshold,
      prescriptionRequired,
      expiryDate,
    } = req.body;

    if (
      !name || !company || !description || !category || 
      price === undefined || quantity === undefined || 
      restockThreshold === undefined || prescriptionRequired === undefined || 
      !expiryDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const medicines = readData();
    const newMedicine = {
      id: Date.now().toString(),
      name,
      company,
      description,
      category,
      price,
      quantity,
      restockThreshold,
      prescriptionRequired,
      expiryDate,
    };

    medicines.push(newMedicine);
    writeData(medicines);

    res.status(201).json({ message: "Medicine added successfully", medicine: newMedicine });
  } catch (error) {
    res.status(500).json({ message: "Error adding medicine", error });
  }
};

const updateMedicine = (req, res) => {
  try {
    const { id } = req.params;
    const medicines = readData();
    const index = medicines.findIndex((med) => med.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    medicines[index] = { ...medicines[index], ...req.body };
    writeData(medicines);

    res.status(200).json({ message: "Medicine updated successfully", medicine: medicines[index] });
  } catch (error) {
    res.status(500).json({ message: "Error updating medicine", error });
  }
};

const deleteMedicine = (req, res) => {
  try {
    const { id } = req.params;
    let medicines = readData();
    const newMedicines = medicines.filter((med) => med.id !== id);

    if (medicines.length === newMedicines.length) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    writeData(newMedicines);
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting medicine", error });
  }
};

const restockMedicine = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid restock quantity" });
    }

    const medicines = readData();
    const index = medicines.findIndex((med) => med.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    medicines[index].quantity += quantity;
    writeData(medicines);

    res.status(200).json({ message: "Medicine restocked successfully", medicine: medicines[index] });
  } catch (error) {
    res.status(500).json({ message: "Error restocking medicine", error });
  }
};

const getLowStockMedicines = (req, res) => {
  try {
    const medicines = readData();
    const lowStockMedicines = medicines.filter((med) => med.quantity < 10);
    res.status(200).json(lowStockMedicines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching low-stock medicines", error });
  }
};

// ✅ Use CommonJS Export
module.exports = {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  restockMedicine,
  getLowStockMedicines,
};
