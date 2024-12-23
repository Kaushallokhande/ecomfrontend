import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CartService from "../services/CartService";

const PlaceOrder = () => {
  const location = useLocation();
  const { productId, price, ProductImage, ProductName } = location.state;
  const totalCartValue = price;
  const productsOrdered = productId;
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetching user data from local storage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.userId;

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleOrderSubmit = async () => {
    if (!address.trim()) {
      toast("Please enter a valid address.", {
        icon: "⚠️",
        style: {
          borderRadius: "5px",
          background: "#ffc107",
          color: "#000",
        },
      });
      return;
    }

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    const orderData = {
      userId,
      date,
      time,
      address: address.trim(),
      price: totalCartValue || price,
      productsOrdered: productsOrdered || productId,
    };

    setIsSubmitting(true);
    try {
      const res = await CartService.PlaceOrder(orderData);
      console.log(res.data);
      toast.success(res.data.message, {
        style: {
          borderRadius: "5px",
          background: "#4caf50",
          color: "#fff",
        },
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      toast("Something went wrong, please try again.", {
        icon: "❌",
        style: {
          borderRadius: "5px",
          background: "#f44336",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <h1 className="text-4xl font-semibold text-center my-8">Place Order</h1>
      <div className="w-full flex justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/4 lg:w-1/2">
          {/* Product Details Section */}
          <div className="flex flex-col items-center">
            <img
              src={ProductImage}
              alt={ProductName}
              className="w-[50%] max-w-sm rounded-xl border shadow-md mb-4"
            />
            <h2 className="text-lg  font-medium text-gray-800">
              {ProductName}
            </h2>
            <p className="text-gray-600">Price: ₹{price}</p>
          </div>

          {/* Address Input Section */}
          <h2 className="text-xl text-black font-semibold mt-6 mb-4">
            Enter Shipping Address
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="w-full text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={handleOrderSubmit}
              id="btn-order"
              className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PlaceOrder;
