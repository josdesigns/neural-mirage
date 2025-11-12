"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProcessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  details: string;
  image?: string;
}

export default function ProcessModal({
  open,
  onClose,
  title,
  description,
  details,
  image,
}: ProcessModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 背景の暗転 */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* モーダル本体 */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="relative w-full max-w-5xl bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* 閉じるボタン */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition"
              >
                ✕
              </button>

              {/* 画像部分 */}
              {image && (
                <div className="relative w-full h-[50vh]">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white z-10">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
                    <p className="text-white/80 mt-2 max-w-xl">{description}</p>
                  </div>
                </div>
              )}

              {/* テキスト部分 */}
              <div className="p-8 md:p-12 text-white">
                <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                  {details}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}