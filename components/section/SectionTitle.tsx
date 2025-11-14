"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SectionTitleProps {
  title: string;
  isFixed?: boolean;
  className?: string;
}

export default function SectionTitle({ title, isFixed = false, className = "" }: SectionTitleProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // 固定表示が必要な場合でも、モバイルでは固定表示しない
  const shouldBeFixed = isFixed && isDesktop && mounted;

  const baseClasses = "text-4xl md:text-6xl font-bold tracking-wider z-20 relative";
  const fixedClasses = shouldBeFixed
    ? "fixed top-25 left-10 right-0 w-full px-8 md:px-12 pointer-events-none"
    : "relative text-center md:text-left";

  return (
    <motion.h2
      className={`${baseClasses} ${fixedClasses} ${className}`}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <span className="relative inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {title}
        {/* アンダーライン装飾 */}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-60"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        />
        {/* グロー効果 */}
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10 pointer-events-none" />
        {/* シャドウ効果 */}
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-500/10 blur-2xl -z-10 pointer-events-none" />
      </span>
    </motion.h2>
  );
}

