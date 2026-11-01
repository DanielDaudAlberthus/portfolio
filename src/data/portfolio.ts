// ==========================================
// TypeScript Interfaces
// ==========================================

export interface PersonalInfo {
  name: string
  logoText: string
  role: string
  tagline: string
  email: string
  location: string
  github: string
  linkedin: string
  profileImage: string
}

export interface SkillItem {
  name: string
  level: "Expert" | "Advanced" | "Intermediate"
}

export interface Skill {
  category: string
  icon: string
  items: SkillItem[]
}

export interface Project {
  title: string
  description: string
  techStack: string[]
  github: string
  liveDemo: string
  image: string
  category: "backend" | "fullstack" | "api"
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  techUsed: string[]
}

export interface Education {
  institution: string
  degree: string
  period: string
}

export interface Stat {
  label: string
  value: number
  suffix?: string
}

export interface BentoItem {
  title: string
  description: string
  items?: string[]
  icon: string
  className?: string
}

export interface AboutData {
  description: string
  stats: Stat[]
  bentoItems: BentoItem[]
}

export interface NavLink {
  label: string
  href: string
}

// ==========================================
// Data
// ==========================================

export const personalInfo: PersonalInfo = {
  name: "BACK END",
  logoText: "portfolio.",
  role: "Backend Developer",
  tagline:
    "Backend developer yang fokus membangun API yang scalable dan reliable dengan clean architecture dan system design.",
  email: "danillabert03@gmail.com",
  location: "Jakarta, Indonesia",
  github: "https://github.com/danieldaudalberthus",
  linkedin: "https://www.linkedin.com/in/danieldaudalberthus/",
  profileImage: "/images/daniel_porto.png",
}

export const skills: Skill[] = [
  {
    category: "Languages",
    icon: "code",
    items: [
      { name: "JavaScript", level: "Intermediate" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "PHP", level: "Expert" },
      // { name: "Python", level: "Advanced" },
      // { name: "Go", level: "Intermediate" },
    ],
  },
  {
    category: "Frameworks",
    icon: "layers",
    items: [
      { name: "Laravel", level: "Expert" },
      { name: "FastAPI", level: "Intermediate" },
    ],
  },
  {
    category: "Database",
    icon: "database",
    items: [
      { name: "MySQL", level: "Advanced" },
    ],
  },
  {
    category: "Other Tools",
    icon: "terminal",
    items: [
      { name: "Git", level: "Expert" },
    ],
  },
]

export const projects: Project[] = [
  {
    title: "E-Commerce REST API",
    description:
      "RESTful API untuk platform e-commerce dengan fitur authentication, product management, cart, dan payment gateway integration. Dibangun dengan clean architecture pattern.",
    techStack: ["Node.js", "Express.js", "TypeScript", "PostgreSQL", "Redis"],
    github: "https://github.com/[USERNAME]/ecommerce-api",
    liveDemo: "",
    image: "/images/projects/ecommerce-api.jpg",
    category: "api",
  },
  {
    title: "Task Management App",
    description:
      "Fullstack task management application dengan real-time updates menggunakan WebSocket. Mendukung team collaboration, task assignment, dan deadline tracking.",
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "React", "Socket.io"],
    github: "https://github.com/[USERNAME]/task-management",
    liveDemo: "https://task-app.example.com",
    image: "/images/projects/task-management.jpg",
    category: "fullstack",
  },
  {
    title: "URL Shortener Service",
    description:
      "High-performance URL shortener dengan analytics dashboard. Menggunakan Redis untuk caching dan rate limiting, mampu handle ribuan request per detik.",
    techStack: ["Go", "Gin", "Redis", "PostgreSQL", "Docker"],
    github: "https://github.com/[USERNAME]/url-shortener",
    liveDemo: "https://short.example.com",
    image: "/images/projects/url-shortener.jpg",
    category: "backend",
  },
  {
    title: "Blog CMS API",
    description:
      "Headless CMS untuk blog dengan fitur rich text editor, image upload ke S3, tagging system, dan SEO optimization. Dilengkapi admin dashboard.",
    techStack: ["Laravel", "PHP", "MySQL", "AWS S3", "Vue.js"],
    github: "https://github.com/[USERNAME]/blog-cms",
    liveDemo: "",
    image: "/images/projects/blog-cms.jpg",
    category: "fullstack",
  },
  {
    title: "Authentication Microservice",
    description:
      "Standalone auth service dengan JWT, refresh token rotation, OAuth2 (Google & GitHub), dan role-based access control. Siap dipakai sebagai shared service.",
    techStack: ["Node.js", "TypeScript", "Express.js", "MongoDB", "Docker"],
    github: "https://github.com/[USERNAME]/auth-service",
    liveDemo: "",
    image: "/images/projects/auth-service.jpg",
    category: "api",
  },
  {
    title: "Real-time Chat API",
    description:
      "Backend untuk chat application dengan WebSocket, mendukung private message, group chat, typing indicator, dan message history dengan pagination.",
    techStack: ["FastAPI", "Python", "WebSocket", "MongoDB", "Redis"],
    github: "https://github.com/[USERNAME]/chat-api",
    liveDemo: "",
    image: "/images/projects/chat-api.jpg",
    category: "backend",
  },
]

export const experiences: Experience[] = [
  {
    company: "Montoon",
    role: "Freelance Customer Service",
    period: "Jun 2022 - Sekarang",
    description:
      "Melayani pelanggan dan membantu menyelesaikan masalah yang mereka hadapi pada game Mobile Legends.",
    techUsed: ["Technical Support", "Customer Service", "Client Service", "Service Work"],
  },
  {
    company: "Vinix7",
    role: "Junior Web Developer",
    period: "Jun 2025 - Sep 2025",
    description:
      "Membangun website untuk sistem. Kolaborasi dengan tim frontend untuk integrasi API. Menulis unit test dan integration test untuk memastikan code quality.",
    techUsed: ["Laravel", "PHP", "MySQL", "Tailwind"],
  },
  // {
  //   company: "[Nama Perusahaan 3]",
  //   role: "Backend Developer Intern",
  //   period: "Jan 2021 - Mei 2021",
  //   description:
  //     "Membantu development fitur baru pada sistem internal perusahaan. Belajar best practice dalam software development dan agile methodology.",
  //   techUsed: ["Express.js", "JavaScript", "MongoDB", "Git"],
  // },
]

export const education: Education[] = [
  {
    institution: "Universitas Pancasila",
    degree: "S1 Teknik Informatika",
    period: "2022 - 2026",
  },
]

export const aboutData: AboutData = {
  description:
    "Saya adalah seorang Backend Developer dengan passion dalam membangun sistem yang scalable, reliable, dan maintainable. Berpengalaman dalam merancang RESTful API, microservices architecture, dan mengelola database baik SQL maupun NoSQL. Saya percaya bahwa kode yang baik bukan hanya tentang fungsionalitas, tetapi juga tentang clean architecture dan developer experience.",
  stats: [
    { label: "Tahun Pengalaman", value: 1, suffix: "+" },
    { label: "Project Selesai", value: 10, suffix: "+" },
    { label: "Tech Stack", value: 5, suffix: "+" },
    { label: "Cup of Coffee", value: 999, suffix: "+" },
  ],
  bentoItems: [
    {
      title: "API Development",
      description:
        "Membangun RESTful API yang robust dengan authentication, rate limiting, dan comprehensive documentation.",
      icon: "server",
      className: "md:col-span-2",
    },
    {
      title: "Database Design",
      description:
        "Merancang schema database yang efisien, query optimization, dan implementasi caching strategy.",
      icon: "database",
    },
    {
      title: "Design System",
      description:
        "Membangun design system yang konsisten dan reusable untuk aplikasi web.",
      icon: "palette",
    },
    {
      title: "Tools Favorit",
      description: "Tech stack yang sering saya gunakan sehari-hari.",
      items: ["VS Code", "Postman", "TablePlus", "Terminal", "Git"],
      icon: "wrench",
      className: "md:col-span-2",
    },
    {
      title: "Fun Facts",
      description: "Di luar coding, saya suka eksplorasi hal baru.",
      items: ["Coffee Enthusiast", "Open Source Contributor", "Tech Blog Reader", "Night Owl Coder"],
      icon: "sparkles",
    },
  ],
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]
