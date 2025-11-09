import React from "react";
import { FaHome, FaBook, FaUser, FaChartBar } from "react-icons/fa";


const LeftSidebar = ({ isOpen, onClose }) => {
  const items = [
    { icon: <FaHome />, label: "Home" },
    { icon: <FaBook />, label: "Library" },
    { icon: <FaUser />, label: "Profile" },
    { icon: <FaChartBar />, label: "Stats" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen  bg-white border-r border-gray-200 w-64 lg:w-auto transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col gap-10 p-4 pt-20 lg:pt-4">
          {items.map((item, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center gap-5 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-all"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;