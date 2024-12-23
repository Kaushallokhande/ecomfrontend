// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  // Sample data you provided
  const userData = {
    name: "Sarabu Koushik",
    email: "sarabukoushik09@gmail.com",
    password: "$2b$10$df0CTKKRTimnKN5/bz/Uf.C4yyoOLjUFjXBHZOfBiwbhCHRrfaHqC",
    userId: "2e963bda5a5027dc",
    accountStatus: "open",
    phone: "not available",
  };
 const navigate=useNavigate();
  // State to hold user data
  const [userProfile, setUserProfile] = useState(userData);
  const userdata = JSON.parse(localStorage.getItem("userData"));
  const userId = userdata.userId;
  useEffect(() => {
    axios
      .get(`https://ecom-2m5s.onrender.com/auth/user/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
        alert("logged out");
        console.log(response.data);
        navigate.replace("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleLogout=()=>{
    axios.post('https://ecom-2m5s.onrender.com/auth/logout')
    .then((response) => {
        localStorage.removeItem('userData');
        console.log(response.data);
        
        })
        .catch((error) => {
            console.error(error);
        });
  }

  return (
    <div className="w-full m-4 p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-xl mt-12">
      <h1 className="text-4xl font-semibold text-white text-center mb-6">User Profile</h1>

      <div className="flex justify-center mb-6">
        <img
          src="https://via.placeholder.com/150" // Placeholder profile image
          alt="Profile"
          className="rounded-full w-36 h-36 border-4 border-white shadow-lg"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Name:</h2>
          <p className="text-gray-600">{userProfile.name}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Email:</h2>
          <p className="text-gray-600">{userProfile.email}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Phone:</h2>
          <p className="text-gray-600">{userProfile.phone}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Account Status:</h2>
          <p className="text-gray-600">{userProfile.accountStatus}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">User ID:</h2>
          <p className="text-gray-600">{userProfile.userId}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => handleLogout}
          className="px-8 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
