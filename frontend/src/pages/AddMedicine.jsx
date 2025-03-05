import React, { useState } from "react";
import MedCard from "../components/ui/MedCard";

function AddMedicine() {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol",
      company: "MediCare Ltd.",
      price: "₹10",
      description: "Used to treat fever and mild pain.",
    },
    {
      id: 2,
      name: "Ibuprofen",
      company: "HealthCorp",
      price: "₹12",
      description: "Reduces inflammation and pain relief.",
    },
  ]);

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    company: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
  };

  const addMedicine = () => {
    if (!newMedicine.name || !newMedicine.company || !newMedicine.price) return;

    setMedicines([
      ...medicines,
      { id: medicines.length + 1, ...newMedicine },
    ]);

    setNewMedicine({ name: "", company: "", price: "", description: "" });
  };

  const deleteMedicine = (id) => {
    setMedicines(medicines.filter((medicine) => medicine.id !== id));
  };

  const editMedicine = (id, updatedInfo) => {
    setMedicines(
      medicines.map((med) => (med.id === id ? { ...med, ...updatedInfo } : med))
    );
  };

  return (
    <div className="p-6 w-293 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Add New Medicine
      </h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Use this page to add new medicines to the inventory.
      </p>

      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Add Medicine</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            value={newMedicine.name}
            onChange={handleChange}
            className="p-2 border rounded-md dark:bg-gray-600 dark:text-white"
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={newMedicine.company}
            onChange={handleChange}
            className="p-2 border rounded-md dark:bg-gray-600 dark:text-white"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newMedicine.price}
            onChange={handleChange}
            className="p-2 border rounded-md dark:bg-gray-600 dark:text-white"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newMedicine.description}
            onChange={handleChange}
            className="p-2 border rounded-md dark:bg-gray-600 dark:text-white"
          />
        </div>
        <button
          onClick={addMedicine}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
        >
          Add Medicine
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {medicines.map((medicine) => (
          <MedCard
            key={medicine.id}
            medicine={medicine}
            onDelete={deleteMedicine}
            onEdit={editMedicine}
          />
        ))}
      </div>
    </div>
  );
}

export default AddMedicine;
