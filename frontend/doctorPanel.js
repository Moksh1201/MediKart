import React, { useState, useEffect } from 'react';

const DoctorPanel = () => {
  const [prescriptionRequests, setPrescriptionRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Fetch pending prescription requests when component mounts
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch('/api/doctor/prescription-requests');
      const data = await response.json();
      setPrescriptionRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await fetch(`/api/doctor/approve-prescription/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });
      fetchPendingRequests(); // Refresh the list
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await fetch(`/api/doctor/reject-prescription/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'rejected' })
      });
      fetchPendingRequests(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="doctor-panel">
      <h1>Doctor's Review Panel</h1>
      <div className="prescription-requests">
        {prescriptionRequests.map(request => (
          <div key={request._id} className="request-card">
            <h3>Order #{request.orderId}</h3>
            <p>Patient: {request.patientName}</p>
            <p>Medicine: {request.medicineName}</p>
            <p>Age: {request.patientAge}</p>
            <img src={request.prescriptionImage} alt="Prescription" />
            <div className="action-buttons">
              <button onClick={() => handleApprove(request._id)}>Approve</button>
              <button onClick={() => handleReject(request._id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPanel; 
