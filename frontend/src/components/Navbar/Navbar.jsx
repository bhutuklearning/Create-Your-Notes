import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { navData } from "../../utils/navData.js";

// React icons
import {
  FaUserGraduate,
  FaUsers,
  FaUserTie,
  FaLaptop,
  FaBuilding,
  FaPuzzlePiece,
  FaClipboardList,
  FaPlayCircle,
  FaQuestionCircle,
  FaBookOpen,
  FaLightbulb,
  FaDownload,
} from "react-icons/fa";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lookup for icons (key → component)
  const icons = {
    FaUserGraduate,
    FaUsers,
    FaUserTie,
    FaLaptop,
    FaBuilding,
    FaPuzzlePiece,
    FaClipboardList,
    FaPlayCircle,
    FaQuestionCircle,
    FaBookOpen,
    FaLightbulb,
    FaDownload,
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white  shadow-sm">
      {/* Navbar container */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.webp" alt="Logo" className="h-7 w-auto" />
          <span className="text-lg font-semibold text-gray-800">AcNote</span>
        </Link>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {navData.menu.map((item, index) => (
            <div key={index} className="relative">
              {/* Dropdown Buttons */}
              {item.type === "dropdown" ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-1 text-gray-700 hover:text-red-500"
                  >
                    {item.title}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdown === index && (
                    <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-md p-3 grid grid-cols-1 gap-2 w-56">
                      {item.items.map((subItem, i) => {
                        const Icon = icons[subItem.icon];
                        return (
                          <a
                            key={i}
                            href={subItem.href}
                            className="flex items-center gap-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 px-2 py-1 rounded-md"
                          >
                            {Icon && (
                              <Icon size={16} className="text-gray-500" />
                            )}
                            {subItem.name}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-red-500"
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/signin"
            className="text-gray-700 border border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
          >
            Start for free
          </Link>
        </div>

        {/* Mobile Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="p-4 space-y-2">
            {navData.menu.map((item, index) => (
              <div key={index}>
                {item.type === "dropdown" ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-red-500"
                    >
                      {item.title}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdown === index && (
                      <div className="mt-1 pl-4 flex flex-col gap-2">
                        {item.items.map((subItem, i) => {
                          const Icon = icons[subItem.icon];
                          return (
                            <a
                              key={i}
                              href={subItem.href}
                              className="flex items-center gap-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 px-2 py-1 rounded-md"
                            >
                              {Icon && (
                                <Icon size={15} className="text-gray-500" />
                              )}
                              {subItem.name}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="block text-gray-700 hover:text-red-500"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}

            {/* Mobile Buttons */}
            <div className="border-t pt-3 mt-3 space-y-2">
              <a
                href="#"
                className="block text-center border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Log in
              </a>
              <a
                href="#"
                className="block text-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Start for free
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
