import React, { useState } from "react";
import ComplaintDetails from "../components/Complaint/ComplaintDetails";
import ComplaintForm from "../components/Complaint/ComplaintForm";
import ComplaintList from "../components/Complaint/ComplaintList";
import UpdateComplaintStatus from "../components/Complaint/UpdateComplaintStatus";

const ComplaintPage = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="  w-full bg-gray-100 p-6">
      <div className="mx-auto  bg-white shadow-lg rounded-lg">
  
        <nav className="flex justify-around border-b p-4 bg-gray-50">
          <button
            onClick={() => setActiveTab("details")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "details"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Complaint Details
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "form"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Complaint Form
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "list"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Complaint List
          </button>
          <button
            onClick={() => setActiveTab("updateComplaintStatus")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "updateComplaintStatus"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Update complaint status
          </button>
        </nav>

        {/* Content Section */}
        <div className="p-6">
          {activeTab === "details" && <ComplaintDetails />}
          {activeTab === "form" && <ComplaintForm />}
          {activeTab === "list" && <ComplaintList />}
          {activeTab ==="updateComplaintStatus" && <UpdateComplaintStatus/>}
        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;
