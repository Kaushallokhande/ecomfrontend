// import React, { useState } from "react";

// const Signup = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [emailOtp, setEmailOtp] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [mobileOtp, setMobileOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSendEmailOtp = () => {
//     console.log("Sending OTP to email:", email);
//   };

//   const handleSendMobileOtp = () => {
//     console.log("Sending OTP to mobile number:", mobileNumber);
//   };

//   const handleRegister = () => {
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     console.log("Registering user:", { fullName, email, mobileNumber, password });
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-center text-2xl font-bold mb-6">CREATE ACCOUNT</h1>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Full Name</label>
//           <input
//             type="text"
//             placeholder="Enter your Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <div className="flex items-center">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//             <button
//               onClick={handleSendEmailOtp}
//               className="bg-black text-sm text-white rounded-r-md hover:bg-gray-800 transition"
//             >
//               Send OTP
//             </button>
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
//           <div className="flex items-center">
//             <input
//               type="text"
//               placeholder="Enter your mobile number"
//               value={mobileNumber}
//               onChange={(e) => setMobileNumber(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//             <button
//               onClick={handleSendMobileOtp}
//               className="bg-black text-sm text-white rounded-r-md hover:bg-gray-800 transition"
//             >
//               Send OTP
//             </button>
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Password</label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//             <button
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-gray-500 hover:text-black"
//             >
//               👁️
//             </button>
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             placeholder="Enter confirmation password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>

//         <button
//           onClick={handleRegister}
//           className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
//         >
//           REGISTER
//         </button>

//         <p className="text-center text-sm mt-4">
//           Already have an account?{" "}
//           <span className="text-blue-500 cursor-pointer">Login</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import axios from "axios";
import AuthService from "../../services/authService";
const Signup = () => {
  const [role, setRole] = useState(""); // Role selection: "user" or "seller"
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [sellerForm, setSellerForm] = useState({
    name: "",
    emailId: "",
    password: "",
    businessName: "",
    businessAddress: "",
    businessType: "",
    phoneNumber: "",
  });

  const [message, setMessage] = useState("");

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setMessage(""); 
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSellerChange = (e) => {
    const { name, value } = e.target;
    setSellerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSignup = async () => {
    try {
      const res = await AuthService.SignupAsUser(userForm);
      setMessage("User signup successful!");
    } catch (error) {
      console.error(error);
      setMessage("User signup failed!");
    }
  };

  const handleSellerSignup = async () => {
    try {
      const res = await AuthService.SingupAsSeller(sellerForm);
      setMessage("Seller signup successful!");
    } catch (error) {
      console.error(error);
      setMessage("Seller signup failed!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-10 px-6">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Welcome! Choose Your Role
        </h2>

        {!role && (
          <div className="flex flex-col space-y-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleRoleSelection("user")}
            >
              I'm a User
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => handleRoleSelection("seller")}
            >
              I'm a Seller
            </button>
          </div>
        )}

        {role === "user" && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-700">User Signup</h3>
            <form className="grid grid-cols-1 gap-4 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userForm.name}
                onChange={handleUserChange}
                className="px-4 py-2 text-black border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userForm.email}
                onChange={handleUserChange}
                className="px-4 py-2 text-black border rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userForm.password}
                onChange={handleUserChange}
                className="px-4 py-2 text-black border rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={userForm.phone}
                onChange={handleUserChange}
                className="px-4 text-black py-2 border rounded"
              />
              <button
                type="button"
                onClick={handleUserSignup}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Signup
              </button>
            </form>
            <button
              className="mt-4 text-red-500 underline"
              onClick={() => setRole("")}
            >
              Back to Role Selection
            </button>
          </div>
        )}

        {role === "seller" && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-700">Seller Signup</h3>
            <form className="grid grid-cols-1 gap-4 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={sellerForm.name}
                onChange={handleSellerChange}
                className="px-4 text-black py-2 border rounded"
              />
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={sellerForm.businessName}
                onChange={handleSellerChange}
                className="px-4 text-black py-2 border rounded"
              />
              <input
                type="text"
                name="businessAddress"
                placeholder="Business Address"
                value={sellerForm.businessAddress}
                onChange={handleSellerChange}
                className="px-4 text-black py-2 border rounded"
              />
              <input
                type="text"
                name="businessType"
                placeholder="Business Type"
                value={sellerForm.businessType}
                onChange={handleSellerChange}
                className="px-4 text-black py-2 border rounded"
              />
              <input
                type="email"
                name="emailId"
                placeholder="Email"
                value={sellerForm.emailId}
                onChange={handleSellerChange}
                className="px-4 text-black py-2 border rounded"
              />
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone"
                value={sellerForm.phoneNumber}
                onChange={handleSellerChange}
                className="px-4 text-black py-2 border rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={sellerForm.password}
                onChange={handleSellerChange}
                className="px-4 text-black py-2 border rounded"
              />
              <button
                type="button"
                onClick={handleSellerSignup}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Signup
              </button>
            </form>
            <button
              className="mt-4 text-red-500 underline"
              onClick={() => setRole("")}
            >
              Back to Role Selection
            </button>
          </div>
        )}

        {message && <div className="mt-4 text-green-600">{message}</div>}
      </div>
    </div>
  );
};

export default Signup;

