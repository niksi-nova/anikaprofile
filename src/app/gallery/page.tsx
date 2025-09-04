"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Gallery() {
  // Demo images (repeat the same one)
  const images = Array.from({ length: 32 }, () => "/painting.jpeg");

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // All tiles
    const tiles = Array.from(
      container.querySelectorAll<HTMLElement>(".parallax-tile")
    );

    // Give each tile a small random speed for parallax
    tiles.forEach((tile) => {
      const speed = Math.random() * 0.6 + 0.2; // 0.2–0.8
      tile.setAttribute("data-speed", String(speed));
    });

    // Fade-in when visible
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("visible");
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    tiles.forEach((t) => io.observe(t));

    // Parallax on scroll (rAF)
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vhHalf = window.innerHeight / 2;
          tiles.forEach((tile) => {
            const inner = tile.querySelector<HTMLElement>(".parallax-inner");
            if (!inner) return;
            const rect = tile.getBoundingClientRect();
            // distance of tile's center from viewport center
            const offset = rect.top + rect.height / 2 - vhHalf;
            const speed = parseFloat(tile.getAttribute("data-speed") || "0.4");
            inner.style.transform = `translateY(${offset * speed * 0.15}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll(); // initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "rgb(245, 218, 223)" }}
    >
      {/* spacer so your floating navbar doesn't cover first row */}
      <div style={{ height: "6rem" }} />

      {/* Masonry: CSS columns + avoid column breaks per tile */}
      <section
        ref={containerRef}
        className="
          columns-1
          sm:columns-2
          md:columns-3
          lg:columns-4
          gap-6 px-6 pb-24
        "
      >
        {images.map((src, idx) => (
          <article
            key={idx}
            className="
              parallax-tile
              mb-6 break-inside-avoid
              tile
              hover:-translate-y-1 transition-transform duration-300
            "
          >
            <div className="parallax-inner">
              <Image
                src={src}
                alt={`Artwork ${idx + 1}`}
                width={1000}
                height={800}
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       25vw"
                className="w-full h-auto rounded-xl shadow-xl"
                priority={idx < 8}
              />
            </div>
          </article>
        ))}
      </section>

      {/* Small CSS block: fade-in + smooth scroll */}
      <style jsx>{`
        .tile {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .tile.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}
