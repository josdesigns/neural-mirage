"use client";
import { useState } from "react";
import CTAButton from "@/components/CTABtn";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/">
          <h1 className="text-xl font-bold text-white tracking-wide">
            NEURAL<span className="text-indigo-400">MIRAGE</span>
          </h1>
        </Link>

        <nav className="hidden md:flex gap-8 text-white/80 text-sm">
          <Link href="#gallery" className="hover:text-white transition">Gallery</Link>
          <Link href="#process" className="hover:text-white transition">Process</Link>
          <Link href="#creator" className="hover:text-white transition">Creator</Link>
          <Link href="#vision" className="hover:text-white transition">Vision</Link>
          <div className="hidden md:block">
            <CTAButton text="Contact" href="#contact" />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center z-50"
          aria-label="メニューを開く"
        >
          <motion.span
            className="absolute w-6 h-0.5 bg-white"
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute w-6 h-0.5 bg-white"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute w-6 h-0.5 bg-white"
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed top-0 left-0 w-full h-screen bg-black/90 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                // メニューコンテンツ自体をクリックした場合は閉じない
                if (e.target === e.currentTarget) {
                  setOpen(false);
                }
              }}
            >
              <motion.div
                className="flex flex-col justify-center items-center gap-8 text-white text-lg h-full"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Link href="#gallery" onClick={() => setOpen(false)}>Gallery</Link>
                <Link href="#process" onClick={() => setOpen(false)}>Process</Link>
                <Link href="#creator" onClick={() => setOpen(false)}>Creator</Link>
                <Link href="#vision" onClick={() => setOpen(false)}>Vision</Link>
                <CTAButton text="Contact" href="#contact" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}