"use client";
import { motion } from "framer-motion";

interface CTAButtonProps {
  text: string;
  href?: string;
  variant?: "primary" | "secondary";
}

export default function CTAButton({
  text,
  href = "#",
  variant = "primary",
}: CTAButtonProps) {
  const base =
    "px-6 py-3 rounded-2xl font-semibold tracking-wide transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-indigo-500 hover:to-purple-500"
      : "border border-white text-white hover:bg-white/10";

  return (
    <motion.a
      href={href}
      className={`${base} ${styles}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.a>
  );
}