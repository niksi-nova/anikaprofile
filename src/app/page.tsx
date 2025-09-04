"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Home() {
  const plane1 = useRef<HTMLDivElement>(null);
  const plane2 = useRef<HTMLDivElement>(null);
  const plane3 = useRef<HTMLDivElement>(null);

  let xForce = 0;
  let yForce = 0;
  const easing = 0.1;
  let rafId: number | null = null;

  const lerp = (start: number, end: number, factor: number) =>
    start * (1 - factor) + end * factor;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);

    if (plane1.current) {
      gsap.set(plane1.current, { x: `+=${Math.max(Math.min(xForce, 60), -60)}`, y: `+=${Math.max(Math.min(yForce, 60), -60)}` });
    }
    if (plane2.current) {
      gsap.set(plane2.current, { x: `+=${Math.max(Math.min(xForce * 0.6, 40), -40)}`, y: `+=${Math.max(Math.min(yForce * 0.6, 40), -40)}` });
    }
    if (plane3.current) {
      gsap.set(plane3.current, { x: `+=${Math.max(Math.min(xForce * 0.35, 25), -25)}`, y: `+=${Math.max(Math.min(yForce * 0.35, 25), -25)}` });
    }

    if (Math.abs(xForce) > 0.01 || Math.abs(yForce) > 0.01) {
      rafId = requestAnimationFrame(animate);
    } else {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    xForce = e.movementX * 1.5;
    yForce = e.movementY * 1.5;
    if (!rafId) rafId = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const positions = [
    { top: "10%", left: "12%", size: 240 },
    { top: "65%", left: "18%", size: 220 },
    { top: "20%", left: "70%", size: 180 },
    { top: "75%", left: "68%", size: 170 },
    { top: "38%", left: "6%", size: 140 },
    { top: "30%", left: "82%", size: 140 },
  ];

  const plane1Imgs = positions.slice(0, 2);
  const plane2Imgs = positions.slice(2, 4);
  const plane3Imgs = positions.slice(4, 6);

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden"
      style={{
        height: "100vh",
        backgroundColor: "rgb(245, 218, 223)",
      }}
    >
      {/* Planes */}
      <div ref={plane1} className="pointer-events-none absolute inset-0">
        {plane1Imgs.map((p, idx) => (
          <div key={`p1-${idx}`} className="absolute" style={{ top: p.top, left: p.left }}>
            <Image src="/painting.jpeg" alt={`Artwork ${idx + 1}`} width={p.size} height={p.size}
                   className="rounded-xl shadow-xl opacity-90 hover:opacity-100 transition-opacity duration-300" priority />
          </div>
        ))}
      </div>

      <div ref={plane2} className="pointer-events-none absolute inset-0">
        {plane2Imgs.map((p, idx) => (
          <div key={`p2-${idx}`} className="absolute" style={{ top: p.top, left: p.left }}>
            <Image src="/painting.jpeg" alt={`Artwork ${idx + 3}`} width={p.size} height={p.size}
                   className="rounded-xl shadow-xl opacity-85 hover:opacity-95 transition-opacity duration-300" priority />
          </div>
        ))}
      </div>

      <div ref={plane3} className="pointer-events-none absolute inset-0">
        {plane3Imgs.map((p, idx) => (
          <div key={`p3-${idx}`} className="absolute" style={{ top: p.top, left: p.left }}>
            <Image src="/painting.jpeg" alt={`Artwork ${idx + 5}`} width={p.size} height={p.size}
                   className="rounded-xl shadow-xl opacity-80 hover:opacity-90 transition-opacity duration-300" priority />
          </div>
        ))}
      </div>

      {/* Centered Name */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1
          className="typewriter text-center leading-none"
          style={{
            fontSize: "80px",
            fontFamily: "'Libertinus Keyboard', serif",
            lineHeight: 1,
            color: "rgb(36,36,36)", // updated text color
            whiteSpace: "nowrap",
          }}
        >
          Anika U Bhat
        </h1>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Libertinus+Keyboard&display=swap');

        html, body {
          height: 100%;
          overflow: hidden;
          background: rgb(245, 218, 223);
        }

        .typewriter {
          overflow: hidden;
          letter-spacing: 0.02em;
          animation: typing 2.6s steps(14, end) 0.2s forwards;
          width: 0;
        }

        @keyframes typing {
          from { width: 0; }
          to   { width: 100%; }
        }

        @media (max-width: 1280px) {
          .typewriter { font-size: 140px !important; }
        }
        @media (max-width: 1024px) {
          .typewriter { font-size: 100px !important; }
        }
        @media (max-width: 640px) {
          .typewriter { font-size: 60px !important; }
        }
      `}</style>
    </main>
  );
}
