import React from "react";
import { FaStar, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero4 = () => {
  return (
    <section className="bg-[#fff8f5] flex flex-col items-center justify-center text-center py-20 px-4">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
      >
        Gain calmness and clarity with the <br className="hidden sm:block" />
        world's most beloved productivity app
      </motion.h2>

      {/* Reviews */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-gray-600 text-lg mb-8 flex items-center justify-center gap-2"
      >
        <span>374000+</span>
        <span className="flex text-yellow-400">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </span>
        <span>reviews on Google Play and App Store</span>
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {/* Start for free button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
        >
          Start for free
        </motion.button>

        {/* Sign in button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-6 py-3 rounded-lg text-gray-800 text-lg font-medium hover:bg-gray-50 transition-all duration-200"
        >
          <FaDownload className="text-gray-600" />
          Sign in to Our App
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero4;
