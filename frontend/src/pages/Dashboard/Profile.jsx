import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        location: user.location || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    setSaved(true);
    // Simulate save (you can wire this to an API call)
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 sm:p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-6">
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button className="text-gray-400 hover:text-gray-600">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Avatar & Name */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {formData.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-gray-600 text-sm">Your name</p>
            <p className="text-gray-900 font-semibold text-lg">
              {formData.name}
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-gray-700 text-sm font-medium mb-2 block">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="your name"
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Email Account */}
          <div>
            <label className="text-gray-700 text-sm font-medium mb-2 block">
              Email account
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@gmail.com"
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-gray-700 text-sm font-medium mb-2 block">
              Mobile number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Add number"
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-gray-700 text-sm font-medium mb-2 block">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="USA"
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded mt-8 transition-colors flex items-center justify-center gap-2"
        >
          <FaCheck size={16} />
          Save Change
        </button>

        {/* Success Message */}
        {saved && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 text-sm py-2 px-3 rounded text-center">
            Profile saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
