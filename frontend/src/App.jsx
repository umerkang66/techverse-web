import React, { useState, useEffect } from 'react';
import Navbar from './assets/components/Navbar.jsx';
import Hero from './assets/components/Hero.jsx';
import Features from './assets/components/Features.jsx';
import Footer from './assets/components/Footer.jsx';
import AuthForm from './assets/pages/AuthForm.jsx';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('http://localhost:3000/users/me', {
        withCredentials: true,
      });
      console.log(response);
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-[#0f0f1a] min-h-screen text-white">
      <>
        <Navbar
          onSignIn={() => setAuthMode('signin')}
          onSignUp={() => setAuthMode('signup')}
        />
        <Hero />
        <Features />
        <Footer />
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
      </>
    </div>
  );
}

export default App;
