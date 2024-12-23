import React, { useState, useEffect } from "react";
import ComplaintService from "../../services/ComplaintService";
import Loader from "../Loader";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await ComplaintService.getComplaints();
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">All Complaints</h2>
        {complaints.length === 0 ? (
          <p className="text-gray-600 text-center">No complaints found.</p>
        ) : (
          <ul className="space-y-4">
            {complaints.map((complaint) => (
              <li
                key={complaint.complaintNumber}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {complaint.name}
                  </h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      complaint.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {complaint.status || "Pending"}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{complaint.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  User Type: <span className="font-medium">{complaint.userType}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComplaintList;
