"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ProcessModal from "./process/ProcessModal";

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
    });

    gsap.to(section, {
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
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
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
      className="relative w-full h-screen overflow-hidden text-white flex items-center"
    >
      <div ref={containerRef} className="relative z-10 flex space-x-28 px-[10vw]">
        {steps.map((step) => (
          <article
            key={step.id}
            className="process-item w-[70vw] shrink-0 flex items-center gap-10 cursor-pointer"
            onClick={() => openModal(step.id)}
          >
            {/* Text */}
            <div className="flex-1">
              <h2
                className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
                style={{ color: "hsl(var(--accent-h) 100% 60%)" }}
              >
                {step.title}
              </h2>
              <p className="text-white/80 max-w-lg">{step.description}</p>
              <div className="mt-6">
                <button className="px-5 py-2 rounded-full bg-white/6 border border-white/10 text-sm text-white/90 hover:bg-white/10 transition">
                  Learn more
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
              <Image
                src={step.image}
                alt={step.title}
                width={800}
                height={500}
                className="object-cover w-full h-[400px] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
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