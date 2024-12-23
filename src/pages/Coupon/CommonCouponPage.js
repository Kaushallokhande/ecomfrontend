// src/pages/CommonCouponPage.js
import { Outlet } from 'react-router-dom';
import { useNavigation ,useNavigate } from 'react-router-dom';
const CommonCouponPage = () => {
    const navigate=useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold text-gray-800 my-6">
        Coupons Management
      </h1>

      {/* Button Container */}
      <div className="flex justify-center gap-6 mb-8">
        {/* Coupon List Button */}
        <button
          className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={() => navigate('/coupon/coupon-list')}
        >
          Coupon List
        </button>

        {/* Add Coupon Button */}
        <button
          className="btn bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={() => navigate('/coupon/add-coupon')}
        >
          Add Coupon
        </button>
        <button
          className="btn bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={() => navigate('/coupon/delete-coupon')}
        >
          Delete Coupon
        </button>

        {/* Verify Coupon Button */}
        <button
          className="btn bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={() => navigate('/coupon/verify-coupon')}
        >
          Verify Coupon
        </button>
      </div>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default CommonCouponPage;
