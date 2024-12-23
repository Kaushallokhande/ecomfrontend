import React, { useState } from "react";
import ClothingImage from '../assets/ClothingImage.webp';

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: "2024 fashion",
      highlight: "New clothes",
      buttonText: "GO TO SHOP",
      imgSrc: ClothingImage, // Replace with your image URL
    },
    {
      id: 2,
      title: "THE FUTURE OF COMFORT",
      highlight: "AIR FORCE 1",
      buttonText: "SHOP NOW",
      imgSrc: ClothingImage, // Replace with your image URL
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full  overflow-hidden">
      {/* Slide */}
      <div className="flex  w-full transition-transform duration-700">
        <div
          className="w-full flex flex-col items-center justify-center text-center py-16"
          key={slides[currentSlide].id}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 uppercase">
            {slides[currentSlide].title}
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 my-4">
            {slides[currentSlide].highlight}
          </h1>
          <img
            src={slides[currentSlide].imgSrc}
            alt={slides[currentSlide].title}
            className="w-1/2 mx-auto mb-6"
          />
          <button className="bg-black text-white px-6 py-2 font-medium uppercase tracking-wide hover:bg-gray-800">
            {slides[currentSlide].buttonText}
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        onClick={prevSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        onClick={nextSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index
                ? "bg-black"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
