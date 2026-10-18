"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

export const InteractiveHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking springs for smooth spotlight illumination
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 180 });

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Particle Canvas with Mouse Interactivity
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize 65 interactive cosmic bokeh particles
    const particleCount = 65;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2.8 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
      });
    }

    let mouseCoords = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseCoords = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      mouseCoords = { x: -1000, y: -1000 };
      setIsHovered(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse distance effect
        const dx = mouseCoords.x - p.x;
        const dy = mouseCoords.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If mouse is near, increase particle brightness and draw neural line
        if (dist < 160) {
          p.alpha = Math.min(1, p.baseAlpha + (1 - dist / 160) * 0.6);

          // Subtle gentle attraction to mouse
          p.x += (dx / dist) * 0.6;
          p.y += (dy / dist) * 0.6;

          // Connecting line to cursor
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseCoords.x, mouseCoords.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / 160) * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          p.alpha = p.baseAlpha;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = dist < 160 ? 12 : 5;
        ctx.fill();

        // Connect nearby particles to each other
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pjDist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (pjDist < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - pjDist / 95) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-auto">
      {/* 1. Underlying Undulating Cosmic Wave Image with slow drift animation */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -top-8 -bottom-8 -left-8 -right-8"
      >
        <Image
          src="/images/hero-wave.jpg"
          alt="Cosmic AI Particle Wave Terrain"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
      </motion.div>

      {/* 2. Interactive Spotlight Aura that dynamically tracks cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(550px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0, 240, 255, 0.25), rgba(2, 132, 199, 0.12), transparent 70%)`,
        }}
      />

      {/* Secondary ambient pulsing glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 3. Interactive Neural Particles & Connections Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 4. Cinematic vignette: dark fade at bottom and top to blend with Navbar & Next Section */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/70 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
    </div>
  );
};
