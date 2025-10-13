import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const AnimatedBackground = ({ 
  variant = 'default', 
  particleCount = 0, // Default to 0 - only enable where needed
  enableParticles = false, // Explicit flag for particles
  children 
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Skip particles on mobile or if not enabled
    if (isMobile || !enableParticles || particleCount === 0) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    
    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = canvas.offsetWidth + 'px';
      canvas.style.height = canvas.offsetHeight + 'px';
    };
    resizeCanvas();
    
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };
    window.addEventListener('resize', handleResize);

    // Optimized Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas.offsetWidth || window.innerWidth);
        this.y = Math.random() * (canvas.offsetHeight || window.innerHeight);
        this.vx = (Math.random() - 0.5) * 0.3; // Reduced speed
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5; // Smaller particles
        this.opacity = Math.random() * 0.3 + 0.1; // More subtle
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        const width = canvas.offsetWidth || window.innerWidth;
        const height = canvas.offsetHeight || window.innerHeight;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize particles with reduced count
    particlesRef.current = Array.from({ length: Math.min(particleCount, 15) }, () => new Particle());

    let lastTime = 0;
    const fps = 30; // Limit to 30 FPS instead of 60
    const interval = 1000 / fps;

    // Optimized animation loop
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= interval) {
        ctx.clearRect(0, 0, canvas.offsetWidth || window.innerWidth, canvas.offsetHeight || window.innerHeight);

        particlesRef.current.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        // Skip connection lines for better performance
        // Only draw particles, no connections

        lastTime = currentTime - (deltaTime % interval);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, [particleCount, enableParticles, isMobile]);

  return (
    <div className={`animated-background animated-background--${variant}`}>
      {enableParticles && !isMobile && particleCount > 0 && (
        <canvas ref={canvasRef} className="particles-canvas" />
      )}
      <div className="animated-background__content">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
