"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-10 left-1/2 -translate-x-1/2 z-50
                 bg-[#D8BEE5] text-[rgba(247, 226, 226, 1)]
                 rounded-full px-48 py-4 shadow-lg border border-white/10
                 flex items-center gap-8"
    >
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/gallery" className="hover:underline">Gallery</Link>
      <Link href="/about" className="hover:underline">About</Link>
      <Link href="/contact" className="hover:underline">Contact</Link>
    </nav>
  );
}
