"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Creator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // スクロールに応じて光の融合ラインをアニメーション
  const blendOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const blendScale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1.2]);

  return (
    <section
      id="creator"
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 左右2カラム */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto px-8 gap-12 text-white">
        {/* Left: Human Creator */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center items-start text-left space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-wide">
            HUMAN CREATOR
          </h2>
          <p className="text-sm uppercase tracking-widest text-white/70">
            Emotion. Vision. Imperfection.
          </p>
          <div className="relative w-full max-w-sm h-[300px] rounded-2xl overflow-hidden">
            <Image
              src="/images/creator/human.jpg"
              alt="Human Creator"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        {/* Right: AI System */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col justify-center items-end text-right space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-wide">
            AI SYSTEM
          </h2>
          <p className="text-sm uppercase tracking-widest text-white/70">
            Precision. Logic. Infinity.
          </p>
          <div className="relative w-full max-w-sm h-[300px] rounded-2xl overflow-hidden">
            <Image
              src="/images/creator/ai.jpg"
              alt="AI System"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-all duration-700"
            />
          </div>
        </motion.div>
      </div>

      {/* 中央融合ライン */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-orange-400 via-pink-500 to-purple-500 rounded-full shadow-[0_0_20px_#ff5f00]"
        style={{
          opacity: blendOpacity,
          scaleY: blendScale,
        }}
      />

      {/* 中央融合の光 */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 blur-3xl opacity-40"
        style={{ opacity: blendOpacity, scale: blendScale }}
      />
    </section>
  );
}