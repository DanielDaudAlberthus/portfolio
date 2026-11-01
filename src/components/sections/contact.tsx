import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Send,
  Github,
  Linkedin,
  Mail,
  Loader2,
  ArrowUpRight,
} from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { usePortfolio } from "@/context/portfolio-context"

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

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = "Nama wajib diisi"
  if (!data.email.trim()) {
    errors.email = "Email wajib diisi"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Format email tidak valid"
  }
  if (!data.message.trim()) errors.message = "Pesan wajib diisi"
  return errors
}

export function Contact() {
  const { personalInfo } = usePortfolio()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [loading, setLoading] = useState(false)

  const socialLinks = [
    { label: "GitHub", href: personalInfo.github, icon: Github },
    { label: "LinkedIn", href: personalInfo.linkedin, icon: Linkedin },
    { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
  ]
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      // Web3Forms submission
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Replace with your key from web3forms.com
          name: form.name,
          email: form.email,
          subject: form.subject || `Portfolio Contact: ${form.name}`,
          message: form.message,
        }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success("Pesan terkirim!", {
          description: "Terima kasih, saya akan segera merespons.",
        })
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error("Submit failed")
      }
    } catch {
      // Fallback: open mailto
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Dari: ${form.name} (${form.email})\n\n${form.message}`)}`
      window.open(mailtoUrl, "_blank")
      toast.info("Membuka email client...", {
        description:
          "Form gagal terkirim, dialihkan ke email client sebagai fallback.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
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
            Contact
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Let's Work Together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Punya project atau ide menarik? Jangan ragu untuk menghubungi saya.
            Saya selalu terbuka untuk diskusi dan kolaborasi.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-16 grid gap-12 md:grid-cols-5">
          {/* Left - Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="space-y-8 md:col-span-2"
          >
            {/* Social Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Connect with me
              </h3>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                  >
                    <link.icon className="size-4" />
                    <span className="font-medium">{link.label}</span>
                    <ArrowUpRight className="ml-auto size-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent p-6 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5">
              <div className="absolute -right-6 -top-6 size-24 rounded-full bg-green-500/10 blur-2xl transition-all duration-500 group-hover:bg-green-500/15" />
              <div className="relative flex items-center gap-3">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex size-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-sm shadow-green-500/50" />
                </span>
                <span className="text-sm font-semibold text-foreground tracking-wide">
                  Available for work
                </span>
              </div>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                Saat ini saya terbuka untuk freelance projects dan full-time
                opportunities.
              </p>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nama <span className="text-[var(--primary)]">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className={
                      errors.name
                        ? "border-red-500 focus-visible:ring-red-500/30"
                        : ""
                    }
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-[var(--primary)]">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={
                      errors.email
                        ? "border-red-500 focus-visible:ring-red-500/30"
                        : ""
                    }
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="mt-5 space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Apa yang bisa saya bantu?"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              {/* Message */}
              <div className="mt-5 space-y-2">
                <Label htmlFor="message">
                  Pesan <span className="text-[var(--primary)]">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Ceritakan tentang project atau ide Anda..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={
                    errors.message
                      ? "border-red-500 focus-visible:ring-red-500/30"
                      : ""
                  }
                />
                {errors.message && (
                  <p className="text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
