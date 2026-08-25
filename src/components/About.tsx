"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "Early Life",
    title: "The Spark",
    desc: "Discovered programming and fell in love with building things from scratch. Started with HTML, CSS, and JavaScript — the foundations that would shape everything.",
  },
  {
    year: "2024",
    title: "Web Development Immersion",
    desc: "Dove deep into React, Next.js, and Python. Built multiple projects from scratch, learning the full development lifecycle.",
  },
  {
    year: "2025",
    title: "Building Products",
    desc: "Created HireIQ (AI-powered recruitment), MediConsult (clinic management), and CookHub (cooking community). Real products solving real problems.",
  },
  {
    year: "2026",
    title: "The DevOps Pivot",
    desc: "Started learning Docker, Kubernetes, CI/CD pipelines, and cloud infrastructure. Realizing that great code needs great deployment.",
  },
  {
    year: "2027",
    title: "Full Stack + DevOps",
    desc: "Merging development skills with operations expertise. Building end-to-end solutions — from writing code to deploying and monitoring it in production.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative pt-12 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-15 bg-accent/40" />
            <span className="text-xs text-accent font-(family-name:--font-geist-mono) tracking-widest uppercase">
              About Me
            </span>
          </div>
          <h2 className="section-heading text-foreground">
            The Story Behind{" "}
            <span className="text-accent glow-text">HACKBITS</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="terminal-window glow-box">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 text-xs text-muted font-(family-name:--font-geist-mono)">
                  about.md
                </span>
              </div>
              <div className="p-6 space-y-4 text-sm leading-relaxed font-(family-name:--font-geist-mono)">
                <p>
                  <span className="text-accent">#</span>{" "}
                  <span className="text-accent-alt">Hey there!</span> I&apos;m{" "}
                  <span className="text-foreground font-semibold">
                    S Sridhar Rao
                  </span>
                  , but online I go by{" "}
                  <span className="text-accent">HACKBITS</span>.
                </p>
                <p className="text-muted">
                  I&apos;m a creative full stack developer who believes great
                  software is built at the intersection of elegant code and
                  robust infrastructure. My journey started with building web
                  applications, but I quickly realized that writing code is only
                  half the battle — deploying, monitoring, and scaling it is
                  where the real magic happens.
                </p>
                <p className="text-muted">
                  That&apos;s why I&apos;m transitioning into{" "}
                  <span className="text-accent-alt">DevOps engineering</span> —
                  bridging the gap between development and operations, so I can
                  build end-to-end solutions that don&apos;t just work, but{" "}
                  <span className="text-neon-green">
                    ship fast and scale reliably
                  </span>
                  .
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-muted">
                    <span className="text-accent">$</span> When I&apos;m not
                    coding, you&apos;ll find me exploring new technologies,
                    contributing to open source, or diving deep into system
                    architecture diagrams.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "🎓", label: "Education", value: "BCA" },
                { icon: "📍", label: "Location", value: "India" },
                {
                  icon: "💼",
                  label: "Focus",
                  value: "Web Development + DevOps",
                },
                { icon: "🚀", label: "Status", value: "Open to Work" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl border border-border bg-surface/50 hover:border-accent/30 transition-all"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-xs text-muted mt-2">{item.label}</p>
                  <p className="text-sm text-foreground font-medium mt-1">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute left-4 top-0 bottom-0 w-px bg-linear-to-b from-accent via-accent-alt to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background glow-box" />
                  <span className="text-xs text-accent font-(family-name:--font-geist-mono) tracking-wider">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
