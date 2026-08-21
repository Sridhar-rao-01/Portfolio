<div align="center">

# `<HACKBITS />`

### Creative Full-Stack Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-184-000000?style=for-the-badge&logo=three.js)](https://threejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion)

A cyberpunk-themed developer portfolio featuring interactive terminal interfaces, physics-based 3D elements, and immersive animations. Built to showcase the journey of **S Sridhar Rao** from full-stack development to DevOps engineering.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-brightgreen?style=for-the-badge)](https://hackbits.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sridhar-rao)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/hackbits)

</div>

---

## Features

| Feature | Description |
|---------|-------------|
| **3D Physics ID Card** | Interactive hanging ID card with realistic rope physics — grab, pull, and swing it using `@react-three/rapier` |
| **Terminal Contact** | Fully functional CLI-style contact section with typed commands (`help`, `about`, `skills`, `projects`, `social`) |
| **Typing Animations** | Dynamic text rendering for the developer name and hero tagline with configurable speed |
| **Cyberpunk Theme** | Dark aesthetic with neon cyan/purple accents, glassmorphism, scan lines, and glow effects |
| **Responsive Design** | Seamless experience across desktop, tablet, and mobile with adaptive navigation |
| **3D Skill Badges** | Floating, rotating 3D boxes representing 16+ technologies rendered in a `@react-three/fiber` canvas |

---

## Tech Stack

### Core
- **Next.js 16** — App Router, `src/` structure, server-first architecture
- **React 19** — Client components with modern hooks and rendering
- **TypeScript 5** — Strict mode, path aliases, type-safe development

### Styling
- **Tailwind CSS v4** — Utility-first CSS via PostCSS plugin
- **Custom CSS** — Animations (`pulse-glow`, `float`, `scan-line`, `typing-cursor`), glassmorphism, neon glow effects

### 3D & Animation
- **Three.js** — WebGL rendering engine
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Helpers: `Float`, `Text`, `RoundedBox`
- **@react-three/rapier** — Physics simulation for rope joints and rigid bodies
- **Framer Motion** — Page transitions, scroll animations, AnimatePresence

### Fonts
- **Geist Sans** — Primary UI font
- **Geist Mono** — Terminal and code display

---

## Getting Started

### Prerequisites

- **Node.js** 18.17+ (recommended: 20+)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/hackbits/portfolio.git

# Navigate to the project directory
cd portfolio

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, Tailwind theme, animations
│   ├── layout.tsx           # Root layout with metadata and fonts
│   ├── page.tsx             # Main page composing all sections
│   └── favicon.ico
└── components/
    ├── Navbar.tsx            # Fixed nav with glassmorphism on scroll
    ├── Hero.tsx              # Hero section with typing animation
    ├── HangingIDCard.tsx     # 3D physics-based hanging ID card
    ├── About.tsx             # Terminal-style bio with timeline
    ├── Skills.tsx            # 3D floating skill badges + categories
    ├── LearningJourney.tsx   # 4-phase roadmap visualization
    ├── Projects.tsx          # Project showcase with modal case studies
    ├── Resume.tsx            # Education, experience, certifications
    ├── Contact.tsx           # Interactive terminal contact section
    ├── Footer.tsx            # Site footer
    └── LoadingScreen.tsx     # Terminal boot-up animation
```

---

## Customization

| Element | Location | How to Modify |
|---------|----------|---------------|
| Brand name | `Navbar.tsx`, `HangingIDCard.tsx` | Edit text between `<HACKBITS />` tags |
| Color palette | `globals.css` | Update CSS variables (`--cyan`, `--purple`, `--neon-green`) |
| Skills | `Skills.tsx` | Add/remove items in the `skills` object |
| Projects | `Projects.tsx` | Edit the `projects` array with your data |
| Terminal commands | `Contact.tsx` | Modify `handleCommand` switch cases |
| Boot messages | `LoadingScreen.tsx` | Edit the `bootMessages` array |

---

## Contact

| Platform | Link |
|----------|------|
| GitHub | [github.com/hackbits](https://github.com/hackbits) |
| LinkedIn | [linkedin.com/in/sridhar-rao](https://linkedin.com/in/sridhar-rao) |
| Twitter | [twitter.com/hackbits](https://twitter.com/hackbits) |
| Email | sridhar@hackbits.dev |

---

## License

© 2026 S Sridhar Rao. **All Rights Reserved.**

This project and its contents are proprietary. Unauthorized reproduction, distribution, or modification is strictly prohibited without explicit written permission.
