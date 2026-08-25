"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const resumeData = {
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "RCM Group of Institutions",
      period: "2022 — 2026",
      highlights: [
        "Full Stack Development",
        "DevOps Practices",
        "Cloud Computing",
      ],
    },
  ],
  experience: [
    {
      role: "Full Stack Developer (Projects)",
      company: "Freelance & Academic",
      period: "2023 — Present",
      highlights: [
        "Built HireIQ — AI-powered resume screening SaaS with Next.js 16, Firebase, and Google Gemini AI",
        "Developed MediConsult — clinic management system with Flask and SQLite",
        "Created CookHub — recipe community platform with Flask and Firebase",
        "Implemented CI/CD pipelines using GitHub Actions for automated deployments",
      ],
    },
  ],
  certifications: [
    "AWS Cloud Practitioner (In Progress)",
    "Docker & Kubernetes Fundamentals",
    "Google UX Design Certificate",
  ],
  technicalSkills: {
    frontend: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    backend: ["Python", "Flask", "Node.js", "Firebase", "REST APIs"],
    devops: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Linux"],
    tools: ["Git", "VS Code", "Figma", "Postman", "MongoDB Atlas"],
  },
};

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="relative py-24 overflow-hidden">
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
              Resume
            </span>
          </div>
          <h2 className="section-heading text-foreground">
            Experience &{" "}
            <span className="text-accent-alt glow-text-alt">Education</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-sm font-(family-name:--font-geist-mono) text-accent tracking-wider uppercase mb-6 flex items-center gap-2">
                <span className="text-accent">01.</span> Experience
              </h3>
              <div className="space-y-6">
                {resumeData.experience.map((exp, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-border bg-surface/30 hover:border-accent/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {exp.role}
                        </h4>
                        <p className="text-sm text-accent-alt">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted font-(family-name:--font-geist-mono)">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="text-sm text-muted flex items-start gap-2"
                        >
                          <span className="text-accent mt-0.5 text-xs">›</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-sm font-(family-name:--font-geist-mono) text-accent tracking-wider uppercase mb-6 flex items-center gap-2">
                <span className="text-accent">02.</span> Education
              </h3>
              <div className="space-y-6">
                {resumeData.education.map((edu, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-border bg-surface/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {edu.degree}
                        </h4>
                        <p className="text-sm text-accent-alt">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-sm text-muted font-(family-name:--font-geist-mono)">
                        {edu.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {edu.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs px-2 py-1 rounded border border-border text-muted"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-sm font-(family-name:--font-geist-mono) text-accent tracking-wider mb-6 flex items-center gap-2">
                <span className="text-accent">03.</span> Technical Skills
              </h3>
              <div className="terminal-window glow-box">
                <div className="terminal-header">
                  <div className="terminal-dot bg-red-500" />
                  <div className="terminal-dot bg-yellow-500" />
                  <div className="terminal-dot bg-green-500" />
                  <span className="ml-3 text-xs text-muted font-(family-name:--font-geist-mono)">
                    skills.config
                  </span>
                </div>
                <div className="p-6 space-y-4 font-(family-name:--font-geist-mono) text-sm">
                  {Object.entries(resumeData.technicalSkills).map(
                    ([category, items]) => (
                      <div key={category}>
                        <p className="text-accent mb-2">
                          <span className="text-muted">$</span> cat {category}
                          .txt
                        </p>
                        <div className="flex flex-wrap gap-2 pl-4">
                          {items.map((item) => (
                            <span key={item} className="text-foreground">
                              {item}
                              {item !== items[items.length - 1] && (
                                <span className="text-muted"> · </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-sm font-(family-name:--font-geist-mono) text-accent tracking-wider mb-6 flex items-center gap-2">
                <span className="text-accent">04.</span> Certifications
              </h3>
              <div className="space-y-3">
                {resumeData.certifications.map((cert, i) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border bg-surface/30 hover:border-accent/20 transition-all"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <span className="text-sm text-foreground">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="block p-6 rounded-xl border border-accent/30 bg-accent/5 text-center hover:bg-accent/10 transition-all group"
            >
              <span className="text-accent font-(family-name:--font-geist-mono) text-sm">
                ↓ Download Full Resume
              </span>
              <p className="text-xs text-muted mt-1">PDF format</p>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
