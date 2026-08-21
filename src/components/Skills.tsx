"use client";

import { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

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

function FloatingSkill({
  name,
  color,
  position,
}: {
  name: string;
  color: string;
  position: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={meshRef} position={position}>
        <mesh>
          <boxGeometry args={[1.2, 0.6, 0.08]} />
          <meshStandardMaterial
            color="#0a0f1a"
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.22, 0.62, 0.01]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.15}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
}

function SkillsScene() {
  const positions: [number, number, number][] = [
    [-2.5, 1.5, 0],
    [-0.8, 1.8, 0.5],
    [0.9, 1.4, -0.3],
    [2.5, 1.7, 0.2],
    [-2.2, 0.3, 0.3],
    [-0.5, 0.6, -0.2],
    [1.2, 0.4, 0.4],
    [2.8, 0.2, -0.1],
    [-2.0, -1.0, -0.2],
    [-0.3, -0.8, 0.3],
    [1.5, -1.2, 0.1],
    [2.6, -0.9, -0.3],
    [-1.8, -2.2, 0.1],
    [0.2, -2.0, -0.2],
    [1.8, -2.4, 0.3],
    [3.0, -2.1, 0],
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00f0ff" />
      <pointLight position={[-5, 3, 5]} intensity={0.4} color="#a855f7" />
      {skills.map((skill, i) => (
        <FloatingSkill
          key={skill.name}
          name={skill.name}
          color={skill.color}
          position={positions[i]}
        />
      ))}
    </>
  );
}

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
    <section id="skills" className="relative pt-12 pb-32 overflow-hidden">
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-112.5 rounded-2xl border border-border overflow-hidden bg-surface/30"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-accent font-(family-name:--font-geist-mono) text-sm animate-pulse-glow">
                    Loading 3D Skills...
                  </div>
                </div>
              }
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <SkillsScene />
              </Canvas>
            </Suspense>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
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
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-lg border border-border bg-surface/50 hover:border-accent/30 transition-all cursor-default"
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
