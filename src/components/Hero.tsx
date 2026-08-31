"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HangingIDCard from "./HangingIDCard";

function CodeBackground() {
  const lines = [
    "const developer = {",
    '  name: "S Sridhar Rao",',
    '  alias: "HACKBITS",',
    '  role: "Full Stack Dev",',
    '  mission: "DevOps",',
    "  stack: [",
    '    "Next.js", "React", "TypeScript",',
    '    "Python", "Docker", "K8s",',
    '    "Firebase", "AWS",',
    "  ],",
    "  status: ' Building the future',",
    "};",
    "",
    "export default developer;",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full font-(family-name:--font-geist-mono) text-[10px] leading-relaxed text-accent/40 p-8">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function TypingAnimation() {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const fullText = "S Sridhar Rao";

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullText]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse-glow text-accent">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      id="hero"
    >
      <div className="grid-bg absolute inset-0" />
      <CodeBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-2 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.6, duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse-glow" />
              <span className="text-sm text-accent font-semibold font-(family-name:--font-geist-mono)">
                Available for opportunities
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4">
              <span className="text-foreground">
                <TypingAnimation />
              </span>
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-base sm:text-xl md:text-2xl text-accent-alt font-(family-name:--font-geist-mono) glow-text-alt">
                {"{ HACKBITS }"}
              </span>
            </div>

            <p className="text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-lg">
              Creative <span className="text-accent">Web developer</span>{" "}
              transitioning into{" "}
              <span className="text-accent-alt">DevOps engineering</span>.
              Building at the intersection of code and infrastructure.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 glow-box inline-flex items-center gap-2"
              >
                View Projects
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border hover:border-accent/50 text-foreground rounded-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                <span className="text-accent">→</span> Get in Touch
              </a>
            </div>

            <div className="flex gap-8 mt-12">
              {[
                { label: "Projects", value: "3+" },
                { label: "Technologies", value: "15+" },
                { label: "Years Coding", value: "3+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl sm:text-2xl font-bold text-accent font-(family-name:--font-geist-mono)">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 2.8,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="h-80 sm:h-100 lg:h-125 w-full"
          >
            <HangingIDCard />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pt-4"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors"
        >
          <span className="text-xs font-(family-name:--font-geist-mono)">
            scroll down
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
