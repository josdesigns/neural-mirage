"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import artworks from "@/data/artworks.json";
import GalleryItem from "./gallery/GalleryItem";
import SectionTitle from "./SectionTitle";

gsap.registerPlugin(ScrollTrigger);

async function waitForImages(container: HTMLElement) {
  const imgs = Array.from(container.querySelectorAll("img"));
  if (imgs.length === 0) return;

  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          const el = img as HTMLImageElement;
          if (el.complete) return resolve();
          el.addEventListener("load", () => resolve(), { once: true });
          el.addEventListener("error", () => resolve(), { once: true });
        })
    )
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // モバイルは横スクロールなし
    if (window.innerWidth < 768) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    let st: ScrollTrigger | null = null;
    let tween: gsap.core.Tween | null = null;

    (async () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      if (!section || !container) return;

      container.style.display = "flex";
      container.style.flexWrap = "nowrap";

      await new Promise((r) => requestAnimationFrame(r));

      await waitForImages(container);

      await new Promise((r) => requestAnimationFrame(r));

      const totalScroll = container.scrollWidth - section.clientWidth;
      if (totalScroll <= 0) return;

      tween = gsap.to(container, {
        x: -totalScroll,
        ease: "none",
        paused: true,
      });

      st = ScrollTrigger.create({
        animation: tween,
        trigger: section,
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      });

      setTimeout(() => ScrollTrigger.refresh(), 50);
    })();

    return () => {
      st?.kill();
      tween?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full md:h-screen min-h-screen"
    >
      <SectionTitle title="GALLERY" isFixed={true} className="hidden md:block" />

      {/* PC: 横スクロール */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="flex space-x-8 px-20 relative z-10 mt-40"
        >
          {artworks.map((art) => (
            <GalleryItem
              key={art.id}
              src={art.src}
              title={art.title}
              description={art.description}
            />
          ))}
        </div>
      </div>

      {/* SP: 縦スクロール */}
      <div className="md:hidden relative z-10 w-full py-20">
        <SectionTitle title="GALLERY" isFixed={false} className="mb-12 px-6" />
        <div className="flex flex-col space-y-12 px-6 w-full">
          {artworks.map((art) => (
            <GalleryItem
              key={art.id}
              src={art.src}
              title={art.title}
              description={art.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}