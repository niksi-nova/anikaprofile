// page.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Starfield from "./components/Starfield";

export default function Home() {
  const imgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const bioRef = useRef<HTMLParagraphElement | null>(null);
  const galleryBtnRef = useRef<HTMLAnchorElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

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

    // Animate gallery button + form (fade in)
    tl.fromTo(
      [galleryBtnRef.current, formRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 },
      "-=0.3" // start overlapping slightly with bio fade
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

  // EDIT these values to move/resize images
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

      {/* Title + Bio + Gallery + Contact */}
      <div
        className="absolute inset-y-0 right-12 z-20 flex items-center"
        style={{ maxWidth: "45%" }}
      >
        {/* NOTE: changed this inner container to a right-aligned column so children line up */}
        <div className="pr-6 flex flex-col items-end" style={{ width: "100%" }}>
          {/* ANIKA animated letters */}
          <h1
            className="text-right leading-tight flex justify-end gap-2 londrina-sketch-regular"
            style={{
              fontSize: "80px",
              color: "rgba(242, 194, 249, 1)",
              textShadow: "0 6px 30px rgba(8, 8, 8, 0.45)",
              marginBottom: "18px",
            }}
          >
            {"ANIKA".split("").map((letter, idx) => (
              <span
                key={idx}
                ref={(el: HTMLSpanElement | null) => {
                  titleRefs.current[idx] = el;
                }}
                style={{ opacity: 0, display: "inline-block" }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Bio */}
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
              maxWidth: 520,
            }}
          >
            Hi! I am Anika, a 19 year old AIML Engineering student with a love
            for everything art — paintings, ballet, music and novels. I am
            currently working on my paintings for a 2026 calendar. Follow{" "}
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

          {/* Gallery button */}
          <a
            ref={galleryBtnRef}
            href="/gallery"
            className="gallery-btn"
            style={{
              display: "inline-block",
              padding: "12px 26px",
              borderRadius: 28,
              background: "linear-gradient(90deg, #f6d9ff, #e1cbff)",
              color: "#2b1738",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 8px 28px rgba(30,10,60,0.25)",
              margin: "18px 0",
              fontFamily: "'The Girl Next Door', 'Libertinus Keyboard', serif",
              opacity: 0, // start hidden for fade
              /* ensure the button hugs the right edge but its left aligns with bio's left edge */
              alignSelf: "flex-end",
              maxWidth: 200,
              textAlign: "center",
              width: "100%",
              maxWidth: 220,
            }}
          >
            View Gallery
          </a>

          {/* Contact form (FormSubmit) */}
          <form
            ref={formRef}
            action="https://formsubmit.co/anikaub20@gmail.com"
            method="POST"
            className="contact-form"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              alignItems: "center",
              maxWidth: 520,
              opacity: 0, // start hidden for fade
              width: "100%",
            }}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="/thanks" />

            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                color: "white",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                color: "white",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            <textarea
              name="message"
              placeholder="Message"
              required
              style={{
                gridColumn: "1 / -1",
                padding: 12,
                minHeight: 100,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                color: "white",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
              }}
            >
              <button
                type="submit"
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: "#3b2b60",
                  color: "white",
                  border: "none",
                  fontWeight: 600,
                }}
              >
                Send
              </button>

              <button
                type="reset"
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "transparent",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Londrina+Sketch&family=The+Girl+Next+Door&display=swap");

        html,
        body {
          height: 100%;
          margin: 0;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            #0b1020 0%,
            #0f1b3b 60%,
            #0b1020 100%
          );
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
