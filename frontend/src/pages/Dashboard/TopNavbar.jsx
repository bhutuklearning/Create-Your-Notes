import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaPen, FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import * as notesService from "../../services/notesService";

const TopNavbar = ({ onMenuToggle, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await notesService.searchNotes(query);
      if (response.success) {
        setSearchResults(response.notes || []);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error("Error searching notes:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      handleSearch(value);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (slug) => {
    setSearchQuery("");
    setShowSearchResults(false);
    navigate(`/notes/${slug}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const profileMenu = [
    { name: "Dashboard", href: "/dashboard", color: "text-gray-700", onClick: null },
    { name: "Settings", href: "/profile", color: "text-gray-700", onClick: null },
    { name: "Sign out", href: "#", color: "text-red-600", onClick: handleLogout },
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
          src="/logo.webp"
          alt="AcNote"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded"
        />
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">AcaNote </h1>
      </div>

      <div className="hidden md:block relative" ref={searchRef}>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-48 lg:w-64">
          <FaSearch className="text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery && setShowSearchResults(true)}
            className="bg-transparent focus:outline-none px-2 w-full text-sm text-gray-700"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
                setSearchResults([]);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && (
          <div className="absolute top-full mt-2 left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {searchLoading ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((note) => (
                  <button
                    key={note._id}
                    onClick={() => handleSearchResultClick(note.slug)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none"
                  >
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                      {note.title}
                    </h3>
                    {note.summary && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {note.summary}
                      </p>
                    )}
                    {note.author?.name && (
                      <p className="text-xs text-gray-500 mt-1">
                        by {note.author.name}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No notes found
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 sm:gap-5 relative">
        <Link to="/editor">
          <FaPen className="hidden sm:block text-gray-600 hover:text-gray-900 cursor-pointer text-lg transition" />
        </Link>
        <FaBell className="text-gray-600 hover:text-gray-900 cursor-pointer text-lg transition" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none"
          >
            <img
              src="/wallpaper.gif"
              alt={user?.name || "User"}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-200 hover:border-gray-400 transition"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <span className="block text-sm font-semibold text-gray-900">
                  {user?.name || "User"}
                </span>
                <span className="block text-xs text-gray-500 truncate mt-1">
                  {user?.email || "user@example.com"}
                </span>
              </div>

              <ul className="py-2 text-sm">
                {profileMenu.map((item, index) => (
                  <li key={index}>
                    {item.onClick ? (
                      <button
                        onClick={() => {
                          item.onClick();
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left block px-4 py-2 hover:bg-gray-50 transition ${item.color} font-medium`}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`block px-4 py-2 hover:bg-gray-50 transition ${item.color} font-medium`}
                      >
                        {item.name}
                      </Link>
                    )}
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
