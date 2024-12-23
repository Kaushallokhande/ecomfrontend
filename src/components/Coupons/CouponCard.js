// src/components/CouponCard.js
const CouponCard = ({ coupon }) => {
    const { code, discountPercentage, expirationDate, description } = coupon;
  
    return (
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        {/* Coupon Header */}
        <div className="bg-blue-600 text-white text-center py-4">
          <h3 className="text-2xl font-bold">{code}</h3>
          <p className="text-lg">{discountPercentage}% OFF</p>
        </div>
  
        {/* Coupon Details */}
        <div className="p-6">
          <p className="text-gray-600 text-sm">{description || 'No description available'}</p>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              <strong>Expires on:</strong> {new Date(expirationDate).toLocaleDateString()}
            </p>
  
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
              onClick={() => alert(`Coupon ${code} applied!`)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CouponCard;
  