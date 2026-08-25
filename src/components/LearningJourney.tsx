"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const roadmap = [
  {
    phase: "Phase 1",
    title: "UI/UX Design Mastery",
    status: "completed",
    items: [
      "Figma & Design Systems",
      "User Research & Wireframing",
      "Prototyping & Interaction Design",
      "Responsive & Mobile-First Design",
      "Accessibility (WCAG 2.1)",
    ],
  },
  {
    phase: "Phase 2",
    title: "Full Stack Development",
    status: "completed",
    items: [
      "React & Next.js 16",
      "TypeScript & Modern JS",
      "Node.js & Python Backends",
      "Database Design (SQL & NoSQL)",
      "REST API & GraphQL",
    ],
  },
  {
    phase: "Phase 3",
    title: "DevOps Engineering",
    status: "current",
    items: [
      "Docker & Containerization",
      "Kubernetes Orchestration",
      "CI/CD Pipelines (GitHub Actions)",
      "AWS Cloud Services",
      "Infrastructure as Code (Terraform)",
    ],
  },
  {
    phase: "Phase 4",
    title: "Advanced DevOps & SRE",
    status: "upcoming",
    items: [
      "Monitoring & Observability",
      "Site Reliability Engineering",
      "Security & Compliance",
      "Performance Optimization",
      "Chaos Engineering",
    ],
  },
];

export default function LearningJourney() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="relative pt-6 pb-24 overflow-hidden">
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
              Learning Path
            </span>
          </div>
          <h2 className="section-heading text-foreground">
            My{" "}
            <span
              className="text-neon-green"
              style={{ textShadow: "0 0 10px #4ade8044, 0 0 20px #4ade8022" }}
            >
              Learning Journey
            </span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl">
            A structured roadmap from UI/UX design through full stack
            development to DevOps engineering.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-accent via-accent-alt to-neon-green opacity-30" />

          <div className="space-y-16">
            {roadmap.map((phase, i) => {
              const isLeft = i % 2 === 0;
              const statusColor =
                phase.status === "completed"
                  ? "border-neon-green/50 bg-neon-green/5"
                  : phase.status === "current"
                    ? "border-accent/50 bg-accent/5 glow-box"
                    : "border-border bg-surface/30";

              const dotColor =
                phase.status === "completed"
                  ? "bg-neon-green"
                  : phase.status === "current"
                    ? "bg-accent animate-pulse-glow"
                    : "bg-muted";

              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className={`relative flex ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:items-center`}
                >
                  <div
                    className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${dotColor} border-2 border-background z-10`}
                  />

                  <div
                    className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"} pl-16 md:pl-0`}
                  >
                    <div
                      className={`p-6 rounded-xl border ${statusColor} transition-all`}
                    >
                      <div
                        className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}
                      >
                        <span className="text-xs font-(family-name:--font-geist-mono) text-accent tracking-wider">
                          {phase.phase}
                        </span>
                        {phase.status === "completed" && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-neon-green/20 text-neon-green">
                            ✓ Done
                          </span>
                        )}
                        {phase.status === "current" && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                            ● In Progress
                          </span>
                        )}
                        {phase.status === "upcoming" && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted/20 text-muted">
                            ○ Upcoming
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {phase.title}
                      </h3>
                      <ul
                        className={`space-y-1.5 ${isLeft ? "md:text-right" : ""}`}
                      >
                        {phase.items.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-muted flex items-center gap-2"
                          >
                            {isLeft && (
                              <span className="hidden md:inline flex-1" />
                            )}
                            <span className="text-accent/60 text-xs">›</span>
                            {item}
                            {!isLeft && (
                              <span className="hidden md:inline flex-1" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
