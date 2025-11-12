"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Vision() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.6], [60, 0]);

  return (
    <section
      id="vision"
      ref={ref}
      className="relative w-full h-[130vh] flex items-center justify-center overflow-hidden text-white"
    >
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