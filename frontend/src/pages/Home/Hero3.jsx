import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero3 = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Container */}
      <div className="w-full max-w-7xl">
        {/* Video Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden bg-white shadow-lg h-[400px] sm:h-[500px] lg:h-[600px]"
        >
          {/* Video Element */}
          <video
            className="w-full h-full object-cover"
            src="/welcome.mp4"
            controls={isPlaying}
            autoPlay={isPlaying}
            muted
            loop
            playsInline
          ></video>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-white bg-gray-900/80 hover:bg-gray-900 px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-xl transition-all duration-300">
                <FaPlay className="text-xs sm:text-sm" />
                Play
              </div>
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero3;
