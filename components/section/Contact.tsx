"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* テキスト＆CTA */}
      <div className="relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-6 tracking-wide"
        >
          Let’s Create the Future
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 mb-10 text-lg"
        >
          Collaborate, imagine, and evolve with Neural Mirage.
        </motion.p>

        <motion.a
          href="mailto:contact@neuralmirage.com"
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,255,255,0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-semibold tracking-wide shadow-lg transition-all"
        >
          Get in Touch
        </motion.a>
      </div>

      {/* SNSリンク */}
      <motion.div
        className="absolute bottom-10 flex gap-6 text-white/60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <a href="#" className="hover:text-white transition">Twitter</a>
        <a href="#" className="hover:text-white transition">Instagram</a>
        <a href="#" className="hover:text-white transition">GitHub</a>
      </motion.div>
    </section>
  );
}