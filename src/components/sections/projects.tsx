import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { type Project } from "@/data/portfolio"
import { usePortfolio } from "@/context/portfolio-context"
import { cn } from "@/lib/utils"

const categories = ["All", "Backend", "Fullstack", "API"] as const
type Category = (typeof categories)[number]

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

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project
  index: number
  onSelect: (p: Project) => void
}) {
  return (
    <motion.div
      layout
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      custom={index}
      className="group cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)]/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--primary)]/5">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.src = `https://placehold.co/800x450/1a1a1a/666666?text=${encodeURIComponent(project.title)}`
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Hover links */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Github className="size-4" />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-[var(--primary)]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground leading-tight">
              {project.title}
            </h3>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]" />
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const { projects } = usePortfolio()
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) => p.category === activeCategory.toLowerCase()
        )

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32">
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
            Projects
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Featured Work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Beberapa project yang sudah saya kerjakan, mulai dari REST API, microservices, hingga fullstack applications.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-card/50 p-1 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeCategory === cat
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="projects-tab"
                    className="absolute inset-0 rounded-full bg-[var(--primary)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                onSelect={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            Belum ada project di kategori ini.
          </p>
        )}
      </div>

      {/* Project Detail Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
            {/* Dialog Image */}
            <div className="relative aspect-video overflow-hidden bg-muted">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src = `https://placehold.co/800x450/1a1a1a/666666?text=${encodeURIComponent(selectedProject.title)}`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            {/* Dialog Body */}
            <div className="space-y-5 p-6">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="leading-relaxed text-muted-foreground">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              {/* Tech Stack */}
              <div>
                <h4 className="mb-2.5 text-sm font-semibold text-foreground">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="rounded-full px-3 py-1 font-mono text-xs transition-colors hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] hover:border-[var(--primary)]/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {selectedProject.github && (
                  <Button
                    variant="outline"
                    className="rounded-full"
                    asChild
                  >
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4" />
                      Source Code
                    </a>
                  </Button>
                )}
                {selectedProject.liveDemo && (
                  <Button
                    className="rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                    asChild
                  >
                    <a
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
