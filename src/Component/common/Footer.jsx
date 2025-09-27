

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        {/* Brand */}
        <p className="text-2xl font-extrabold tracking-wide">HealthNexus 🩺</p>
        <p className="mt-2 text-green-100">Connecting you to better health.</p>

        {/* Links */}
        <div className="mt-6 flex justify-center space-x-6">
          <a
            href="#"
            className="text-green-100 hover:text-white transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-green-100 hover:text-white transition duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-green-100 hover:text-white transition duration-300"
          >
            Contact
          </a>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-green-500 opacity-30"></div>

        {/* Copyright */}
        <p className="text-sm text-green-200">
          &copy; {new Date().getFullYear()} HealthNexus. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
