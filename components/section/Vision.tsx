"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./SectionTitle";

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
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
        id: "vision-scroll",
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
            if (s.vars.id === "vision-scroll") s.kill();
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
        if (s.vars.id === "vision-scroll") s.kill();
      });
    };
  }, []);


  const visionContent = [
    {
      title: "We design the future",
      subtitle: "where algorithms feel",
      highlight: "and humans create",
      description: "Between machine perception and human emotion lies a new form of art — one that transcends both origin and intent.",
    },
    {
      title: "Beyond the horizon",
      subtitle: "where consciousness meets",
      highlight: "digital creativity",
      description: "In the age where human emotion meets artificial consciousness, creativity is no longer confined.",
    },
    {
      title: "The new frontier",
      subtitle: "of imagination",
      highlight: "unleashed",
      description: "Together, we craft experiences that blend the precision of algorithms with the depth of human emotion.",
    },
  ];

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative w-full md:h-screen text-white md:items-center md:overflow-hidden pt-24 md:pt-0"
    >
      <SectionTitle title="VISION" isFixed={true} className="hidden md:block" />
      {/* 横スクロール構成（デスクトップ） */}
      <div
        ref={containerRef}
        className="hidden md:flex relative z-10 space-x-32 px-[10vw] mt-40"
      >
        {visionContent.map((content, index) => (
          <motion.div
            key={index}
            className="vision-item w-[70vw] shrink-0 flex flex-col justify-center gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-widest">
              {content.title}
              <br />
              {content.subtitle}
              <br />
              <span className="text-cyan-400">{content.highlight}</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              {content.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 縦レイアウト（モバイル専用） */}
      <div className="md:hidden relative z-10 w-full py-20">
        <SectionTitle title="VISION" isFixed={false} className="mb-12 px-6" />
        <div className="flex flex-col space-y-16 px-6 w-full">
          {visionContent.map((content, index) => (
            <motion.div
              key={index}
              className="relative z-10 max-w-4xl text-center px-6 mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl font-bold mb-6 tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
              >
                {content.title}
                <br />
                {content.subtitle}
                <br />
                <span className="text-cyan-400">{content.highlight}</span>
              </motion.h2>

              <motion.p
                className="text-base text-white/70 leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                viewport={{ once: true }}
              >
                {content.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}