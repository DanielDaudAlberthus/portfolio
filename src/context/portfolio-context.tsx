import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import {
  type PersonalInfo,
  type Skill,
  type Project,
  type Experience,
  type Education,
  type AboutData,
  type NavLink,
  personalInfo as defaultPersonalInfo,
  skills as defaultSkills,
  projects as defaultProjects,
  experiences as defaultExperiences,
  education as defaultEducation,
  aboutData as defaultAboutData,
  navLinks as defaultNavLinks,
} from "@/data/portfolio"

interface PortfolioData {
  personalInfo: PersonalInfo
  skills: Skill[]
  projects: Project[]
  experiences: Experience[]
  education: Education[]
  aboutData: AboutData
  navLinks: NavLink[]
  loading: boolean
}

const PortfolioContext = createContext<PortfolioData>({
  personalInfo: defaultPersonalInfo,
  skills: defaultSkills,
  projects: defaultProjects,
  experiences: defaultExperiences,
  education: defaultEducation,
  aboutData: defaultAboutData,
  navLinks: defaultNavLinks,
  loading: true,
})

export function usePortfolio() {
  return useContext(PortfolioContext)
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>({
    personalInfo: defaultPersonalInfo,
    skills: defaultSkills,
    projects: defaultProjects,
    experiences: defaultExperiences,
    education: defaultEducation,
    aboutData: defaultAboutData,
    navLinks: defaultNavLinks,
    loading: true,
  })

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setData((prev) => ({ ...prev, loading: false }))
      return
    }
    fetchPortfolioData()
  }, [])

  async function fetchPortfolioData() {
    try {
      const [
        personalInfoRes,
        skillsRes,
        projectsRes,
        experiencesRes,
        educationRes,
        aboutRes,
        navLinksRes,
      ] = await Promise.all([
        supabase.from("personal_info").select("*").limit(1).single(),
        supabase.from("skills").select("*").order("sort_order"),
        supabase.from("projects").select("*").order("sort_order"),
        supabase.from("experiences").select("*").order("sort_order"),
        supabase.from("education").select("*").order("sort_order"),
        supabase.from("about").select("*").limit(1).single(),
        supabase.from("nav_links").select("*").order("sort_order"),
      ])

      setData({
        personalInfo: personalInfoRes.data
          ? mapPersonalInfo(personalInfoRes.data)
          : defaultPersonalInfo,
        skills: skillsRes.data
          ? skillsRes.data.map(mapSkill)
          : defaultSkills,
        projects: projectsRes.data
          ? projectsRes.data.map(mapProject)
          : defaultProjects,
        experiences: experiencesRes.data
          ? experiencesRes.data.map(mapExperience)
          : defaultExperiences,
        education: educationRes.data
          ? educationRes.data.map(mapEducation)
          : defaultEducation,
        aboutData: aboutRes.data
          ? mapAbout(aboutRes.data)
          : defaultAboutData,
        navLinks: navLinksRes.data
          ? navLinksRes.data.map(mapNavLink)
          : defaultNavLinks,
        loading: false,
      })
    } catch {
      // Fallback to static data if Supabase is unavailable
      setData((prev) => ({ ...prev, loading: false }))
    }
  }

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  )
}

// ==========================================
// Mappers: Supabase row → TypeScript interface
// ==========================================

function mapPersonalInfo(row: Record<string, unknown>): PersonalInfo {
  return {
    name: row.name as string,
    logoText: row.logo_text as string,
    role: row.role as string,
    tagline: row.tagline as string,
    email: row.email as string,
    location: row.location as string,
    github: row.github as string,
    linkedin: row.linkedin as string,
    profileImage: row.profile_image as string,
  }
}

function mapSkill(row: Record<string, unknown>): Skill {
  return {
    category: row.category as string,
    icon: row.icon as string,
    items: row.items as Skill["items"],
  }
}

function mapProject(row: Record<string, unknown>): Project {
  return {
    title: row.title as string,
    description: row.description as string,
    techStack: row.tech_stack as string[],
    github: row.github as string,
    liveDemo: row.live_demo as string,
    image: row.image as string,
    category: row.category as Project["category"],
  }
}

function mapExperience(row: Record<string, unknown>): Experience {
  return {
    company: row.company as string,
    role: row.role as string,
    period: row.period as string,
    description: row.description as string,
    techUsed: row.tech_used as string[],
  }
}

function mapEducation(row: Record<string, unknown>): Education {
  return {
    institution: row.institution as string,
    degree: row.degree as string,
    period: row.period as string,
  }
}

function mapAbout(row: Record<string, unknown>): AboutData {
  return {
    description: row.description as string,
    stats: row.stats as AboutData["stats"],
    bentoItems: row.bento_items as AboutData["bentoItems"],
  }
}

function mapNavLink(row: Record<string, unknown>): NavLink {
  return {
    label: row.label as string,
    href: row.href as string,
  }
}
