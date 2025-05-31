import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a12] text-[#f0f0f0] py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-cyan-400">TrackIt</h2>
          <p className="text-sm text-gray-400">
            Helping you find what’s lost and return what’s found.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-cyan-400 duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/lost-items"
                className="hover:text-cyan-400 duration-200"
              >
                Lost Items
              </Link>
            </li>
            <li>
              <Link
                to="/found-items"
                className="hover:text-cyan-400 duration-200"
              >
                Found Items
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-cyan-400 duration-200"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-cyan-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-cyan-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-cyan-400">
              <FaInstagram />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Email: support@trackit.com
          </p>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <div className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Trackit. All rights reserved.
      </div>
    </footer>
  );
}
