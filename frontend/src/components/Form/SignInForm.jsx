import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Response:", data);
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded transition"
          >
            {loading ? "Loading..." : "Sign in"}
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <span className="text-orange-500 cursor-pointer">Sign up</span> Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
