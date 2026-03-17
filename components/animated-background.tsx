"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export function AnimatedBackground() {
  const [init, setInit] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesColor = useMemo(() => {
    return resolvedTheme === "dark" ? "#ffffff" : "#4A6CF7"; // Primary-ish blue
  }, [resolvedTheme]);

  const options = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          grab: {
            distance: 200,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: particlesColor,
        },
        links: {
          color: particlesColor,
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.2,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
    }) as any,
    [particlesColor]
  );

  if (!init) return null;

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={options}
        className="h-full w-full"
      />
      
      {/* Subtle overlays for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background dark:via-background/40 dark:to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_90%)] pointer-events-none" />
    </div>
  );
}
