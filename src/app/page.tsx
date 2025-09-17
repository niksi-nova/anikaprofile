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
    // gather node lists
    const els = imgRefs.current.filter(Boolean) as HTMLElement[];
    const titleEls = titleRefs.current.filter(Boolean) as HTMLElement[];

    // fallback reveal helper if GSAP fails or nodes missing
    const revealFallback = () => {
      els.forEach((el) => {
        try {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        } catch {}
      });
      if (bioRef.current) {
        bioRef.current.style.opacity = "1";
        bioRef.current.style.transform = "translateY(0)";
      }
      if (galleryBtnRef.current) {
        (galleryBtnRef.current as HTMLElement).style.opacity = "1";
        (galleryBtnRef.current as HTMLElement).style.transform = "translateY(0)";
      }
      if (formRef.current) {
        (formRef.current as HTMLElement).style.opacity = "1";
        (formRef.current as HTMLElement).style.transform = "translateY(0)";
      }
    };

    // if no elements to animate, just reveal (prevents staying hidden)
    if (!els.length && (!bioRef.current && !galleryBtnRef.current && !formRef.current)) {
      revealFallback();
      return;
    }

    try {
      const tl = gsap.timeline();
      const staggerAmount = 0.35;

      // Images in
      if (els.length) {
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
      }

      // Title letters
      if (titleEls.length) {
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
      }

      // Bio text
      if (bioRef.current) {
        tl.fromTo(
          bioRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
          "+=0.2"
        );
      }

      // Gallery button + form fade
      tl.fromTo(
        [galleryBtnRef.current, formRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 },
        "-=0.3"
      );

      // Floating images (subtle infinite motion)
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
        try {
          tl.kill();
        } catch {}
      };
    } catch (err) {
      // If GSAP throws for any reason, reveal elements with fallback so UI is visible
      console.warn("GSAP animation failed, revealing elements as fallback:", err);
      revealFallback();
    }
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

  // Robust form submit: builds a real native <form method="POST" action="..."> and submits it,
  // then redirects the current page to /thanks after a short delay so the POST has time to start.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const action = formEl.action || "https://formsubmit.co/"; // fallback
    const fd = new FormData(formEl);

    // Build temporary native form to POST and submit
    const tempForm = document.createElement("form");
    tempForm.method = "POST";
    tempForm.action = action;
    tempForm.style.display = "none";
    // ensure same-origin absolute _next so FormSubmit can redirect if it wants
    const nextUrl = `${window.location.origin}/thanks`;

    // Copy form fields (and override _next to absolute)
    for (const [key, value] of fd.entries()) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      if (value instanceof File) {
        input.value = value.name;
      } else {
        input.value = String(value);
      }
      tempForm.appendChild(input);
    }
    // Ensure _next exists and is absolute
    const nextInput = document.createElement("input");
    nextInput.type = "hidden";
    nextInput.name = "_next";
    nextInput.value = nextUrl;
    tempForm.appendChild(nextInput);

    document.body.appendChild(tempForm);

    // Submit the real browser form (this performs the POST)
    tempForm.submit();

    // Redirect current page to /thanks after a short delay so POST gets sent.
    // We choose 800ms — long enough for the browser to initiate the POST but still fast UX.
    setTimeout(() => {
      window.location.href = "/thanks";
    }, 800);

    // Clean up the temp form after a little while just in case navigation doesn't happen
    setTimeout(() => {
      if (tempForm.parentNode) tempForm.parentNode.removeChild(tempForm);
    }, 4000);
  };

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
          style={{ top: p.top, left: p.left, opacity: 0, transform: "translateY(8px) scale(0.98)" }}
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
                style={{ opacity: 0, display: "inline-block", transform: "translateY(8px)" }}
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
              transform: "translateY(8px)",
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
              opacity: 0,
              alignSelf: "flex-end",
              width: "100%",
              maxWidth: 220,
              textAlign: "center",
              transform: "translateY(8px)",
            }}
          >
            View Gallery
          </a>

          {/* Contact form (FormSubmit) */}
          <form
            ref={formRef}
            action="https://formsubmit.co/anikaub20@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
            className="contact-form"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              alignItems: "center",
              maxWidth: 520,
              opacity: 0,
              width: "100%",
              transform: "translateY(8px)",
            }}
          >
            <input type="hidden" name="_captcha" value="false" />
            {/* _next is added programmatically as an absolute URL when posting */}
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
