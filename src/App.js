import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home/home";
import LoginPage from "./pages/auth/Login";
import Footer from "./components/Footer";
import Signup from "./pages/auth/Singnup";
import Product from "./pages/Product";
import Complaint from "./pages/ComplaintPage";
import PlaceOrder from "./components/PlaceOrder";
import Cart from "./components/Cart";
import CouponListPage from "./pages/Coupon/CouponListPage";
import AddCouponPage from "./pages/Coupon/AddCouponPage";
import VerifyCouponPage from "./pages/Coupon/VerifyCouponPage";
import CommonCouponPage from "./pages/Coupon/CommonCouponPage";
import DeleteCouponPage from "./pages/Coupon/DeleteCouponPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Product />} />
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/coupon" element={<CommonCouponPage/>}>
            <Route path="Coupon-List" element={<CouponListPage />} />
            <Route path="add-coupon" element={<AddCouponPage />} />
            <Route path="verify-coupon" element={<VerifyCouponPage />} />
            <Route path="delete-coupon" element={<DeleteCouponPage/>} />
          </Route>
        </Routes>
        <Footer />
      </header>
    </div>
  );
}

export default App;
