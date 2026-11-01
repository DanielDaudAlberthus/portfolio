import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/components/shared/layout"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { Toaster } from "@/components/ui/sonner"
import { PortfolioProvider } from "@/context/portfolio-context"
import { AuthProvider, useAuth } from "@/context/auth-context"
import { AdminPage } from "@/admin/admin-page"
import { AdminLogin } from "@/admin/login-page"

function PortfolioHome() {
  return (
    <PortfolioProvider>
      <Layout>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </Layout>
    </PortfolioProvider>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    )
  }

  if (!session) return <Navigate to="/space/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/space/login" element={<AdminLogin />} />
        <Route
          path="/space"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="bottom-right" />
    </AuthProvider>
  )
}

export default App
