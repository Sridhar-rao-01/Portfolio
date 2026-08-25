"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "hireiq",
    name: "HireIQ",
    tagline: "AI-Powered Resume Screening SaaS",
    description: "An intelligent recruitment platform that uses Google Gemini AI to automate resume screening, score candidates, and generate interview questions.",
    tech: ["Next.js 16", "Firebase", "Google Gemini AI", "Tailwind CSS"],
    color: "#00f0ff",
    icon: "🎯",
    features: [
      "AI-powered resume scoring with customizable criteria",
      "Skill gap analysis between job requirements and candidate profiles",
      "Automated interview question generation per candidate",
      "Batch resume upload with CSV/JSON support",
      "Candidate pipeline management with drag-and-drop",
      "Real-time analytics dashboard with hiring metrics",
      "Multi-user team collaboration with role-based access",
    ],
    metrics: { score: "95%", time: "80%", accuracy: "92%" },
    metricsLabels: { score: "Client Satisfaction", time: "Time Saved", accuracy: "Screening Accuracy" },
    code: `// HireIQ — AI Resume Screening
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export async function scoreResume(resume, jobDescription) {
  const model = genAI.getGenerativeModel({
    model: "gemini-pro"
  });

  const prompt = \`
    Score this resume against the job description.
    Resume: \${resume}
    Job: \${jobDescription}
    Return JSON with score, strengths, gaps.
  \`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}`,
  },
  {
    id: "mediconsult",
    name: "MediConsult",
    tagline: "Clinic Management & Appointment SaaS",
    description: "A comprehensive clinic management system that streamlines patient appointments, doctor scheduling, and medical record management.",
    tech: ["Python", "Flask", "SQLite", "HTML/CSS"],
    color: "#39ff14",
    icon: "🏥",
    features: [
      "Patient registration and profile management",
      "Doctor availability scheduling with conflict detection",
      "Online appointment booking with real-time updates",
      "Medical history and prescription management",
      "Invoice generation and payment tracking",
      "Multi-clinic support with admin dashboard",
      "Automated appointment reminders via email",
    ],
    metrics: { patients: "500+", appointments: "2000+", uptime: "99.9%" },
    metricsLabels: { patients: "Patients Managed", appointments: "Appointments", uptime: "Uptime" },
    code: `# MediConsult — Clinic Management
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///clinic.db'
db = SQLAlchemy(app)

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))
    date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), default='scheduled')

@app.route('/book', methods=['POST'])
def book_appointment():
    data = request.form
    appointment = Appointment(
        patient_id=data['patient_id'],
        doctor_id=data['doctor_id'],
        date=datetime.fromisoformat(data['date'])
    )
    db.session.add(appointment)
    db.session.commit()
    return {"status": "booked", "id": appointment.id}`,
  },
  {
    id: "cookhub",
    name: "CookHub",
    tagline: "Recipe Finder & Cooking Community",
    description: "A vibrant cooking community platform where users discover recipes, share cooking tips, and connect with fellow food enthusiasts.",
    tech: ["Python", "Flask", "Firebase", "JavaScript"],
    color: "#a855f7",
    icon: "🍳",
    features: [
      "Smart recipe search with ingredient-based filtering",
      "User-generated recipe publishing with rich text editor",
      "Cooking community with comments and ratings",
      "Meal planning and grocery list generation",
      "Nutritional information calculator",
      "Social features: follow, bookmark, share",
      "Responsive mobile-first design",
    ],
    metrics: { recipes: "1000+", users: "300+", rating: "4.8" },
    metricsLabels: { recipes: "Recipes", users: "Active Users", rating: "App Rating" },
    code: `# CookHub — Recipe Platform
from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    ingredient = request.args.get('ingredient', '')
    recipes = db.collection('recipes')

    if ingredient:
        recipes = recipes.where(
            'ingredients', 'array_contains', ingredient
        )

    results = [doc.to_dict() for doc in recipes.stream()]
    return jsonify(results)

@app.route('/api/recipes', methods=['POST'])
def create_recipe():
    data = request.json
    db.collection('recipes').add(data)
    return {"status": "created"}, 201`,
  },
];

function TerminalCard({
  project,
  onClick,
  index,
}: {
  project: (typeof projects)[0];
  onClick: () => void;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="cursor-pointer terminal-window group hover:border-accent/30 transition-all duration-300"
    >
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="ml-3 text-xs text-muted font-(family-name:--font-geist-mono)">
          ~/projects/{project.id}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-3xl">{project.icon}</span>
            <h3 className="text-xl font-bold text-foreground mt-2">{project.name}</h3>
            <p className="text-sm text-muted mt-1">{project.tagline}</p>
          </div>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            className="text-accent"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.div>
        </div>

        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded border border-border text-muted font-(family-name:--font-geist-mono)"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-accent text-xs font-(family-name:--font-geist-mono)">
          <span className="text-muted">$</span>
          <span>cat {project.id.toLowerCase()}.details</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            _
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-80 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl max-h-[85vh] overflow-y-auto terminal-window glow-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-header sticky top-0 z-10 bg-surface border-b border-border">
          <div className="terminal-dot bg-red-500" />
          <div className="terminal-dot bg-yellow-500" />
          <div className="terminal-dot bg-green-500" />
          <span className="ml-3 text-xs text-muted font-(family-name:--font-geist-mono)">
            ~/projects/{project.id}/CASE_STUDY.md
          </span>
          <button
            onClick={onClose}
            className="ml-auto text-muted hover:text-foreground transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{project.icon}</span>
            <div>
              <h3 className="text-3xl font-bold text-foreground">{project.name}</h3>
              <p className="text-muted mt-1">{project.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="p-4 rounded-lg border border-border bg-surface/50 text-center">
                <p className="text-2xl font-bold text-accent font-(family-name:--font-geist-mono)">
                  {value}
                </p>
                <p className="text-xs text-muted mt-1">
                  {project.metricsLabels[key as keyof typeof project.metricsLabels]}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-(family-name:--font-geist-mono) text-accent mb-3 tracking-wider">
              Description
            </h4>
            <p className="text-muted leading-relaxed">{project.description}</p>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-(family-name:--font-geist-mono) text-accent mb-3 tracking-wider uppercase">
              Key Features
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-neon-green mt-0.5">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-(family-name:--font-geist-mono) text-accent mb-3 tracking-wider">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-lg border border-border bg-surface/50 text-foreground font-(family-name:--font-geist-mono)"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-(family-name:--font-geist-mono) text-accent mb-3 tracking-wider">
              Code Snippet
            </h4>
            <div className="terminal-window rounded-lg overflow-hidden">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-3 text-xs text-muted font-(family-name:--font-geist-mono)">
                  {project.id}.{project.tech.includes("Python") ? "py" : "ts"}
                </span>
              </div>
              <pre className="p-4 text-xs text-muted overflow-x-auto font-(family-name:--font-geist-mono) leading-relaxed">
                <code>{project.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
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
              Portfolio
            </span>
          </div>
          <h2 className="section-heading text-foreground">
            Featured{" "}
            <span className="text-accent glow-text">Projects</span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl">
            Production-ready applications that solve real problems. Click any project to explore the case study.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <TerminalCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
