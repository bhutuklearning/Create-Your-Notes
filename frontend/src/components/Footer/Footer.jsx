import React from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
<footer class="bg-neutral-50 border-t  border-gray-200 px-6 py-16 w-full">
  <div class="max-w-7xl mx-auto grid gap-10 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
    
    {/* <!-- Logo + Text --> */}
    <div class="col-span-2 flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <img src="/logo.webp" alt="AcNote Logo" class="w-8 h-8" />
        <span class="text-xl font-semibold text-gray-800">AcNote</span>
      </div>
      <p class="text-gray-600 text-sm leading-relaxed max-w-sm">
        Join thousands of people who organize their work and ideas with <span class="font-medium text-gray-800">AcNote</span>.
      </p>
    </div>

    {/* <!-- Features --> */}
    <div>
      <h3 class="text-gray-800 font-semibold mb-3">Features</h3>
      <ul class="space-y-2 text-sm text-gray-600">
        <li><a href="#" class="hover:text-blue-700 transition">How It Works</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">For Teams</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Pricing</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Compare</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Templates</a></li>
      </ul>
    </div>

    {/* <!-- Resources --> */}
    <div>
      <h3 class="text-gray-800 font-semibold mb-3">Resources</h3>
      <ul class="space-y-2 text-sm text-gray-600">
        <li><a href="#" class="hover:text-blue-700 transition">Download Apps</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Help Center</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Customer Stories</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Integrations</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Developer API</a></li>
      </ul>
    </div>

    {/* <!-- Company --> */}
    <div>
      <h3 class="text-gray-800 font-semibold mb-3">Company</h3>
      <ul class="space-y-2 text-sm text-gray-600">
        <li><a href="#" class="hover:text-blue-700 transition">About Us</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Careers <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-1">We’re hiring!</span></a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Inspiration Hub</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Press</a></li>
        <li><a href="#" class="hover:text-blue-700 transition">Twist</a></li>
      </ul>
    </div>

    {/* <!-- Social --> */}
     {/* Social Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-gray-800 font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition"
            >
              <FaTwitter size={16} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition"
            >
              <FaYoutube size={16} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>
  </div>

  {/* <!-- Bottom Footer --> */}
  <div class="max-w-7xl mx-auto mt-12 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
    <p>© 2025 AcNote Inc. All rights reserved.</p>
    <div class="flex gap-4 mt-2 sm:mt-0">
      <a href="#" class="hover:text-blue-700">Security</a>
      <a href="#" class="hover:text-blue-700">Privacy</a>
      <a href="#" class="hover:text-blue-700">Terms</a>
      <a href="#" class="hover:text-blue-700">Cookie Preferences</a>
    </div>
  </div>
</footer>

  )
}

export default Footer
