import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    // Main container with a background image
    <section 
      id="hero" 
      className="relative bg-cover bg-center text-white" 
      style={{ backgroundImage: "url('http://googleusercontent.com/image_collection/image_retrieval/1046300482123186188_0')" }}
    >
      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content container */}
      <div className="relative container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight">
          Quality Healthcare, Simplified.
        </h1>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          Find top-rated doctors and book your appointments seamlessly. Your path to better health starts here.
        </p>
        <Link 
          to="/preqapp"
          className="inline-block py-3 px-8 bg-green-600 font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
        >
          Book an Appointment
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;