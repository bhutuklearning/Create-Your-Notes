import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e?.preventDefault(); // Prevent form submission if called from button
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Extract error message from response
      const errorMessage = 
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Something went wrong! Please try again.";
      
      if (
        errorMessage.includes("connect to server") ||
        error.code === "ERR_NETWORK"
      ) {
        setError(
          "Cannot connect to server. Please make sure the backend is running."
        );
      } else if (error.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Your Content Goes Here */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center gap-5 flex-col  justify-center p-12">
        <img
          src="/bg.webp"
          alt=""
          className="w-full h-auto object-contain max-w-lg"
        />
        <div className="w-full h-auto object-contain max-w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          temporibus facilis vero optio qui eveniet consequatur cum illo
          quisquam praesentium.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Sign in</h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">E-mail</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Sign in"}
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-500 hover:text-orange-600"
            >
              Sign up
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
