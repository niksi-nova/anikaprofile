"use client";

/**
 * Night-sky home:
 * - Body has dark blue gradient background.
 * - Starfield canvas is inside <main> at z-0 so stars show.
 * - Six paintings float *slightly* around initial positions.
 * - Centered name with typewriter (no blinking cursor).
 * - No scroll; works with floating navbar.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Starfield from "./components/Starfield";

export default function Home() {
  const imgRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      const dx = 6 + (i % 3) * 2; // 6–10 px
      const dy = 8 + (i % 2) * 2; // 8–10 px
      const dur = 2 + (i % 3);    // 4–6s
      const delay = i * 0.15;

      gsap.to(el, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        duration: dur,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });
    });
  }, []);

  const positions = [
    { top: "12%", left: "10%", size: 240 },
    { top: "68%", left: "16%", size: 220 },
    { top: "22%", left: "72%", size: 190 },
    { top: "76%", left: "70%", size: 175 },
    { top: "40%", left: "6%",  size: 150 },
    { top: "34%", left: "84%", size: 150 },
  ];

  return (
    <main className="relative overflow-hidden" style={{ height: "100vh" }}>
      {/* Starfield sits at z-0 inside the page so it renders above the body bg */}
      <Starfield />

      {/* Optional faint nebula glows above stars but below content */}
      <div
        className="pointer-events-none absolute inset-0 z-5"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 20%, rgba(140,160,255,0.12), transparent 60%), radial-gradient(900px 500px at 80% 70%, rgba(130,200,255,0.10), transparent 60%)",
        }}
      />

      {/* Paintings (z-10) */}
      {positions.map((p, idx) => (
        <div
          key={idx}
          ref={(el: HTMLDivElement | null) => {
            imgRefs.current[idx] = el;
          }}
          className="absolute z-10"
          style={{ top: p.top, left: p.left }}
        >
          <Image
            src="/painting.jpeg"
            alt={`Artwork ${idx + 1}`}
            width={p.size}
            height={p.size}
            className="rounded-xl shadow-xl shadow-black/40 opacity-95"
            priority
          />
        </div>
      ))}

      {/* Title (z-20) */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1
          className="typewriter text-center leading-none"
          style={{
            fontSize: "65px",
            fontFamily: "'Libertinus Keyboard', serif",
            color: "rgb(220,230,255)",
            lineHeight: 1,
            whiteSpace: "nowrap",
            textShadow: "0 6px 30px rgba(0,0,0,0.45)",
          }}
        >
          Anika U Bhat
        </h1>
      </div>

      {/* Global: gradient bg on body, no scroll, font + typewriter */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libertinus+Keyboard&display=swap");

        html,
        body {
          height: 100%;
          margin: 0;
          overflow: hidden; /* lock scroll */
          /* Night-sky gradient on the body so canvas sits above it */
          background: linear-gradient(180deg, #0b1020 0%, #0f1b3b 60%, #0b1020 100%);
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

        @media (max-width: 1280px) { .typewriter { font-size: 84px !important; } }
        @media (max-width: 1024px) { .typewriter { font-size: 64px !important; } }
        @media (max-width: 640px)  { .typewriter { font-size: 44px !important; } }
      `}</style>
    </main>
  );
}
