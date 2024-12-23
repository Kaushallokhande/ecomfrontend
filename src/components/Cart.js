// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import CartService from "../services/CartService";
// import toast from "react-hot-toast";

// const Cart = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [CartProduct, setCartProduct] = useState([]);

//   const totalCartValue = CartProduct?.reduce((total, item) => {
//     return total + (item?.price || 0); // Ensure fallback if price is missing
//   }, 0);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("userData"));
//     const userId = userData ? userData.userId : null;
//     if (!userId) {
//       console.error("User ID not found in localStorage.");
//       return;
//     }
//     CartService.GetCart(userId)
//       .then((res) => {
//         const shoppingCart = res.data.cart.productsInCart;
//         setCartItems(shoppingCart);

//         shoppingCart?.forEach(async (item) => {
//           try {
//             const res = await axios.post(
//               "http://localhost:5000/cart/product-details",
//               { productId: item._id }

//             );
//             console.log(res.data);
//             setCartProduct((prev) => [...prev, res.data]);
//           } catch (err) {
//             console.error("Error fetching product details:", err);
//           }
//         });
//       })
//       .catch((error) => {
//         setError(error);
//       });
//   }, []);
// console.log("cartProdcut",CartProduct);
//   const removeProductFromCart = (itemId) => {
//     const userData = JSON.parse(localStorage.getItem("userData"));
//     const userId = userData ? userData.userId : null;

//     if (!userId) {
//       console.error("User ID not found in localStorage.");
//       return;
//     }

//     const payload = {
//       userId: userId,
//       productId: itemId,
//     };

//     CartService.DeleteItems(payload)
//       .then(() => {
//         toast.success("Item removed successfully!");
//         setCartProduct((prev) => prev.filter((item) => item._id !== itemId));
//       })
//       .catch((error) => {
//         setError(error);
//       });
//   };

//   const navigateToOther = () => {
//     navigate("/address-payment-placeOrder", { state: { totalCartValue } });
//   };

//   if (error) {
//     return <div className="text-red-500 text-center">Error: {error.message}</div>;
//   }

//   return (
//     <div className="min-h-screen w-full bg-gray-100">
//       <h1 className="text-4xl font-semibold text-center text-gray-800 py-6">My Cart</h1>

//       {CartProduct.length === 0 ? (
//         <div className="flex flex-col items-center">
//           <img src="/cartempty.png" alt="Empty Cart" className="w-64" />
//           <button
//             onClick={() => navigate("/shop")}
//             className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//           >
//             Shop the Product
//           </button>
//         </div>
//       ) : (
//         <div className="container mx-auto p-4">
//           {CartProduct.filter((item) => item).map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col md:flex-row items-center bg-white shadow rounded-lg p-4 mb-4"
//             >
//               <div className="w-32 h-32 flex-shrink-0">
//                 <img
//                   src={item?.img || "/placeholder.png"} // Fallback for missing images
//                   alt={item?.name || "Product Image"}
//                   className="object-cover w-full h-full rounded-lg"
//                 />
//               </div>

//               <div className="flex-grow md:ml-6">
//                 <h4 className="text-xl font-semibold text-gray-800">{item?.name || "Unknown Product"}</h4>
//                 <h5 className="text-gray-600">Price: Rs. {item?.price || 0}</h5>

//                 <button
//                   onClick={() => removeProductFromCart(item._id)}
//                   className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="bg-white shadow rounded-lg p-4 mt-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Total Cart Value: Rs. {totalCartValue}
//             </h2>
//             <button
//               onClick={navigateToOther}
//               className="mt-4 w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartService from "../services/CartService";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [CartProduct, setCartProduct] = useState([]);

  // Calculate the total cart value
  const totalCartValue = CartProduct?.reduce((total, item) => {
    return total + (item?.price || 0); // Ensure fallback if price is missing
  }, 0);

  useEffect(() => {
    const fetchCartData = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData ? userData.userId : null;
     
      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      try {
        const res = await CartService.GetCart(userId);
        const shoppingCart = res.data.cart.productsInCart;
        console.log("shoping",shoppingCart);
        setCartItems(shoppingCart);
        const productDetails = await Promise.all(
          shoppingCart.map((item) =>
            axios
              .post("http://localhost:5000/cart/product-details", {
                productId: item._id,
              })
              .then((res) => res.data)
              .catch((err) => {
                console.error("Error fetching product details:", err);
                return null; // Ensure error cases don't break the loop
              })
          )
        );
        console.log("productdetails", productDetails);

        setCartProduct(productDetails.filter((item) => item !== null)); // Filter out null values
      } catch (err) {
        console.error("Error fetching cart data:", err);
        setError(err);
      }
    };

    fetchCartData();
  }, []);

  const removeProductFromCart = (itemId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData ? userData.userId : null;

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    const payload = {
      userId: userId,
      productId: itemId,
    };

    CartService.DeleteItems(payload)
      .then(() => {
        toast.success("Item removed successfully!");
        setCartProduct((prev) => prev.filter((item) => item._id !== itemId));
      })
      .catch((error) => {
        setError(error);
      });
  };

  const navigateToOther = () => {
    navigate("/address-payment-placeOrder", { state: { totalCartValue } });
  };

  if (error) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <h1 className="text-4xl font-semibold text-center text-gray-800 py-6">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <img src="/cartempty.png" alt="Empty Cart" className="w-64 mb-4" />
          <p className="text-lg text-gray-600 mb-6">
            Your cart is empty! Start adding amazing products now.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Shop the Product
          </button>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          {cartItems.filter((item) => item).map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center bg-white shadow rounded-lg p-4 mb-4"
            >
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={item?.img || "/placeholder.png"} // Fallback for missing images
                  alt={item?.name || "Product Image"}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>

              <div className="flex-grow md:ml-6">
                <h4 className="text-xl font-semibold text-gray-800">
                  {item?.name || "Unknown Product"}
                </h4>
                <h5 className="text-gray-600">Price: Rs. {item?.price || 0}</h5>

                <button
                  onClick={() => removeProductFromCart(item._id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white shadow rounded-lg p-4 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Cart Value: Rs. {totalCartValue}
            </h2>
            <button
              onClick={navigateToOther}
              className="mt-4 w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
