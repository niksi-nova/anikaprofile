// src/app/gallery/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Starfield from "../components/Starfield";
import { images } from "./data";

/**
 * Gallery page
 * - Starfield background (same as home)
 * - 3-column responsive masonry (CSS columns)
 * - Images lazy-loaded and animate into view as user scrolls (IntersectionObserver)
 * - Heading uses Londrina Sketch font and light-pink color to match "ANIKA"
 */

export default function GalleryPage() {
  const imgRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const els = imgRefs.current.filter(Boolean) as HTMLElement[];

    if (!("IntersectionObserver" in window)) {
      // If IntersectionObserver not supported, reveal all
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("in-view");
            // Optionally unobserve so animation happens once
            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -80px 0px", // trigger a bit before fully in view
        threshold: 0.08,
      }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b1020]">
      {/* Starfield background (keeps same sensation as home) */}
      <Starfield />

      <div className="relative z-10 px-6 pt-12 pb-20 md:px-12 lg:px-20">
        {/* Heading */}
        <h1
          className="londrina-sketch-regular text-center mb-10"
          style={{
            fontSize: "72px",
            color: "rgba(242, 194, 249, 1)",
            textShadow: "0 6px 30px rgba(8, 8, 8, 0.45)",
            lineHeight: 1,
          }}
        >
          Gallery
        </h1>

        {/* Masonry Grid using CSS columns for pinterest-style layout */}
        <div
          className="gallery-columns"
          style={{
            // small vertical gap between items is handled by margin on .card
            columnGap: "24px",
          }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              ref={(el) => (imgRefs.current[idx] = el)}
              className="card break-inside-avoid rounded-xl overflow-hidden shadow-xl shadow-black/40"
              style={{
                marginBottom: "24px",
                transform: "translateY(20px)",
                opacity: 0,
                transition: "transform 700ms cubic-bezier(.2,.9,.2,1), opacity 700ms ease",
              }}
            >
              {/* Next/Image: lazy loading + good size; object-cover keeps similar cropping like pinterest */}
              <Image
                src={src}
                alt={`Artwork ${idx + 1}`}
                width={800}
                height={1000}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                loading="lazy"
                className="gallery-img"
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* font */
        @import url("https://fonts.googleapis.com/css2?family=Londrina+Sketch&family=The+Girl+Next+Door&family=Libertinus+Keyboard&display=swap");

        html,
        body {
          height: 100%;
          margin: 0;
          background: linear-gradient(
            180deg,
            #0b1020 0%,
            #0f1b3b 60%,
            #0b1020 100%
          );
        }

        .londrina-sketch-regular {
          font-family: "Londrina Sketch", sans-serif;
        }

        /*
         * Responsive CLM (columns) approach — Pinterest-like masonry
         * - 1 column on very small
         * - 2 columns on medium
         * - 3 columns on large and up
         */
        .gallery-columns {
          /* Use CSS columns for masonry effect */
          columns: 1;
        }
        @media (min-width: 640px) {
          .gallery-columns {
            columns: 2;
          }
        }
        @media (min-width: 1024px) {
          .gallery-columns {
            columns: 3;
          }
        }

        /* ensure each card does not break across columns, and hides overflow nicely */
        .card {
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          -moz-column-break-inside: avoid;
          width: 100%;
          box-sizing: border-box;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius: 12px;
          overflow: hidden;
        }

        /* Image hover zoom */
        .gallery-img {
          transition: transform 350ms ease;
        }
        .card:hover .gallery-img {
          transform: scale(1.03);
        }

        /* Reveal animation when scroll into view */
        .card.in-view {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }

        /* small nice card shadow */
        .card {
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
        }

        /* improve scroll feel: show smooth scrolling on modern browsers */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}
