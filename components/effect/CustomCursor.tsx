"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // マウス追従
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const down = (e: MouseEvent) => {
      setIsActive(true);

      // 波紋を生成
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);

      // 一定時間後に削除
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
    };

    const up = () => setIsActive(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      {/* メインカーソル */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isActive ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="w-5 h-5 rounded-full bg-cyan-400/90 mix-blend-screen blur-[2px]" />
      </motion.div>

      {/* 外側グロー */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: position.x - 25,
          y: position.y - 25,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <div className="w-12 h-12 rounded-full bg-cyan-300/30 blur-2xl" />
      </motion.div>

      {/* 波紋エフェクト */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9997]"
            initial={{ x: ripple.x - 25, y: ripple.y - 25, scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="w-12 h-12 rounded-full border-2 border-pink-400/60 blur-sm" />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}