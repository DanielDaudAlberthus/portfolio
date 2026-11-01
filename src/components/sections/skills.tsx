import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Layers, Database, Terminal, type LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type SkillItem } from "@/data/portfolio"
import { usePortfolio } from "@/context/portfolio-context"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, LucideIcon> = {
  code: Code,
  layers: Layers,
  database: Database,
  terminal: Terminal,
}

// Devicon slug mapping
const deviconSlug: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  PHP: "php",
  Python: "python",
  Go: "go",
  "Express.js": "express",
  NestJS: "nestjs",
  Laravel: "laravel",
  FastAPI: "fastapi",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Redis: "redis",
  Docker: "docker",
  Git: "git",
  Linux: "linux",
  Nginx: "nginx",
  AWS: "amazonwebservices",
}

const levelColor: Record<string, string> = {
  Expert: "bg-[var(--primary)] text-white",
  Advanced: "bg-[var(--primary)]/20 text-[var(--primary)]",
  Intermediate: "bg-muted text-muted-foreground",
}

const levelBar: Record<string, number> = {
  Expert: 95,
  Advanced: 75,
  Intermediate: 55,
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

function SkillCard({
  item,
  index,
  isInView,
}: {
  item: SkillItem
  index: number
  isInView: boolean
}) {
  const slug = deviconSlug[item.name]
  const iconUrl = slug
    ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`
    : undefined

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      className="group"
    >
      <div className="relative flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)]/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--primary)]/5">
        {/* Icon */}
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted/80 p-2 transition-colors group-hover:bg-[var(--primary)]/10">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={item.name}
              className="size-6"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
              }}
            />
          ) : (
            <Code className="size-5 text-muted-foreground" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-foreground">
              {item.name}
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                levelColor[item.level]
              )}
            >
              {item.level}
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-[var(--primary)]"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${levelBar[item.level]}%` } : { width: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.1 + 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Skills() {
  const { skills } = usePortfolio()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="text-center"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-4 py-1.5 text-xs font-medium tracking-wider uppercase"
          >
            Skills
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Tech Stack
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Teknologi dan tools yang saya gunakan untuk membangun aplikasi yang scalable dan reliable.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {skills.map((skill, catIndex) => {
            const Icon = categoryIcons[skill.icon] || Code
            return (
              <motion.div
                key={skill.category}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={catIndex + 1}
              >
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {skill.category}
                  </h3>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {skill.items.length} skills
                  </span>
                </div>

                {/* Skill items */}
                <div className="grid gap-3">
                  {skill.items.map((item, i) => (
                    <SkillCard
                      key={item.name}
                      item={item}
                      index={catIndex * 5 + i + 2}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
