import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Server,
  Database,
  Cloud,
  Wrench,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { usePortfolio } from "@/context/portfolio-context"
import { useCountUp } from "@/hooks/use-count-up"

const iconMap: Record<string, LucideIcon> = {
  server: Server,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
  sparkles: Sparkles,
}

function StatItem({
  label,
  value,
  suffix,
}: {
  label: string
  value: number
  suffix?: string
}) {
  const { count, ref } = useCountUp(value, 2000)
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
        {count}
        {suffix && <span className="text-[var(--primary)]">{suffix}</span>}
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function About() {
  const { aboutData, skills } = usePortfolio()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
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
            About Me
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Get to know me
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-muted-foreground"
        >
          {aboutData.description}
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {aboutData.stats.map((stat) => (
            <StatItem
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
            />
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {aboutData.bentoItems.map((item, i) => {
            const Icon = iconMap[item.icon] || Server
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={3 + i}
                className={item.className}
              >
                <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-[var(--primary)]/5">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    {item.items && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {item.items.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Tech Stack Pills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={8}
          className="mt-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {skills.flatMap((s) => s.items).map((item) => (
              <Badge
                key={item.name}
                variant="outline"
                className="rounded-full px-3 py-1 font-mono text-xs transition-colors hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] hover:border-[var(--primary)]/30"
              >
                {item.name}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
