import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../login/Navbar";

const ViewHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/order-history")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching order history:", error));
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />
      <h2 style={styles.heading}>Order History</h2>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={styles.bill}>
            <h3>Bill #{index + 1}</h3>
            <p><strong>Medicine Name:</strong> {order.medicineName}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Age:</strong> {order.age}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Pincode:</strong> {order.pincode}</p>
            <p><strong>Order Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
            <p><strong>Prescription:</strong> 
              <a href={`http://localhost:5000/uploads/${order.prescription}`} target="_blank" rel="noopener noreferrer">
                View Prescription
              </a>
            </p>
          </div>
        ))
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
  noOrders: {
    textAlign: "center",
    fontSize: "18px",
    color: "#7f8c8d",
  },
  bill: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
    maxWidth: "500px",
    margin: "0 auto",
  },
};

export default ViewHistory;
