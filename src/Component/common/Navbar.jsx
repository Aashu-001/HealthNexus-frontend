


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-50 to-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-emerald-700">
          <Link to="/">HealthNexus 🩺</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="relative text-gray-700 hover:text-emerald-600 font-medium group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-400 transition-all group-hover:w-full"></span>
          </Link>
          <a href="#services" className="relative text-gray-700 hover:text-emerald-600 font-medium group">
            Services
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-400 transition-all group-hover:w-full"></span>
          </a>
          <a href="#news" className="relative text-gray-700 hover:text-emerald-600 font-medium group">
            Health News
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-400 transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Admin Login Added Here */}
          <Link to="/admin" className="text-sm text-gray-500 hover:text-emerald-600 font-medium">
            Admin
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-emerald-600 font-medium">
            Login
          </Link>
          <Link
            to="/reg"
            className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition duration-300 shadow-md"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-green-50 to-white shadow-md px-6 py-4 space-y-4 rounded-b-lg">
          <Link to="/" className="block text-gray-700 hover:text-emerald-600">Home</Link>
          <a href="#services" className="block text-gray-700 hover:text-emerald-600">Services</a>
          <a href="#news" className="block text-gray-700 hover:text-emerald-600">Health News</a>
          <hr />
          {/* Admin Login Added to Mobile Menu */}
          <Link to="/admin" className="block text-gray-700 hover:text-emerald-600">Admin Login</Link>
          <Link to="/login" className="block text-gray-700 hover:text-emerald-600">Login</Link>
          <Link
            to="/reg"
            className="block bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition duration-300 text-center shadow-md"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;