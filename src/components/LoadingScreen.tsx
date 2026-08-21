"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "HACKBITS OS v3.2.1 — Kernel initialized", delay: 0 },
  { text: "[ OK ] Loading modules: react@19, next@16, three@0.184", delay: 200 },
  { text: "[ OK ] Mounting virtual filesystem: /dev/portfolio", delay: 400 },
  { text: "[ OK ] Starting network services: hackbits.dev", delay: 600 },
  { text: "[ OK ] Compiling shader programs: glsl ready", delay: 800 },
  { text: "[ OK ] Initializing 3D render pipeline", delay: 1000 },
  { text: "[ OK ] Loading user profile: S Sridhar Rao", delay: 1200 },
  { text: "[ OK ] Calibrating UI/UX sensors", delay: 1400 },
  { text: "[ OK ] Engaging DevOps automation layer", delay: 1600 },
  { text: "[ OK ] All systems operational — welcome", delay: 1800 },
];

export default function LoadingScreen() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
        setProgress(((i + 1) / bootLines.length) * 100);
      }, line.delay);
    });

    setTimeout(() => setIsComplete(true), 2400);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="grid-bg absolute inset-0 opacity-30" />

          <div className="relative z-10 w-full max-w-2xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="text-5xl font-bold tracking-tight glow-text text-accent font-[family-name:var(--font-geist-mono)]">
                {"<HACKBITS />"}
              </h1>
              <p className="mt-2 text-sm text-muted font-[family-name:var(--font-geist-mono)]">
                Developer Operating System v3.2.1
              </p>
            </motion.div>

            <div className="terminal-window glow-box">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 text-xs text-muted font-[family-name:var(--font-geist-mono)]">
                  hackbits@portfolio:~
                </span>
              </div>

              <div className="p-5 min-h-[280px] font-[family-name:var(--font-geist-mono)] text-sm">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`py-0.5 ${
                      line.text.startsWith("[ OK ]")
                        ? "text-neon-green"
                        : "text-accent"
                    }`}
                  >
                    <span className="text-muted mr-2">{">"}</span>
                    {line.text}
                  </motion.div>
                ))}

                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-accent ml-1"
                />
              </div>

              <div className="px-5 pb-4">
                <div className="h-1.5 w-full rounded-full bg-surface-light overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-alt"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-2 text-xs text-right text-muted font-[family-name:var(--font-geist-mono)]">
                  {Math.round(progress)}% loaded
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
