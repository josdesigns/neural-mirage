"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import artworks from "@/data/artworks.json";
import GalleryItem from "./gallery/GalleryItem";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const totalScroll = container.scrollWidth - section.clientWidth;

    gsap.to(container, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${container.scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full h-screen overflow-hidden flex items-center"
    >
      <div ref={containerRef} className="flex space-x-8 px-20 relative z-10">
        {artworks.map((art) => (
          <GalleryItem
            key={art.id}
            src={art.src}
            title={art.title}
            description={art.description}
          />
        ))}
      </div>
    </section>
  );
}