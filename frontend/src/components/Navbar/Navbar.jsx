import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navData } from "../../config/navData.js";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-neutral-200 shadow-sm ">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar Flex Layout */}
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-7 w-auto" />
              <span className="text-xl font-semibold text-gray-900">
                AcNote
              </span>
            </a>
          </div>

          {/* Center Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            {navData.menu.map((item, index) => (
              <div key={index} className="relative">
                {item.type === "dropdown" ? (
                  <div className="relative">
                    {/* Dropdown Trigger */}
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md transition-colors"
                    >
                      {item.title}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Content */}
                    {openDropdown === index && (
                      <>
                        {/* Background Overlay */}
                        <div
                          className="fixed inset-0"
                          onClick={() => setOpenDropdown(null)}
                        />
                        <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50 grid grid-cols-2 md:grid-cols-3 gap-2 w-80">
                          {item.items.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-center"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md transition-colors"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md transition-colors"
            >
              Log in
            </a>
            <a
              href="#"
              className="px-5 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 shadow-sm"
            >
              Start for free
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navData.menu.map((item, index) => (
              <div key={index}>
                {item.type === "dropdown" ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {item.title}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdown === index && (
                      <div className="pl-4 mt-2 grid grid-cols-2 gap-2">
                        {item.items.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-200 mt-4">
              <a
                href="#"
                className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Log in
              </a>
              <a
                href="#"
                className="block w-full text-center px-5 py-3 text-base font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all shadow-sm"
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
