"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import GalleryModal from "./GalleryModal";

interface GalleryItemProps {
  src: string;
  title: string;
  description: string;
}

export default function GalleryItem({ src, title, description }: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="relative w-full md:w-[45vw] h-[50vh] md:h-[55vh] shrink-0 cursor-pointer overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />

        {/* ホバーでフェードインする説明テキスト */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center p-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm max-w-md leading-relaxed">{description}</p>
        </motion.div>
      </div>

      {/* モーダル */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <GalleryModal
            key="gallery-modal"
            src={src}
            title={title}
            description={description}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

