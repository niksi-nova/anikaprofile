"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Starfield from "./components/Starfield";

export default function Home() {
  const imgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const bioRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const els = imgRefs.current.filter(Boolean) as HTMLElement[];
    const titleEls = titleRefs.current.filter(Boolean) as HTMLElement[];

    const tl = gsap.timeline();

    const staggerAmount = 0.35;

    // Animate images in
    tl.fromTo(
      els,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: staggerAmount,
      }
    );

    // Animate title letters one by one
    tl.fromTo(
      titleEls,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
      },
      "+=0.1"
    );

    // Animate bio text
    tl.fromTo(
      bioRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
      "+=0.2"
    );

    // Floating images
    els.forEach((el, i) => {
      const dx = 6 + (i % 3) * 2;
      const dy = 6 + (i % 2) * 2;
      const dur = 4 + (i % 3);

      gsap.to(el, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        duration: dur,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.12,
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  const positions = [
    { top: "6%", left: "8.5%", size: 240 },
    { top: "37%", left: "4%", size: 180 },
    { top: "60%", left: "9%", size: 220 },
    { top: "13%", left: "30%", size: 180 },
    { top: "37%", left: "25%", size: 250 },
    { top: "70%", left: "35%", size: 160 },
  ];

  return (
    <main className="relative overflow-hidden" style={{ height: "100vh" }}>
      <Starfield />

      {/* Paintings */}
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
            className="rounded-xl shadow-xl shadow-black/40"
            priority={idx < 3}
          />
        </div>
      ))}

      {/* Title + Bio */}
      <div
        className="absolute inset-y-0 right-12 z-20 flex items-center"
        style={{ maxWidth: "45%" }}
      >
        <div className="pr-6">
          <h1
            className="text-right leading-tight flex justify-end gap-2 londrina-sketch-regular"
            style={{
              fontSize: "80px",
              color: "rgba(242, 194, 249, 1)",
              textShadow: "0 6px 30px rgba(8, 8, 8, 0.45)",
              marginBottom: "18px",
            }}
          >
            {"A  N  I  K  A  ".split("").map((letter, idx) => (
              <span
                key={idx}
                ref={(el: HTMLSpanElement | null) => {
                  titleRefs.current[idx] = el;
                }}
                style={{ opacity: 0, display: "inline-block"}}
              >
                {letter}
              </span>
            ))}
          </h1>

          <p
            ref={bioRef}
            className="bio text-right"
            style={{
              fontFamily: "'The Girl Next Door', 'Libertinus Keyboard', serif",
              fontSize: "20px",
              color: "rgba(187, 207, 238, 0.95)",
              lineHeight: 1.5,
              textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              opacity: 0,
            }}
          >
            Hi! I am Anika blah blah blah blah blah blah blah Follow{" "}
            <a
              href="https://instagram.com/anika_ub"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "rgb(220,240,255)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              @anika_ub
            </a>{" "}
            on Instagram for more!
          </p>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Londrina+Sketch&family=The+Girl+Next+Door&display=swap");

        html,
        body {
          height: 100%;
          margin: 0;
          overflow: hidden;
          background: linear-gradient(180deg, #0b1020 0%, #0f1b3b 60%, #0b1020 100%);
        }

        .londrina-sketch-regular {
          font-family: "Londrina Sketch", sans-serif;
          font-weight: 400;
          font-style: normal;
        }
      `}</style>
    </main>
  );
}
