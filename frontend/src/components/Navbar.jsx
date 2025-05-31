import React, { useState } from "react";
import { Link } from "react-router-dom";

const colors = {
  primary: "#00ffff",
  secondary: "#ff00ff",
  dark: "#0f0f1a",
  darker: "#0a0a12",
  light: "#f0f0f0",
};

export default function Navbar({ onSignIn, onSignUp, onLogout, currentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  let navLinks = [
    { name: "Lost Items", path: "/lost-items" },
    { name: "Found Items", path: "/found-items" },
  ];

  if (currentUser && currentUser.role === "admin") {
    navLinks = [
      { name: "Lost Items", path: "/lost-items" },
      { name: "Found Items", path: "/found-items" },
      { name: "Dashboard", path: "/dashboard" },
    ];
  }

  return (
    <nav
      className="flex items-center justify-between px-6 py-4 shadow-md relative"
      style={{ backgroundColor: colors.darker }}
    >
      {/* Brand */}
      <Link to="/">
        <h1
          className="text-2xl font-bold cursor-pointer"
          style={{ color: colors.primary }}
        >
          Trackit
        </h1>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex space-x-8 text-light font-semibold">
        {navLinks.map(({ name, path }) => (
          <li key={name}>
            <Link
              to={path}
              className="cursor-pointer hover:text-[#ff00ff] transition-colors"
              style={{ color: colors.light }}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth Buttons (desktop) */}
      {!currentUser ? (
        <div className="hidden md:flex space-x-4">
          <button
            className="px-4 py-2 rounded font-semibold transition-opacity"
            style={{
              backgroundColor: colors.primary,
              color: colors.darker,
            }}
            onClick={onSignIn}
            onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            Login
          </button>
          <button
            className="px-4 py-2 rounded font-semibold transition-opacity"
            style={{
              backgroundColor: colors.secondary,
              color: colors.darker,
            }}
            onClick={onSignUp}
            onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            Signup
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="mr-2">{currentUser.name}</div>
          <button
            className="px-4 py-2 rounded font-semibold transition-opacity cursor-pointer"
            style={{
              backgroundColor: colors.primary,
              color: colors.darker,
            }}
            onClick={onLogout}
            onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            Logout
          </button>
        </div>
      )}

      {/* Hamburger Menu Button (mobile) */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
            menuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-2"
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition duration-300 ease-in-out ${
            menuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
            menuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-2"
          }`}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full bg-[#0a0a12] flex flex-col items-center py-4 space-y-4 md:hidden z-50"
          style={{ backgroundColor: colors.darker }}
        >
          <ul className="flex flex-col items-center space-y-3 text-light font-semibold">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  className="cursor-pointer hover:text-[#ff00ff] transition-colors"
                  style={{ color: colors.light }}
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex space-x-4">
            <button
              className="px-4 py-2 rounded font-semibold"
              style={{
                backgroundColor: colors.primary,
                color: colors.darker,
              }}
              onClick={() => {
                onSignIn?.();
                setMenuOpen(false);
              }}
            >
              Login
            </button>
            <button
              className="px-4 py-2 rounded font-semibold"
              style={{
                backgroundColor: colors.secondary,
                color: colors.darker,
              }}
              onClick={() => {
                onSignUp?.();
                setMenuOpen(false);
              }}
            >
              Signup
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
