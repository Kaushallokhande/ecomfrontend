import axios from "axios";

const API_BASE_URL = "https://ecom-2m5s.onrender.com/coupon/";

export const getCoupons = async () => {
  return await axios.get(`${API_BASE_URL}/get-coupon`);
};

export const saveCoupon = async (data) => {
  return await axios.post(`${API_BASE_URL}/save-coupon`, data);
};

export const verifyCoupon = async (code) => {
  return await axios.post(`${API_BASE_URL}/verify-coupon`, { code });
};

export const deleteCoupon = async (data) => {
  return await axios.delete(`${API_BASE_URL}/delete-coupon`, { data });
};
