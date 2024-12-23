import React, { useState } from "react";
import AuthService from "../../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginAsUser, setLoginAsUser] = useState(true);
  const [sellerId, setSellerId] = useState("");
  const [loginError, setLoginError] = useState("");
  const [message ,setMessage]=useState("");
  const payload = {
    emailOrPhone: emailOrPhone,
    email: emailOrPhone,
    password: password,
    sellerId: loginAsUser === false ? sellerId : undefined,
  };

  const handleLogin = async () => {
    console.log("payload",payload);
    if (loginAsUser === null) {
      alert("Select one option (User or Seller)");
      return;
    }

    try {
      const res = await AuthService.Login(payload);
      console.log("Login successful:", res.data);
      localStorage.setItem('userData', JSON.stringify(res.data));
      setMessage(res.data.message);
      alert(res.data.message);
      setLoginError("");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Invalid credentials. Please try again.");
    }
  };
  const handleSellerLogin = async () => {
    if (loginAsUser === null) {
      alert("Select one option (User or Seller)");
      return;
    }

    try {
      const res = await AuthService.LoginAsSeller(payload);
      console.log("Login successful:", res.data);
      localStorage.setItem('sellerData', JSON.stringify(res.data));
      setMessage(res.data.message);
      alert(res.data.message);
      setLoginError(""); // Clear previous errors
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  const handleTestLogin = () => {
    // Set predefined test user credentials
    setEmail("testuser@example.com");
    setPassword("password123");
    console.log("Logged in as Test User");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-center text-black text-2xl font-bold mb-6">
          KICKSY
        </h1>
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 rounded ${
              loginAsUser === true ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setLoginAsUser(true)}
          >
            Login as User
          </button>
          <button
            className={`px-4 py-2 rounded ${
              loginAsUser === false ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setLoginAsUser(false)}
          >
            Login as Seller
          </button>
        </div>
        <p className="text-center text-sm mb-6">
          Sign in to your account
          <br />
          <span className="text-blue-500 cursor-pointer">Sign up</span>
        </p>

        {loginAsUser === false && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Seller ID
            </label>
            <input
              type="text"
              placeholder="Enter your Seller ID"
              value={sellerId}
              onChange={(e) => setSellerId(e.target.value)}
              className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email 
          </label>
          <input
            type="string"
            placeholder="Enter your emailOrPhone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {loginError && (
          <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>
        )}

        <button
          onClick={loginAsUser ? handleLogin:handleSellerLogin}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          LOGIN
        </button>

        <button
          onClick={handleTestLogin}
          className="w-full bg-gray-800 text-white py-2 mt-4 rounded-md hover:bg-gray-700 transition"
        >
          Login as Test User
        </button>
        {message&&<p className="text-green-600">{message}</p>}
     
      </div> 
    </div>
  );
};

export default LoginPage;
