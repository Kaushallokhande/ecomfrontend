import { useState } from "react";
import { verifyCoupon } from "../../services/CouponService";
import { toast } from "react-hot-toast";

const VerifyCouponPage = () => {
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    try {
      const response = await verifyCoupon(code);
      alert(`Coupon is valid with ${response.data.discountPercentage}% discount!`);
    } catch {
      alert("Invalid coupon code.");
    }
  };

  return (
    <div>
      <input
        type="text"
        className="text-black border p-3 rounded-xl"
        placeholder="Enter Coupon Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button className="text-white p-2 hover:scale-105 rounded-2xl ml-3 bg-yellow-600 " onClick={handleVerify}>Verify Coupon</button>
    </div>
  );
};

export default VerifyCouponPage;
