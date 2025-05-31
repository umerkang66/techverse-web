import React, { useState } from 'react';

const colors = {
  primary: '#00ffff',
  secondary: '#ff00ff',
  dark: '#0f0f1a',
  darker: '#0a0a12',
  light: '#f0f0f0',
};

export default function Navbar({ onSignIn, onSignUp, onLogout, currentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="flex items-center justify-between px-6 py-4 shadow-md"
      style={{ backgroundColor: colors.darker }}
    >
      {/* Brand */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        style={{ color: colors.primary }}
      >
        Trackit
      </h1>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex space-x-8 text-light font-semibold">
        {['Lost Items', 'Found Items', 'Dashboard'].map(item => (
          <li
            key={item}
            className="cursor-pointer hover:text-[#ff00ff] transition-colors"
            style={{ color: colors.light }}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Auth Buttons (desktop) */}
      <div className="hidden md:flex space-x-4">
        {!currentUser ? (
          <>
            <button
              className="px-4 py-2 rounded font-semibold transition-opacity"
              style={{
                backgroundColor: colors.primary,
                color: colors.darker,
              }}
              onClick={onSignIn}
              onMouseEnter={e => (e.target.style.opacity = 0.9)}
              onMouseLeave={e => (e.target.style.opacity = 1)}
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
              onMouseEnter={e => (e.target.style.opacity = 0.9)}
              onMouseLeave={e => (e.target.style.opacity = 1)}
            >
              Signup
            </button>
          </>
        ) : (
          <div className="flex justify-center items-center cursor-pointer">
            <div className="mr-3">{currentUser.name}</div>
            <button
              className="px-4 py-2 rounded font-semibold transition-opacity"
              style={{
                backgroundColor: colors.primary,
                color: colors.darker,
              }}
              onClick={onLogout}
              onMouseEnter={e => (e.target.style.opacity = 0.9)}
              onMouseLeave={e => (e.target.style.opacity = 1)}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Hamburger Menu Button (mobile) */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          style={{ fill: colors.primary }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="none"
          fillRule="evenodd"
        >
          {menuOpen ? (
            <path
              fillRule="evenodd"
              d="M18.364 5.636a1 1 0 0 0-1.414-1.414L12 9.172 7.05 4.222a1 1 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a1 1 0 1 0 1.414 1.414L12 14.828l4.95 4.95a1 1 0 0 0 1.414-1.414L13.414 12l4.95-4.95z"
            />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full bg-[#0a0a12] flex flex-col items-center py-4 space-y-4 md:hidden "
          style={{ backgroundColor: colors.darker }}
        >
          <ul className="flex flex-col items-center space-y-3 text-light font-semibold">
            {['Lost Items', 'Found Items', 'Dashboard'].map(item => (
              <li
                key={item}
                className="cursor-pointer hover:text-[#ff00ff] transition-colors"
                style={{ color: colors.light }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
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
                alert('Login clicked');
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
                alert('Signup clicked');
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
