"use client";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SceneCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 背景ライン
    const geometry = new THREE.BufferGeometry();
    const points = [];
    for (let i = 0; i < 200; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ));
    }
    geometry.setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.4 });
    const lines = new THREE.Line(geometry, material);
    scene.add(lines);

    camera.position.z = 5;

    // セクションごとの色設定（隣接するセクション同士は反対色を使用）
    // 色相環で明確に区別できるように配置
    const sectionColors: { [key: string]: { r: number; g: number; b: number } } = {
      hero: { r: 0, g: 1, b: 1 },        // シアン（180度）- 明るい青緑
      gallery: { r: 1, g: 0.3, b: 0 },  // オレンジ/赤（0-30度）- シアンの反対色
      process: { r: 0.2, g: 1, b: 0.2 }, // ライムグリーン（120度）- オレンジの反対色
      creator: { r: 1, g: 0, b: 0.8 },  // マゼンタ/ピンク（300度）- グリーンの反対色
      vision: { r: 1, g: 0.8, b: 0 },   // イエロー（60度）- マゼンタの反対色
      contact: { r: 0.4, g: 0, b: 1 },  // ブルー（240度）- イエローの反対色
    };

    // 各セクションに入ったときに色を変更
    // セクションがDOMに存在することを確認してからScrollTriggerを作成
    const createColorTrigger = (sectionId: string, color: { r: number; g: number; b: number }) => {
      // 少し遅延させてDOMが確実に存在するようにする
      setTimeout(() => {
        const triggerElement = document.getElementById(sectionId);
        if (!triggerElement) {
          console.warn(`Section #${sectionId} not found`);
          return;
        }

        ScrollTrigger.create({
          trigger: `#${sectionId}`,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(material.color, {
              r: color.r,
              g: color.g,
              b: color.b,
              duration: 0.8,
              ease: "power2.out",
              onUpdate: () => {
                material.needsUpdate = true;
              },
            });
          },
          onEnterBack: () => {
            gsap.to(material.color, {
              r: color.r,
              g: color.g,
              b: color.b,
              duration: 0.8,
              ease: "power2.out",
              onUpdate: () => {
                material.needsUpdate = true;
              },
            });
          },
          onLeave: () => {
            // セクションを離れるときは何もしない（次のセクションの色に変わる）
          },
          onLeaveBack: () => {
            // セクションを離れるときは何もしない（前のセクションの色に変わる）
          },
        });
      }, 300);
    };

    Object.keys(sectionColors).forEach((sectionId) => {
      createColorTrigger(sectionId, sectionColors[sectionId]);
    });

    // スクロール連動設定（回転とスケールは維持）
    gsap.to(lines.rotation, {
      x: Math.PI * 2,
      scrollTrigger: {
        trigger: "#gallery",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    gsap.to(lines.scale, {
      x: 1.5, y: 1.5, z: 1.5,
      scrollTrigger: {
        trigger: "#vision",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    // 全セクションで常に表示
    gsap.set(container, { opacity: 1 });

    const animate = () => {
      requestAnimationFrame(animate);
      lines.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}