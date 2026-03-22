import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { MinimalistHero } from "@/components/ui/minimalist-hero"
import { personalInfo, navLinks } from "@/data/portfolio"

export function Hero() {
  const nameParts = personalInfo.name.split(" ")
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(" ") || personalInfo.role

  const heroNavLinks = navLinks.map((link) => ({
    label: link.label.toUpperCase(),
    href: link.href,
  }))

  const socialLinks = [
    { icon: Github, href: personalInfo.github },
    { icon: Linkedin, href: personalInfo.linkedin },
    { icon: Mail, href: `mailto:${personalInfo.email}` },
    { icon: Twitter, href: "#" },
  ]

  return (
    <section id="home">
      <MinimalistHero
        logoText={personalInfo.logoText}
        navLinks={heroNavLinks}
        mainText={personalInfo.tagline}
        readMoreLink="#about"
        imageSrc={personalInfo.profileImage}
        imageAlt={`Portrait of ${personalInfo.name}`}
        overlayText={{
          part1: firstName,
          part2: `${lastName}.`,
        }}
        socialLinks={socialLinks}
        locationText={personalInfo.location}
      />
    </section>
  )
}
