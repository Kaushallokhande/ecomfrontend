import React, { useState, useEffect } from "react";
import ComplaintService from "../../services/ComplaintService";
import Loader from "../Loader";

const UpdateComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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

  // Handle status update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) {
      alert("Please select a complaint to update.");
      return;
    }

    setUpdating(true);
    try {
      const response = await ComplaintService.updateComplaintStatus(
        selectedComplaint.complaintNumber,
        { status }
      );

      if (response.status === 200) {
        alert("Complaint status updated successfully!");
        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint.complaintNumber === selectedComplaint.complaintNumber
              ? { ...complaint, status }
              : complaint
          )
        );
        setSelectedComplaint(null);
        setStatus("");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update complaint status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Update Complaint Status
        </h2>

        <div className="mb-6">
          <label
            htmlFor="complaint"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Complaint
          </label>
          <select
            id="complaint"
            value={selectedComplaint?.complaintNumber || ""}
            onChange={(e) =>
              setSelectedComplaint(
                complaints.find(
                  (complaint) => complaint.complaintNumber === e.target.value
                )
              )
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <select className="text-black" >-- Select a Complaint --</select>
            {complaints.map((complaint) => (
              <option
               className="text-black"
                key={complaint.complaintNumber}
                value={complaint.complaintNumber}
              >
                {complaint.name} - {complaint.message?.slice(0, 20)}...
              </option>
            ))}
          </select>
        </div>
        {selectedComplaint && (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Update Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Status"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateComplaintStatus;
