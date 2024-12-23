import { useState } from "react";
import {saveCoupon} from "../../services/CouponService";
import { toast } from "react-hot-toast";

const AddCouponPage = () => {
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveCoupon({ code, discountPercentage });
      alert("Coupon added successfully!");
    } catch (error) {
      alert("Error adding coupon.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="text-black border p-3 rounded-xl"
        placeholder="Coupon Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="number"
        className="text-black border m-3 p-3 rounded-xl"
        placeholder="Discount Percentage"
        value={discountPercentage}
        onChange={(e) => setDiscountPercentage(e.target.value)}
      />
      <button className="text-white bg-green-500 p-4 hover:scale-105 rounded-2xl" type="submit">Add Coupon</button>
    </form>
  );
};

export default AddCouponPage;
