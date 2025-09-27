


import React from 'react';
import Navbar from '../Component/common/Navbar';
import HeroSection from '../Component/common/HeroSection';
import HealthNewsSection from '../Component/common/HealthNewsSection';
import ServicesSection from '../Component/common/ServiceSection';
import Footer from '../Component/common/Footer';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-green-100 via-emerald-100 to-teal-50 min-h-screen flex flex-col">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main Content */}
      <main className="flex-1">
        {/* Hero Section with Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>

        {/* Services Section with Slide-Up */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50"
        >
          <ServicesSection />
        </motion.div>

        {/* Health News Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-white/70 backdrop-blur-md rounded-t-3xl"
        >
          <HealthNewsSection />
        </motion.div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
