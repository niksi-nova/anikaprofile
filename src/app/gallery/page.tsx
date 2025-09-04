"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./gallery.module.scss";
import { images } from "./data";

export default function Gallery() {
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

    if (plane1.current) gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    if (plane2.current) gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` });
    if (plane3.current) gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` });

    if (Math.abs(xForce) > 0.01 || Math.abs(yForce) > 0.01) {
      rafId = requestAnimationFrame(animate);
    } else {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    xForce = e.movementX;
    yForce = e.movementY;
    if (!rafId) rafId = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main onMouseMove={handleMouseMove} className={styles.main}>
      {/* Plane 1 - even indexes */}
      <div ref={plane1} className={styles.plane}>
        {images.filter((_, idx) => idx % 2 === 0).map((img, idx) => (
          <Image key={idx} src={img} alt={`Artwork even ${idx}`} width={200} height={200} className="m-6" />
        ))}
      </div>

      {/* Plane 2 - odd indexes */}
      <div ref={plane2} className={styles.plane}>
        {images.filter((_, idx) => idx % 2 !== 0).map((img, idx) => (
          <Image key={idx} src={img} alt={`Artwork odd ${idx}`} width={150} height={150} className="m-6" />
        ))}
      </div>

      {/* Plane 3 - all images but smaller */}
      <div ref={plane3} className={styles.plane}>
        {images.map((img, idx) => (
          <Image key={idx} src={img} alt={`Artwork small ${idx}`} width={100} height={100} className="m-6" />
        ))}
      </div>
    </main>
  );
}
