import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../login/Navbar";

const BuyMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [prescription, setPrescription] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/medicines")
      .then((response) => setMedicines(response.data))
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  const handleBuyClick = (medicine) => {
    setSelectedMedicine(medicine);
    setMessage("");
  };

  const handleCloseModal = () => {
    setSelectedMedicine(null);
    setMessage("");
  };

  const handlePrescriptionUpload = (e) => {
    setPrescription(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (quantity <= 0) {
      setMessage("Quantity must be at least 1.");
      return;
    }

    if (!address.trim()) {
      setMessage("Please enter your address.");
      return;
    }

    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) {
      setMessage("Please enter a valid 6-digit pincode.");
      return;
    }

    if (!prescription) {
      setMessage("You must upload a prescription to proceed.");
      return;
    }

    const formData = new FormData();
    formData.append("medicineId", selectedMedicine.id);
    formData.append("medicineName", selectedMedicine.name);
    formData.append("quantity", quantity);
    formData.append("age", age);
    formData.append("address", address);
    formData.append("pincode", pincode);
    formData.append("prescription", prescription);

    axios
      .post("http://localhost:5000/api/orders", formData)
      .then(() => {
        setMessage("Order placed! Our doctors will review your prescription.");
      })
      .catch((error) => {
        setMessage("Error placing order. Please try again.");
        console.error("Order error:", error);
      });
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h2 style={styles.heading}>Available Medicines</h2>
      <div style={styles.grid}>
        {medicines.map((medicine) => (
          <div key={medicine.id} style={styles.card}>
            <img
              src={`http://localhost:5000${medicine.image}`}
              alt={medicine.name}
              style={styles.image}
            />
            <h3>{medicine.name}</h3>
            <p>{medicine.description}</p>
            <p style={styles.price}>Price: ₹{medicine.price}</p>
            <button style={styles.button} onClick={() => handleBuyClick(medicine)}>
              Buy
            </button>
          </div>
        ))}
      </div>

      {selectedMedicine && (
        <div style={styles.modal}>
          <h3>Buying: {selectedMedicine.name}</h3>
          
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, e.target.value))}
            min="1"
            style={styles.input}
          /><br />

          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={styles.input} /><br />

          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={styles.input} /><br />

          <label>Pincode:</label>
          <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} style={styles.input} /><br />

          <label>Upload Prescription:</label>
          <input type="file" onChange={handlePrescriptionUpload} style={styles.input} /><br />

          <button style={styles.button} onClick={handleSubmit}>Confirm Order</button>
          <button style={styles.closeButton} onClick={handleCloseModal}>Close</button>
          {message && <p style={styles.message}>{message}</p>}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    paddingTop: "100px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2c3e50",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "3px solid #3498db",
    display: "inline-block",
    paddingBottom: "5px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  },
  price: {
    fontWeight: "bold",
    color: "#27ae60",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
    marginLeft: "10px",
  },
  modal: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  message: {
    color: "red",
    marginTop: "10px",
  },
};

export default BuyMedicine;
