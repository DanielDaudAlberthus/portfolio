import { Github, Linkedin, Mail } from "lucide-react"
import { usePortfolio } from "@/context/portfolio-context"

export function Footer() {
  const { personalInfo } = usePortfolio()

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ]

  return (
    <footer className="border-t border-border/50 py-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {personalInfo.logoText}
        </p>
        <div className="flex items-center gap-1">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-[var(--primary)]"
            >
              <link.icon className="size-3.5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
