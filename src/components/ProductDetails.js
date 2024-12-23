import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartService from "../services/CartService";
// import "../CSS/ProductDetail.css";
// import { useCart } from "./CartContext";
import ErrorComponent from "../components/Error";
import toast from "react-hot-toast";
import AddReview from "./AddReview";
import { FaCartPlus } from "react-icons/fa";
import QuantityInput from "./QuantityInput";

const ProductDetail = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  // const { addToCart } = useCart();

  const [error, setError] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [quantity,setQuantity]=useState("");

  // const userName =
  //   (localStorage.getItem("userData") &&
  //     JSON.parse(localStorage.getItem("userData")).name) ||
  //   "Demo";

  const userId = localStorage.getItem("userData").userId;
  const navigate = useNavigate();
  const clearError = () => {
    setError(null);
    navigate("/profile");
  };

  useEffect(() => {
    console.log("productId", productId);
    axios
      .post(`https://ecom-2m5s.onrender.com/cart/product-details`, { productId })
      .then((response) => {
        const productData = response.data;
        console.log(productData);
        productData.quantity = 1;
        setProduct(productData);
        setReviews(productData.rating);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleAddToCart = async () => {
    const userId=JSON.parse(localStorage.getItem('userData'));
    const id=userId.userId;

    if (!id) {
      setError("Login first to add the product to the cart");
    } else {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData.userId;
      const res = await CartService.AddToCart({userId:userId,productId:productId,quantity:quantity})
        .then((res) => {
          console.log("result",res)
          toast("Item Added To Cart!", {
            icon: "🥳",
            style: {
              borderRadius: "rgb(189, 224, 254)",
              background: "rgb(70, 11, 70)",
              color: "rgb(255, 210, 255)",
            }
          });
          alert("Item added to cart");
        })
        .catch((error) => {
          setError("Error adding the product to the cart");
          console.error("Error adding product to cart:", error);
        });
    }
  };
  console.log("prouctdetails", product);
  const handlePlaceOrder = () => {
    navigate("/placeOrder", {
      state: {
        productId: product._id,
        price: product.price,
        ProductImage: product.img,
        ProductName: product.className,
      },
    });
  };

  return (
    <div className="product-detail-layer">
      <div className="product-detail-container">
        {error ? <ErrorComponent message={error} onClose={clearError} /> : null}

        {product ? (
          <>
            <div className="product-detail-left">
              <img
                src={product.img}
                alt={product.name}
                className="product-detail-image"
              />
              {/* <div className="product-detail-reviews">
                {reviews.slice(0, 2).map((review) => (
                  <div key={review._id} className="product-review-card">
                    <h3 className="customer-name">{userName}</h3>
                    <h5 className="rating">{review.}</h5>
                  </div>
                ))}
              </div> */}
            </div>
            <div className="product-detail-right">
              <h2 className="product-detail-name">Name: {product.name}</h2>
              <h3 className="product-detail-id">Product ID: {product._id}</h3>
              <h5 className="product-detail-price">
                Price: Rs. {product.price}
              </h5>

              <h3 className=" text-black product-detail-status">
                InStock: {product.inStockValue}
              </h3>
              <h3 className=" text-black product-detail-status">
                Category: {product.category}
              </h3>
              <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
              <div className="flex m-2 flex-row justify-around">
                <button
                  className=" text-white border-blue-500 bg-gray-500 p-4 rounded-2xl product-detail-add-to-cart "
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className=" text-white border-blue-500 bg-gray-500 p-4 rounded-2xl product-detail-add-to-cart "
                  onClick={handlePlaceOrder}
                >
                  Place order
                </button>
              </div>
              <br />

              <button
                className=" text-black product-detail-close-button"
                onClick={() => {
                  if (userId) {
                    setShowAddReview(!showAddReview);
                  } else {
                    setError("First Login to add the review");
                  }
                }}
              >
                Add review
              </button>
              <div className="close-button" onClick={onClose}>
                <div className="cross-line"></div>
              </div>

              {/* {showAddReview && (
                <AddReview
                  productId={product._id}
                  onClose={() => setShowAddReview(false)}
                />
              )} */}
            </div>
          </>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
