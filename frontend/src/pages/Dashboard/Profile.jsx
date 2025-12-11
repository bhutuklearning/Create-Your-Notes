import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheck,
  FaEdit,
  FaSave,
} from "react-icons/fa";

const Profile = () => {
  // const { user } = useAuth();
  const user = null; // Temporary: AuthProvider is commented out
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);
    // Simulate save (you can wire this to an API call)
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-gray-600 font-medium">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Profile Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 sm:px-8 py-12 text-white">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                  {formData.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <button className="absolute bottom-0 right-0 bg-white text-blue-600 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
                  <FaEdit className="text-sm" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl font-bold mb-2">{formData.name || "User"}</h2>
                <p className="text-blue-100 text-lg mb-1">{formData.email}</p>
                {formData.location && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-100 mt-2">
                    <FaMapMarkerAlt className="text-sm" />
                    <span>{formData.location}</span>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 border border-white/30"
              >
                <FaEdit />
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            {/* Success Message */}
            {saved && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center gap-3 animate-fade-in">
                <FaCheck className="text-xl" />
                <span className="font-medium">Profile updated successfully!</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-3">
                  <FaUser className="text-blue-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 transition-all duration-200 ${
                    isEditing
                      ? "border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-3">
                  <FaEnvelope className="text-blue-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="yourname@example.com"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 transition-all duration-200 ${
                    isEditing
                      ? "border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
                />
                <p className="text-xs text-gray-500 mt-2">Your email address cannot be changed</p>
              </div>

              {/* Mobile Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-3">
                  <FaPhone className="text-blue-600" />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 transition-all duration-200 ${
                    isEditing
                      ? "border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Location Field */}
              <div className="group">
                <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-3">
                  <FaMapMarkerAlt className="text-blue-600" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="City, Country"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 transition-all duration-200 ${
                    isEditing
                      ? "border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveChanges}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Member since</span>
              <p className="text-gray-900 font-medium">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "January 2024"}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Account status</span>
              <p className="text-green-600 font-medium">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
