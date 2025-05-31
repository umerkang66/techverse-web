import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import AuthForm from './pages/AuthForm.jsx';
import axios from 'axios';

function App() {
  const [_, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('http://localhost:3000/users/me', {
        withCredentials: true,
      });

      setCurrentUser(response.data.data.user);
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await axios.get('http://localhost:3000/users/logout', {
      withCredentials: true,
    });

    window.location.reload();
  };

  return (
    <div className="bg-[#0f0f1a] min-h-screen text-white">
      <>
        <Navbar
          onSignIn={() => setAuthMode('signin')}
          onSignUp={() => setAuthMode('signup')}
          onLogout={logout}
          currentUser={currentUser}
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
