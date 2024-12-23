import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplaintDetails = ({ userType }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaints/get-complaints");
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter(
    (complaint) => userType === "admin" || complaint.userType === userType
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Complaints</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      ) : filteredComplaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.complaintNumber}
              className="bg-white p-4 shadow rounded-lg"
            >
              <h2 className="text-lg font-bold">Complaint #{complaint.complaintNumber}</h2>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-medium">Name:</span> {complaint.name}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-medium">Email:</span> {complaint.email}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-medium">Message:</span> {complaint.message}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-medium">Status:</span> {complaint.status || "Pending"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No complaints to show.</p>
      )}
    </div>
  );
};

export default ComplaintDetails;
