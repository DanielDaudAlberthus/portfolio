import type { ReactNode } from "react"
import { Footer } from "@/components/shared/footer"
import { ScrollToTop } from "@/components/shared/scroll-to-top"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
