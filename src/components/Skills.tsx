"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "Next.js", color: "#ffffff", category: "frontend" },
  { name: "Figma", color: "#61dafb", category: "frontend" },
  { name: "TypeScript", color: "#3178c6", category: "frontend" },
  { name: "Tailwind", color: "#06b6d4", category: "frontend" },
  { name: "Node.js", color: "#339933", category: "backend" },
  { name: "Python", color: "#3776ab", category: "backend" },
  { name: "Flask", color: "#F88379", category: "backend" },
  { name: "Firebase", color: "#ffca28", category: "backend" },
  { name: "Supabase", color: "#e10098", category: "backend" },
  { name: "Docker", color: "#2496ed", category: "devops" },
  { name: "Kubernetes", color: "#326ce5", category: "devops" },
  { name: "AWS", color: "#ff9900", category: "devops" },
  { name: "Git", color: "#f05032", category: "devops" },
  { name: "PostgreSQL", color: "#4169e1", category: "database" },
  { name: "GitHub", color: "#47a248", category: "devops" },
  { name: "Redis", color: "#dc382d", category: "database" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    {
      label: "Frontend",
      color: "text-accent",
      skills: skills.filter((s) => s.category === "frontend"),
    },
    {
      label: "Backend",
      color: "text-accent-alt",
      skills: skills.filter((s) => s.category === "backend"),
    },
    {
      label: "DevOps",
      color: "text-neon-green",
      skills: skills.filter((s) => s.category === "devops"),
    },
    {
      label: "Database",
      color: "text-neon-pink",
      skills: skills.filter((s) => s.category === "database"),
    },
  ];

  return (
    <section id="skills" className="relative pt-12 pb-24 overflow-hidden">
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
              Tech Stack
            </span>
          </div>
          <h2 className="section-heading text-foreground">
            Skills &{" "}
            <span className="text-accent-alt glow-text-alt">Technologies</span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl">
            A curated arsenal of technologies I use to build, deploy, and scale
            applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 h-full w-full rounded-2xl border border-border overflow-hidden bg-surface/30"
          >
            <Image
              src="/images/Portfolio_Techstack.png"
              alt="Skills and Technologies"
              width={1200}
              height={900}
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 space-y-20"
          >
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + ci * 0.1 }}
              >
                <h3
                  className={`text-sm font-(family-name:--font-geist-mono) tracking-wider uppercase mb-3 ${cat.color}`}
                >
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {cat.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-lg border border-border bg-surface/50 hover:border-[#b045f7] hover:scale-110 transition-all cursor-default"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span className="text-sm text-foreground">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
