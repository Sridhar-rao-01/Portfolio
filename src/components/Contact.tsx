"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const welcomeLines = [
    "HACKBITS Terminal v1.0",
    "Type 'help' to see available commands.",
    "─────────────────────────────────────",
  ];

  useEffect(() => {
    if (isInView && terminalLines.length === 0) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < welcomeLines.length) {
          setTerminalLines((prev) => [...prev, welcomeLines[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [...terminalLines, `> ${cmd}`];

    if (trimmed === "help") {
      newLines.push(
        "Available commands:",
        "  about     — Learn about S Sridhar Rao",
        "  skills    — View technical skills",
        "  projects  — List featured projects",
        "  contact   — Get contact information",
        "  social    — Show social media links",
        "  clear     — Clear the terminal",
        "  exit      — Close terminal session",
      );
    } else if (trimmed === "about") {
      newLines.push(
        "S Sridhar Rao — HACKBITS",
        "Creative Full Stack Developer → DevOps Engineer",
        "Building at the intersection of code and infrastructure.",
        "Currently focused on Docker, Kubernetes, and CI/CD pipelines.",
      );
    } else if (trimmed === "skills") {
      newLines.push(
        "Frontend: Next.js, React, TypeScript, Tailwind CSS",
        "Backend: Python, Flask, Node.js, Firebase",
        "DevOps: Docker, Kubernetes, GitHub Actions, AWS",
        "Tools: Git, VS Code, Figma, PostgreSQL, MongoDB",
      );
    } else if (trimmed === "projects") {
      newLines.push(
        "1. HireIQ — AI-Powered Resume Screening SaaS",
        "2. MediConsult — Clinic Management & Appointment SaaS",
        "3. CookHub — Recipe Finder & Cooking Community",
      );
    } else if (trimmed === "contact") {
      newLines.push(
        "Email: sridhar@hackbits.dev",
        "Location: India",
        "Status: Open to opportunities",
      );
    } else if (trimmed === "social") {
      newLines.push(
        "GitHub: github.com/hackbits",
        "LinkedIn: linkedin.com/in/sridhar-rao",
        "Twitter: @hackbits_dev",
      );
    } else if (trimmed === "clear") {
      setTerminalLines([]);
      setCurrentInput("");
      return;
    } else if (trimmed === "exit") {
      newLines.push("Session closed. Goodbye!");
      setTerminalLines(newLines);
      setCurrentInput("");
      return;
    } else if (trimmed) {
      newLines.push(
        `Command not found: ${cmd}. Type 'help' for available commands.`,
      );
    }

    setTerminalLines(newLines);
    setCurrentInput("");
  };

  return (
    <section id="contact" className="relative py-8 overflow-hidden">
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
              Get in Touch
            </span>
          </div>
          <h2 className="section-heading text-foreground">
            Contact <span className="text-accent glow-text">Terminal</span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl">
            Drop a message through the terminal or reach out directly. I&apos;m
            always open to discussing new projects and opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="terminal-window glow-box h-120 flex flex-col">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 text-xs text-muted font-(family-name:--font-geist-mono)">
                  hackbits@portfolio:~/contact
                </span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto font-(family-name:--font-geist-mono) text-sm">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`py-0.5 ${line?.startsWith?.(">") ? "text-neon-green" : "text-muted"}`}
                  >
                    {line}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-accent text-sm font-(family-name:--font-geist-mono)">
                    $
                  </span>
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isTyping) {
                        setIsTyping(true);
                        handleCommand(currentInput);
                        setTimeout(() => setIsTyping(false), 100);
                      }
                    }}
                    placeholder='Type "help" for commands'
                    className="flex-1 bg-transparent text-foreground text-sm font-(family-name:--font-geist-mono) outline-none placeholder:text-muted/50"
                    disabled={isTyping}
                  />
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-2 h-4 bg-accent"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Let&apos;s Build Something Great
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Whether you have a project in mind, want to collaborate on open
                source, or just want to say hi — my inbox is always open. I
                typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "📧",
                  label: "Email",
                  value: "sridhar@hackbits.dev",
                  href: "mailto:sridhar@hackbits.dev",
                },
                {
                  icon: "💼",
                  label: "LinkedIn",
                  value: "linkedin.com/in/sridhar-rao",
                  href: "#",
                },
                {
                  icon: "🐙",
                  label: "GitHub",
                  value: "github.com/hackbits",
                  href: "#",
                },
                {
                  icon: "🐦",
                  label: "Twitter",
                  value: "@hackbits_dev",
                  href: "#",
                },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/30 hover:border-accent/30 transition-all group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs text-muted">{item.label}</p>
                    <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                      {item.value}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-muted group-hover:text-accent transition-colors ml-auto"
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
                </motion.a>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-border bg-surface/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
                <span className="text-sm text-foreground font-medium">
                  Current Status
                </span>
              </div>
              <p className="text-sm text-muted">
                Open to full-time opportunities, freelance projects, and open
                source collaborations. Particularly interested in DevOps and
                platform engineering roles.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
