import React from "react";
import Navbar from "../src/assets/components/Navbar.jsx";
import Hero from "../src/assets/components/Hero.jsx";
import Features from "../src/assets/components/Features.jsx";
import Footer from "../src/assets/components/Footer.jsx";
import AuthForm from "../src/assets/pages/AuthForm.jsx";
function App() {
  return (
    <>
      {/* <AuthForm /> */}
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}

export default App;
