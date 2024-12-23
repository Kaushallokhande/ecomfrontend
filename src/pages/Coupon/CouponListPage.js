import { useEffect, useState } from "react";
import { getCoupons } from "../../services/CouponService";
import CouponCard from "../../components/Coupons/CouponCard";

const CouponListPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const response = await getCoupons();
        setCoupons(response.data.coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Available Coupons</h1>
      {coupons.map((coupon) => (
        <CouponCard key={coupon._id} coupon={coupon} />
      ))}
    </div>
  );
};

export default CouponListPage;
