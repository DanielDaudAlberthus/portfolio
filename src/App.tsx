import { Layout } from "@/components/shared/layout"
import { Hero } from "@/components/sections/hero"

function App() {
  return (
    <Layout>
      <Hero />

      {/* Placeholder sections */}
      <section id="about" className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About</h1>
          <p className="text-muted-foreground">About section goes here</p>
        </div>
      </section>

      <section id="projects" className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Projects section goes here</p>
        </div>
      </section>

      <section id="skills" className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground">Skills section goes here</p>
        </div>
      </section>

      <section id="experience" className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground">Experience section goes here</p>
        </div>
      </section>

      <section id="contact" className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
          <p className="text-muted-foreground">Contact section goes here</p>
        </div>
      </section>
    </Layout>
  )
}

export default App
