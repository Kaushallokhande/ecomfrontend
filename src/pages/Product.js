
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import ProductDetail from "../components/ProductDetails";

import { toast } from 'react-toastify';

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([{}]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_TOKEN', // Optional
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("result",result);

        // Ensure result is an array and set loading to false
        setProducts(result.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading if there's an error
     // Fallback to an empty array
      }
    };

    fetchData('https://ecom-2m5s.onrender.com/get-product');
  }, []);
  console.log("Producttts",products);

  const openProductDetail = (productId) => {
    toast("Nice Choice! Just Take It For You!", {
      icon: "😁",
      style: {
        borderRadius: "12px",
        background: "rgb(70, 11, 70)",
        color: "rgb(255, 210, 255)",
      },
    });
    console.log("prodcutId",productId);
    setSelectedProductId(productId);
  };

  const closeProductDetail = () => {
    setSelectedProductId(null);
  };

  const filterProducts = () => {
    if (!Array.isArray(products)) return [];
    return products.filter((product) => {
      return (
        (product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.category.toLowerCase().includes(searchText.toLowerCase()) ||
          product.price.toString().includes(searchText)) &&
        (selectedCategory === "" ||
          product.category.toLowerCase() === selectedCategory.toLowerCase())
      );
    });
  };

  // Ensure products is an array before calling .map()
  const uniqueCategories = [
    ...new Set(Array.isArray(products) ? products.map((product) => product.category) : []),
  ];

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  // Sorting the products on the basis of views (fallback for undefined views)
  const sortMostViewed = () => {
    const sortedProducts = products.slice().sort((a, b) => (b.views || 0) - (a.views || 0));
    setProducts(sortedProducts);
  };

  return (
    <Fragment>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Name, Category, or Price..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full text-black md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            onChange={(e) => handleCategory(e.target.value)}
            value={selectedCategory}
            className="w-full md:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option className="text-black" value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option className="text-black" key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={sortMostViewed}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
          >
            Sort by Most Viewed
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterProducts()?.map((product) => (
              <div
                key={product._id}
                className="bg-white border hover:cursor-pointer hover:scale-110 scroll-m-1 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => openProductDetail(product._id)}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-600">Rs. {product.price}</p>
                  <p
                    className="text-green-500"
                  >
                    {`Number of Stocks available is ${product.inStockValue}`}
                  </p>
                  <p
                    className="text-red-600"
                  >
                    {`Number of Stocks sold stock is ${product.soldStockValue}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedProductId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg transform transition-all duration-300 ease-in-out">
            <ProductDetail
              productId={selectedProductId}
              onClose={closeProductDetail}
            />
            <div
              className="absolute text-black top-4 right-4 text-2xl font-bold cursor-pointer"
              onClick={closeProductDetail}
            >
              &times;
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Product;
