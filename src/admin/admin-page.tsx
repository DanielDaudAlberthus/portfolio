import { useState } from "react"
import { AdminLayout, type AdminTab } from "./components/admin-layout"
import { PersonalInfoForm } from "./components/personal-info-form"
import { AboutForm } from "./components/about-form"
import { ProjectsManager } from "./components/projects-manager"
import { SkillsManager } from "./components/skills-manager"
import { ExperiencesManager } from "./components/experiences-manager"
import { EducationManager } from "./components/education-manager"
import { NavLinksManager } from "./components/nav-links-manager"

const panels: Record<AdminTab, React.FC> = {
  "personal-info": PersonalInfoForm,
  about: AboutForm,
  projects: ProjectsManager,
  skills: SkillsManager,
  experiences: ExperiencesManager,
  education: EducationManager,
  "nav-links": NavLinksManager,
}

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("personal-info")
  const Panel = panels[activeTab]

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <Panel />
    </AdminLayout>
  )
}
