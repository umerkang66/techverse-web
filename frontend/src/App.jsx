import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import Footer from "./components/Footer.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import LostItem from "./pages/LostItem.jsx";
import FoundItem from "./pages/FoundItem.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:3000/users/me", {
        withCredentials: true,
      });
      console.log(response);
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-[#0f0f1a] min-h-screen text-white">
      <>
        <Router>
          <Navbar
            onSignIn={() => setAuthMode("signin")}
            onSignUp={() => setAuthMode("signup")}
          />

          {authMode && (
            <AuthForm
              mode={authMode}
              onClose={() => setAuthMode(null)}
              onSuccess={() => {
                setIsLoggedIn(true);
                setAuthMode(null);
              }}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Hero />
                  <Features />
                </div>
              }
            />
            <Route path="/lost-items" element={<LostItem />} />
            <Route path="/found-items" element={<FoundItem />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </Router>
      </>
    </div>
  );
}

export default App;
