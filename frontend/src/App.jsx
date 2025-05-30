import Navbar from "../src/assets/components/Navbar.jsx";
import ParticlesBackground from "../src//assets/components/ParticlesBackground.jsx";
import Hero from "../src/assets/components/Hero.jsx";
import Features from "../src/assets/components/Features.jsx";
import Footer from "../src/assets/components/Footer.jsx";
import React from "react";
function App() {
  return (
    <>
      <div className="relative min-h-screen text-[#f0f0f0]">
        <ParticlesBackground />
        <div className="relative z-10 ">
          <Navbar />
          <Hero />
          <Features />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
