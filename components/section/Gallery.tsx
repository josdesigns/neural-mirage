"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import artworks from "@/data/artworks.json";
import GalleryItem from "./gallery/GalleryItem";
import SectionTitle from "./SectionTitle";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return; // モバイルは横スクロール演出をスキップ

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // レンダリング完了を待ってから計算
    const initScroll = (): ScrollTrigger | null => {
      // ScrollTriggerを一度リフレッシュして正確なサイズを取得
      ScrollTrigger.refresh();
      
      const totalScroll = container.scrollWidth - section.clientWidth;
      if (totalScroll <= 0) return null; // スクロール不要な場合はスキップ

      const scrollTween = gsap.to(container, { x: -totalScroll, ease: "none" });

      const st = ScrollTrigger.create({
        animation: scrollTween,
        trigger: section,
        start: "top top",
        end: () => `+=${container.scrollWidth}`,
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        id: "gallery-scroll",
      });

      return st;
    };

    // 少し遅延させてレンダリング完了を待つ
    let st: ScrollTrigger | null = null;
    let handleResize: (() => void) | null = null;

    const timeoutId = setTimeout(() => {
      st = initScroll();
      
      // リサイズ時の処理
      handleResize = () => {
        if (window.innerWidth < 768) {
          if (st) {
            st.kill();
            st = null;
          }
          ScrollTrigger.getAll().forEach((s) => {
            if (s.vars.id === "gallery-scroll") s.kill();
          });
          return;
        }
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }
      if (st) {
        st.kill();
      }
      ScrollTrigger.getAll().forEach((s) => {
        if (s.vars.id === "gallery-scroll") s.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full md:h-screen text-white md:items-center md:overflow-hidden pt-24 md:pt-0"
    >
      <SectionTitle title="GALLERY" isFixed={true} className="hidden md:block" />
      {/* 横スクロール構成（デスクトップ） */}
      <div
        ref={containerRef}
        className="hidden md:flex relative z-10 space-x-8 px-[10vw] mt-40"
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

      {/* 縦レイアウト（モバイル専用） */}
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