
import axios from "axios";

const API_BASE_URL = "https://ecom-2m5s.onrender.com/cart";


const CartService = {
    AddToCart :(payload) => axios.post(`${API_BASE_URL}/addtocart`,payload),
    GetCart :(userId) => axios.post(`${API_BASE_URL}/get-cart`,userId),
    UpdateQuantity:(payload)=>  axios.post(`${API_BASE_URL}/update-quantity`,payload),
    DeleteItems:(payload)=>axios.post(`${API_BASE_URL}/delete-items`,payload),
    PlaceOrder:(payload)=>axios.post(`${API_BASE_URL}/place-order`,payload),
};

export default CartService;
