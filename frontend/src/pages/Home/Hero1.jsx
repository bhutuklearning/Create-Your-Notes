import React from "react";

const Hero1 = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center  ">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-12 items-center py-8 sm:py-12">
        {/* Left Section - Text Content */}
        <div className="space-y-4 sm:space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Clarity, finally.
          </h1>

          <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto md:mx-0">
            Join 50+ million professionals who simplify work and life with the
            world's #1 to-do list app.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 text-gray-600">
            <img src="/apple.png" alt="App Store" className="h-5 sm:h-6" />
            <span className="text-xs sm:text-sm font-medium text-center sm:text-left">
              374K+ ★★★★★ reviews
            </span>
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all w-full sm:w-auto">
            Start for free
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center items-center mt-8 md:mt-0  sm:col-span-2">
          <img
            src="/hero1.jpg"
            alt="App Preview"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero1;
