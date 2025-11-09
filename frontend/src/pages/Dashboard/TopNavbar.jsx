import React, { useState } from "react";
import { FaBell, FaSearch, FaPen } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

const TopNavbar = ({ onMenuToggle, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileMenu = [
    { name: "Dashboard", href: "#", color: "text-gray-700" },
    { name: "Settings", href: "#", color: "text-gray-700" },
    { name: "Earnings", href: "#", color: "text-gray-700" },
    { name: "Sign out", href: "#", color: "text-red-600" },
  ];

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 bg-white">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-gray-700 hover:text-gray-900 text-xl"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <img
          src="./logo.webp"
          alt="AcNote"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded"
        />
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">AcaNote </h1>
      </div>

      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-48 lg:w-64">
        <FaSearch className="text-gray-500 text-sm" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent focus:outline-none px-2 w-full text-sm text-gray-700"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-5 relative">
        <FaPen className="hidden sm:block text-gray-600 hover:text-gray-900 cursor-pointer text-lg transition" />
        <FaBell className="text-gray-600 hover:text-gray-900 cursor-pointer text-lg transition" />

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none"
          >
            <img
              src="./wallpaper.gif"
              alt="User"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-200 hover:border-gray-400 transition"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <span className="block text-sm font-semibold text-gray-900">
                  Bonnie Green
                </span>
                <span className="block text-xs text-gray-500 truncate mt-1">
                  name@medium.com
                </span>
              </div>

              <ul className="py-2 text-sm">
                {profileMenu.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`block px-4 py-2 hover:bg-gray-50 transition ${item.color} font-medium`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;