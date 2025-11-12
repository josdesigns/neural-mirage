// components/HeroSection.tsx
"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center text-white"
    >
      {/* Text content */}
      <div className="z-10 px-6">
        <motion.h1
          className="text-5xl md:text-7xl font-display tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Neural Mirage
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl mx-auto text-lg text-gray-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Exploring the edge where consciousness meets the digital void.
        </motion.p>

        <motion.button
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-3 text-sm font-medium backdrop-blur hover:bg-white/20 transition mt-10 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Enter the Realm
        </motion.button>
      </div>

      {/* small hint */}
      <div className="absolute bottom-8 z-10 text-xs text-gray-500 tracking-widest uppercase">
        Scroll to explore
      </div>
    </section>
  );
}