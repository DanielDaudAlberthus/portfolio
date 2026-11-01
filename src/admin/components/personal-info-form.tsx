import { useState, useEffect } from "react"
import { useSingleRow } from "@/admin/hooks/use-table-crud"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImageUploader } from "./image-uploader"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

interface PersonalInfoRow {
  id?: string
  name: string
  logo_text: string
  role: string
  tagline: string
  email: string
  location: string
  github: string
  linkedin: string
  profile_image: string
}

const emptyForm: PersonalInfoRow = {
  name: "", logo_text: "", role: "", tagline: "",
  email: "", location: "", github: "", linkedin: "", profile_image: "",
}

export function PersonalInfoForm() {
  const { data, loading: fetching, save } = useSingleRow<PersonalInfoRow>("personal_info")
  const [form, setForm] = useState<PersonalInfoRow>(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { id: _, ...fields } = form
    const error = await save(fields)
    setSaving(false)
    if (error) {
      toast.error("Gagal menyimpan", { description: error })
    } else {
      toast.success("Personal info berhasil disimpan")
    }
  }

  if (fetching) return <LoadingSkeleton />

  const fields: { name: keyof PersonalInfoRow; label: string; type?: string }[] = [
    { name: "name", label: "Name" },
    { name: "logo_text", label: "Logo Text" },
    { name: "role", label: "Role" },
    { name: "email", label: "Email", type: "email" },
    { name: "location", label: "Location" },
    { name: "github", label: "GitHub URL", type: "url" },
    { name: "linkedin", label: "LinkedIn URL", type: "url" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold">Personal Info</h2>
      <p className="mt-1 text-sm text-muted-foreground">Informasi profil yang tampil di halaman utama.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name} className="space-y-2">
              <Label htmlFor={f.name}>{f.label}</Label>
              <Input
                id={f.name}
                name={f.name}
                type={f.type || "text"}
                value={form[f.name] as string}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        {/* Profile Image Uploader */}
        <ImageUploader
          label="Profile Image"
          value={form.profile_image}
          onChange={(url) => setForm((prev) => ({ ...prev, profile_image: url }))}
          folder="profile"
          variant="circle"
        />

        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Textarea
            id="tagline"
            name="tagline"
            rows={3}
            value={form.tagline}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={saving} className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Simpan
        </Button>
      </form>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-9 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
