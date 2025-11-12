"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Vision() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.6], [60, 0]);
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(180deg, #02010a 0%, #0b0020 100%)",
      "linear-gradient(180deg, #190031 0%, #02010a 100%)"
    ]
  );

  // 背景パーティクル生成
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    const count = 25;
    const arr = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * window.innerWidth,
      top: Math.random() * window.innerHeight,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
    }));
    setParticles(arr);
  }, []);

  return (
    <section
      id="vision"
      ref={ref}
      className="relative w-full h-[130vh] flex items-center justify-center overflow-hidden text-white"
    >
      {/* 背景グラデーション */}
      <motion.div className="absolute inset-0" style={{ background: bgGradient }} />

      {/* 背景の光粒 */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            opacity: 0.2,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* 光のライン背景（SVG） */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,300 Q400,100 800,300 T1600,300"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>

      {/* テキストコンテンツ */}
      <motion.div
        className="relative z-10 max-w-4xl text-center px-6"
        style={{ opacity: textOpacity, y: textY }}
      >
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-6 tracking-widest"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          We design the future
          <br />
          where <span className="text-cyan-400">algorithms feel</span>
          <br />
          and <span className="text-violet-400">humans create</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          Between machine perception and human emotion lies a new form of art —<br />
          one that transcends both origin and intent.
        </motion.p>
      </motion.div>
    </section>
  );
}