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

export interface Skill {
  category: string
  items: string[]
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
    "Backend developer yang fokus membangun API yang scalable dan reliable. Passionate dalam clean architecture dan system design.",
  email: "[EMAIL KAMU]",
  location: "Jakarta, Indonesia",
  github: "https://github.com/[USERNAME]",
  linkedin: "https://linkedin.com/in/[USERNAME]",
  profileImage: "/images/daniel_porto.png",
}

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "PHP", "Python", "Go"],
  },
  {
    category: "Frameworks",
    items: ["Express.js", "NestJS", "Laravel", "FastAPI"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Git", "Linux", "Nginx", "AWS"],
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
    company: "[Nama Perusahaan 1]",
    role: "Backend Developer",
    period: "Jan 2023 - Sekarang",
    description:
      "Mengembangkan dan maintain RESTful API untuk platform utama perusahaan. Mengoptimasi query database yang mengurangi response time hingga 40%. Implementasi CI/CD pipeline dan containerization dengan Docker.",
    techUsed: ["Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS"],
  },
  {
    company: "[Nama Perusahaan 2]",
    role: "Junior Backend Developer",
    period: "Jun 2021 - Des 2022",
    description:
      "Membangun microservice untuk sistem inventory dan order processing. Kolaborasi dengan tim frontend untuk integrasi API. Menulis unit test dan integration test untuk memastikan code quality.",
    techUsed: ["Laravel", "PHP", "MySQL", "Redis", "Git"],
  },
  {
    company: "[Nama Perusahaan 3]",
    role: "Backend Developer Intern",
    period: "Jan 2021 - Mei 2021",
    description:
      "Membantu development fitur baru pada sistem internal perusahaan. Belajar best practice dalam software development dan agile methodology.",
    techUsed: ["Express.js", "JavaScript", "MongoDB", "Git"],
  },
]

export const education: Education[] = [
  {
    institution: "[Nama Universitas]",
    degree: "S1 Teknik Informatika",
    period: "2017 - 2021",
  },
]

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]
