"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface GalleryModalProps {
  src: string;
  title: string;
  description: string;
  onClose: () => void;
}

export default function GalleryModal({
  src,
  title,
  description,
  onClose,
}: GalleryModalProps) {
  useEffect(() => {
    // ESCキーで閉じる
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // モーダル表示時にbodyのスクロールを無効化
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const modalContent = (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl bg-black/95 p-6 md:p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors"
          aria-label="閉じる"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 画像 */}
        <div className="relative w-full h-[70vh] mb-6 rounded-lg overflow-hidden">
          <Image
            src={src}
            alt={title}
            fill
            className="object-contain"
          />
        </div>

        {/* タイトルと説明 */}
        <div className="text-white">
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
          <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );

  // Portalを使ってbody直下にレンダリング
  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(modalContent, document.body);
}

