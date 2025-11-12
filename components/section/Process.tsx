"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessModal from "./process/ProcessModal";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "01. Discovery",
    description:
      "We dive deep into understanding your vision, audience, and goals — turning abstract ideas into strategic blueprints.",
    details:
      "Workshops, research, competitor analysis, and moodboarding. We extract the heart of your idea.",
    image: "/images/process/discovery.jpg",
  },
  {
    id: 2,
    title: "02. Design",
    description:
      "From concept to interface, our design team crafts visuals that resonate, captivate, and communicate your essence.",
    details:
      "Wireframes, high-fidelity mockups, motion direction, and visual language creation tailored to the project.",
    image: "/images/process/design.jpg",
  },
  {
    id: 3,
    title: "03. Development",
    description:
      "We engineer seamless, high-performance experiences powered by modern frameworks and interactive motion.",
    details:
      "Component-driven architecture, accessibility checks, performance tuning, and deployment workflows.",
    image: "/images/process/development.jpg",
  },
  {
    id: 4,
    title: "04. Evolution",
    description:
      "We iterate, analyze, and enhance — ensuring your digital presence grows with every interaction and insight.",
    details:
      "A/B testing, analytics, iterative UI/UX updates, and long-term roadmap planning.",
    image: "/images/process/evolution.jpg",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [modalState, setModalState] = useState<{ open: boolean; step?: number }>({ open: false });

  useEffect(() => {
    if (window.innerWidth < 768) return; // ← モバイルは横スクロール演出をスキップ

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    section.style.setProperty("--accent-h", "190");

    const totalScroll = container.scrollWidth - section.clientWidth;
    const scrollTween = gsap.to(container, { x: -totalScroll, ease: "none" });

    const st = ScrollTrigger.create({
      animation: scrollTween,
      trigger: section,
      start: "top top",
      end: () => `+=${container.scrollWidth}`,
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      id: "process-scroll",
    });

    gsap.to(section, {
      // accent hue animation
      "--accent-h": 280,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${container.scrollWidth}`,
        scrub: 0.8,
      },
    });

    const items = container.querySelectorAll<HTMLElement>(".process-item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            containerAnimation: scrollTween,
            start: "left center",
            end: "right center",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  const openModal = (i: number) => setModalState({ open: true, step: i });
  const closeModal = () => setModalState({ open: false, step: undefined });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full md:h-screen text-white flex md:items-center md:overflow-hidden"
    >
      {/* ✅ 横スクロール構成（デスクトップ） */}
      <div
        ref={containerRef}
        className="hidden md:flex relative z-10 space-x-28 px-[10vw]"
      >
        {steps.map((step) => (
          <article
            key={step.id}
            className="process-item w-[60vw] shrink-0 flex flex-col justify-center gap-6 cursor-pointer"
            onClick={() => openModal(step.id)}
          >
            <div className="relative w-full h-[40vh] rounded-xl overflow-hidden">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
              />
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6"
              style={{ color: "hsl(var(--accent-h) 100% 60%)" }}
            >
              {step.title}
            </h2>
            <p className="text-white/80 max-w-lg">{step.description}</p>
            <button className="mt-4 px-5 py-2 rounded-full bg-white/6 border border-white/10 text-sm text-white/90 hover:bg-white/10 transition">
              Learn more
            </button>
          </article>
        ))}
      </div>

      {/* ✅ 縦レイアウト（モバイル専用） */}
      <div className="md:hidden relative z-10 w-full py-20">
        <div className="flex flex-col space-y-20 px-6 w-full max-w-full">
          {steps.map((step) => (
            <article
              key={step.id}
              className="flex flex-col gap-4 cursor-pointer w-full"
              onClick={() => openModal(step.id)}
            >
              <div className="relative w-full h-[50vh] rounded-2xl overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-white mt-4">{step.title}</h2>
              <p className="text-white/80 leading-relaxed">{step.description}</p>
              <button className="self-start mt-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/90 hover:bg-white/20 transition">
                Learn more
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* モーダル */}
      <ProcessModal
        open={modalState.open}
        onClose={closeModal}
        title={modalState.step ? steps[modalState.step - 1].title : ""}
        description={modalState.step ? steps[modalState.step - 1].description : ""}
        details={modalState.step ? steps[modalState.step - 1].details : ""}
        image={modalState.step ? steps[modalState.step - 1].image : undefined}
      />
    </section>
  );
}