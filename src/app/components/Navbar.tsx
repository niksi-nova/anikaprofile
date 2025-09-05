"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        bg-[#D8BEE5] text-[#3A1F4F]
        rounded-full px-6 sm:px-20 py-3 shadow-lg border border-white/10
        flex items-center gap-16 font-bold text-xl
      "
      aria-label="Main navigation"
      style={{
        // Use the font loaded in layout.tsx
        fontFamily: "'The Girl Next Door', 'Libertinus Keyboard', system-ui, sans-serif",
      }}
    >
      <Link href="/" className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded">
        Home
      </Link>

      <Link href="/gallery" className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded">
        Gallery
      </Link>

      <Link href="/about" className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded">
        About
      </Link>

      <Link href="/contact" className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded">
        Contact
      </Link>
    </nav>
  );
}
