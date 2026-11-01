import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Experience as ExperienceType } from "@/data/portfolio"
import { usePortfolio } from "@/context/portfolio-context"
import { cn } from "@/lib/utils"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

const slideIn = {
  hiddenLeft: { opacity: 0, x: -50 },
  hiddenRight: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function Experience() {
  const { experiences, education } = usePortfolio()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      id="experience"
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
            Experience
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Career Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Perjalanan karir saya sebagai Backend Developer, dari internship
            hingga posisi saat ini.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0
            const isCurrent = i === 0

            return (
              <motion.div
                key={exp.company + exp.period}
                variants={slideIn}
                initial={isLeft ? "hiddenLeft" : "hiddenRight"}
                animate={isInView ? "visible" : isLeft ? "hiddenLeft" : "hiddenRight"}
                custom={i + 1}
                className={cn(
                  "relative mb-12 last:mb-0",
                  "pl-12 md:pl-0",
                  "md:grid md:grid-cols-2 md:gap-10"
                )}
              >
                {/* Dot on timeline */}
                <div
                  className={cn(
                    "absolute left-4 top-1 z-10 -translate-x-1/2 md:left-1/2",
                    "flex size-8 items-center justify-center rounded-full border-2",
                    isCurrent
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30"
                      : "border-border bg-background text-muted-foreground"
                  )}
                >
                  <Briefcase className="size-3.5" />
                </div>

                {/* Card - left side on desktop */}
                <div
                  className={cn(
                    "md:text-right",
                    !isLeft && "md:col-start-2 md:text-left"
                  )}
                >
                  {isLeft ? (
                    <TimelineCard exp={exp} isCurrent={isCurrent} />
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>

                {/* Card - right side on desktop */}
                <div className={cn(isLeft && "hidden md:block")}>
                  {!isLeft ? (
                    <TimelineCard exp={exp} isCurrent={isCurrent} />
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>

                {/* Mobile: always show card (handled by pl-12) */}
                {/* The first visible div in mobile handles it via the isLeft logic + pl-12 on parent */}
              </motion.div>
            )
          })}
        </div>

        {/* Education separator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={experiences.length + 1}
          className="relative mt-20 mb-16 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <GraduationCap className="size-4" />
            Education
          </div>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Education */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {education.map((edu, i) => (
            <motion.div
              key={edu.institution + edu.period}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={experiences.length + 2 + i}
              className="relative mb-8 last:mb-0 pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10"
            >
              {/* Dot */}
              <div className="absolute left-4 top-1 z-10 -translate-x-1/2 md:left-1/2 flex size-8 items-center justify-center rounded-full border-2 border-border bg-background text-muted-foreground">
                <GraduationCap className="size-3.5" />
              </div>

              {/* Spacer for left column on desktop */}
              <div className="hidden md:block" />

              {/* Card - right side */}
              <div className="md:text-left">
                <div className="rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-[var(--primary)]/5">
                  <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {edu.period}
                  </span>
                  <h3 className="mt-3 font-semibold text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineCard({
  exp,
  isCurrent,
}: {
  exp: ExperienceType
  isCurrent: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/5",
        isCurrent
          ? "border-[var(--primary)]/30"
          : "border-border/50 hover:border-[var(--primary)]/30"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            isCurrent
              ? "bg-[var(--primary)]/10 text-[var(--primary)]"
              : "bg-muted text-muted-foreground"
          )}
        >
          {exp.period}
        </span>
        {isCurrent && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--primary)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--primary)] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--primary)]" />
            </span>
            Current
          </span>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-foreground">{exp.role}</h3>
      <p className="mt-0.5 text-sm font-medium text-[var(--primary)]">
        {exp.company}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {exp.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {exp.techUsed.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
