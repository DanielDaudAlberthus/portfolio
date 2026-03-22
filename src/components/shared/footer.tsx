import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { personalInfo, navLinks } from "@/data/portfolio"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <a
              href="#home"
              className="flex items-center gap-2 font-bold text-lg tracking-tight"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--primary)] text-white text-sm font-bold">
                {personalInfo.name.charAt(0) === "["
                  ? "P"
                  : personalInfo.name.charAt(0)}
              </span>
              Portfolio
            </a>
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Github className="size-5" />
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Linkedin className="size-5" />
              </a>
            )}
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Mail className="size-5" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-2 border-t pt-6 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            Built with <Heart className="size-3.5 fill-red-500 text-red-500" />{" "}
            using React & Tailwind CSS
          </p>
          <p>&copy; {currentYear} {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
