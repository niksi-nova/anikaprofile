"use client";

/**
 * Fullscreen twinkling starfield on a <canvas>.
 * - Stars gently twinkle and drift very slowly.
 * - Position with z-0 so it's *above* the body background but *below* content.
 */

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  vx: number;
  vy: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const initStars = () => {
      const isSmall = window.innerWidth < 768;
      const count = isSmall ? 140 : 240;
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.6 + 0.3,
          baseAlpha: Math.random() * 0.6 + 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.8 + 0.3,
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
        });
      }
      starsRef.current = stars;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    let last = performance.now();
    const render = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.033);
      last = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of starsRef.current) {
        s.phase += s.speed * dt;
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -2) s.x = window.innerWidth + 2;
        if (s.x > window.innerWidth + 2) s.x = -2;
        if (s.y < -2) s.y = window.innerHeight + 2;
        if (s.y > window.innerHeight + 2) s.y = -2;

        const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.phase));
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = "#f3ebb2ff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
