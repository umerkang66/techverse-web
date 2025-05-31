import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import AuthForm from './pages/AuthForm.jsx';
import LostItem from './pages/LostItem.jsx';
import FoundItem from './pages/FoundItem.jsx';
import Dashboard from './pages/Dashboard.jsx';
import axios from 'axios';
import Chat from './pages/Chat.jsx';
import { Toaster } from 'react-hot-toast';
import { socket } from './socket-cn.js';
import { showMessageToast } from './notification.jsx';

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
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentUser?._id) {
      socket.emit('join', currentUser._id);
    }
  }, [currentUser?._id]);

  useEffect(() => {
    const handlePrivateMessage = data => {
      if (!currentUser?._id) return;

      // Avoid showing toast if current user is the sender (i.e. message you sent)
      if (data.from !== currentUser._id) {
        showMessageToast(currentUser._id, data.from, data.message);
      }
    };

    socket.on('private_message', handlePrivateMessage);

    return () => {
      socket.off('private_message', handlePrivateMessage);
    };
  }, [currentUser?._id]);

  const onLogout = async () => {
    await axios.get('http://localhost:3000/users/logout', {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <div className="bg-[#0f0f1a] min-h-screen text-white">
      <>
        <Toaster />
        <Router>
          <Navbar
            onSignIn={() => setAuthMode('signin')}
            onSignUp={() => setAuthMode('signup')}
            currentUser={currentUser}
            onLogout={onLogout}
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
            <Route
              path="/lost-items"
              element={<LostItem currentUser={currentUser} />}
            />
            <Route
              path="/found-items"
              element={<FoundItem currentUser={currentUser} />}
            />
            <Route path="/chat/:sender/:receiver" element={<Chat />} />
            <Route
              path="/dashboard"
              element={
                !currentUser ? (
                  <div>Loading...</div>
                ) : currentUser.role !== 'admin' ? (
                  'Not Accessible'
                ) : (
                  <Dashboard />
                )
              }
            />
          </Routes>
          <Footer />
        </Router>
      </>
    </div>
  );
}

export default App;
