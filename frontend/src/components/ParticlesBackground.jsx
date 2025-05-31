import React from "react";
import Particles from "react-tsparticles";

const colors = {
  primary: "#00ffff",
  secondary: "#ff00ff",
  dark: "#0f0f1a",
  darker: "#0a0a12",
  light: "#f0f0f0",
};

export default function ParticlesBackground() {
  return (
    <Particles
      options={{
        fullScreen: { enable: true, zIndex: 0 }, // full screen, behind everything
        background: {
          color: colors.darker, // page background color
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
        particles: {
          color: {
            value: [colors.primary, colors.secondary],
          },
          links: {
            color: colors.primary,
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: "bounce",
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
