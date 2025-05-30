import React, { useState, useEffect } from 'react';
import Navbar from './assets/components/Navbar.jsx';
import Hero from './assets/components/Hero.jsx';
import Features from './assets/components/Features.jsx';
import Footer from './assets/components/Footer.jsx';
import AuthForm from './assets/pages/AuthForm.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://10.56.92.1:3000/users/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);
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
