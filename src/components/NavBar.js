import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border w-full shadow-md">
      <div className="container px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-widest">
          <NavLink to="/" className='text-black'>Mytalorzone By Sahiba</NavLink>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "hover:text-black text-gray-600"
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "hover:text-black text-gray-600"
              }
            >
              SHOP
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/complaint"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "hover:text-black text-gray-600"
              }
            >
              Complaint
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "hover:text-black text-gray-600"
              }
            >
              LOGIN
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "hover:text-black text-gray-600"
              }
            >
              SIGNUP
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "hover:text-black text-gray-600"
              }
            >
              Open cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/coupon"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "hover:text-black text-gray-600"
              }
            >
              Coupons
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "hover:text-black text-gray-600"
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>

        {/* Search Icon */}
        <div className="hidden md:block">
          <button className="text-gray-600 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
