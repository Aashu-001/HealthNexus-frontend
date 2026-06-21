import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative bg-gradient-to-br from-emerald-800 via-teal-700 to-green-900 text-white"
    >
      {/* Decorative overlay pattern */}
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)", backgroundSize: "60px 60px"}}></div>

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
          className="inline-block py-3 px-8 bg-white text-emerald-800 font-bold rounded-lg shadow-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
        >
          Book an Appointment
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;