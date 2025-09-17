// src/app/thanks/page.tsx
"use client";

import { useEffect } from "react";
import Starfield from "../components/Starfield"; // adjust path if your component is elsewhere
import gsap from "gsap";
import Link from "next/link";

export default function ThanksPage() {
  useEffect(() => {
    // small entrance animation for the heading
    gsap.fromTo(
      ".thanks-heading",
      { opacity: 0, y: 24, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" }
    );

    // subtle fade for the message
    gsap.fromTo(
      ".thanks-sub",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.15 }
    );
  }, []);

  return (
    <main
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* same starfield background component so the look matches home */}
      <Starfield />

      {/* center card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "36px 48px",
            borderRadius: 16,
            background: "rgba(255,255,255,0.02)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.03)",
            maxWidth: 820,
            width: "90%",
          }}
        >
          <h1
            className="thanks-heading"
            style={{
              margin: 0,
              fontSize: "84px",
              lineHeight: 1,
              color: "rgba(242,194,249,1)",
              fontFamily: '"Londrina Sketch", sans-serif',
              letterSpacing: "2px",
              textShadow: "0 8px 36px rgba(0,0,0,0.45)",
            }}
          >
            Thank You
          </h1>

          <p
            className="thanks-sub"
            style={{
              marginTop: 18,
              fontFamily: "'The Girl Next Door', 'Libertinus Keyboard', serif",
              fontSize: 20,
              color: "rgba(220,230,255,0.95)",
              lineHeight: 1.6,
            }}
          >
            Your message has been sent — I’ll get back to you as soon as I can.
            Thanks for reaching out and for supporting my art. <br />
            <Link
              href="/"
              style={{
                color: "rgb(220,240,255)",
                textDecoration: "underline",
                display: "inline-block",
                marginTop: 12,
              }}
            >
              Return home
            </Link>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Londrina+Sketch&family=The+Girl+Next+Door&family=Libertinus+Keyboard&display=swap");

        html,
        body {
          height: 100%;
          margin: 0;
          background: linear-gradient(180deg, #0b1020 0%, #0f1b3b 60%, #0b1020 100%);
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}
