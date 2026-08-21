"use client";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <a
              href="#"
              className="text-lg font-bold font-[family-name:var(--font-geist-mono)] text-accent glow-text tracking-wider"
            >
              {"<HACKBITS />"}
            </a>
            <p className="text-sm text-muted mt-2">
              Building at the intersection of code and infrastructure.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-[family-name:var(--font-geist-mono)]">
            <span className="text-accent">$</span> echo &quot;Built with Next.js 16, Tailwind CSS, Framer Motion, Three.js&quot;
          </p>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} S Sridhar Rao. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
