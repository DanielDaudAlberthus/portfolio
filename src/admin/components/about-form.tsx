import { useState, useEffect } from "react"
import { useSingleRow } from "@/admin/hooks/use-table-crud"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Save, Plus, Trash2, BarChart3, LayoutGrid } from "lucide-react"

interface Stat {
  label: string
  value: number
  suffix?: string
}

interface BentoItem {
  title: string
  description: string
  icon: string
  className?: string
  items?: string[]
}

interface AboutRow {
  id?: string
  description: string
  stats: Stat[]
  bento_items: BentoItem[]
}

const ICON_OPTIONS = [
  { value: "server", label: "🖥️ Server" },
  { value: "database", label: "🗄️ Database" },
  { value: "palette", label: "🎨 Design" },
  { value: "wrench", label: "🔧 Tools" },
  { value: "sparkles", label: "✨ Fun Facts" },
  { value: "code", label: "💻 Code" },
  { value: "globe", label: "🌐 Web" },
  { value: "shield", label: "🛡️ Security" },
  { value: "zap", label: "⚡ Performance" },
  { value: "layers", label: "📚 Layers" },
]

const SIZE_OPTIONS = [
  { value: "", label: "Normal (1 kolom)" },
  { value: "md:col-span-2", label: "Lebar (2 kolom)" },
]

export function AboutForm() {
  const { data, loading: fetching, save } = useSingleRow<AboutRow>("about")
  const [description, setDescription] = useState("")
  const [stats, setStats] = useState<Stat[]>([])
  const [bentoItems, setBentoItems] = useState<BentoItem[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setDescription(data.description)
      setStats(data.stats ?? [])
      setBentoItems(data.bento_items ?? [])
    }
  }, [data])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const error = await save({ description, stats, bento_items: bentoItems })
    setSaving(false)
    if (error) {
      toast.error("Gagal menyimpan", { description: error })
    } else {
      toast.success("About berhasil disimpan")
    }
  }

  if (fetching) return <div className="h-8 w-48 animate-pulse rounded bg-muted" />

  return (
    <div>
      <h2 className="text-2xl font-bold">About</h2>
      <p className="mt-1 text-sm text-muted-foreground">Konten halaman About Me yang tampil di portfolio.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        {/* Description */}
        <div className="space-y-2">
          <Label>Deskripsi Tentang Kamu</Label>
          <Textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ceritakan tentang dirimu, skill, dan pengalaman..."
          />
          <p className="text-xs text-muted-foreground">Paragraf ini akan tampil di section About Me.</p>
        </div>

        {/* Stats */}
        <div className="rounded-lg border border-border/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-4 text-[var(--primary)]" />
              <div>
                <h3 className="text-sm font-semibold">Statistik</h3>
                <p className="text-xs text-muted-foreground">Angka pencapaian yang ditampilkan di halaman About.</p>
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={() => setStats([...stats, { label: "", value: 0, suffix: "+" }])}>
              <Plus className="size-4" /> Tambah
            </Button>
          </div>
          <div className="space-y-3">
            {stats.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">Belum ada statistik. Klik &quot;Tambah&quot; untuk menambahkan.</p>
            )}
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-muted/30 p-3">
                <div className="flex-1 space-y-1">
                  <Input
                    placeholder="Contoh: Tahun Pengalaman"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...stats]; updated[i] = { ...stat, label: e.target.value }; setStats(updated)
                    }}
                  />
                </div>
                <div className="w-20 space-y-1">
                  <Input
                    type="number"
                    placeholder="10"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...stats]; updated[i] = { ...stat, value: Number(e.target.value) }; setStats(updated)
                    }}
                  />
                </div>
                <div className="w-16 space-y-1">
                  <Input
                    placeholder="+"
                    value={stat.suffix ?? ""}
                    onChange={(e) => {
                      const updated = [...stats]; updated[i] = { ...stat, suffix: e.target.value }; setStats(updated)
                    }}
                  />
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => setStats(stats.filter((_, j) => j !== i))} className="text-destructive shrink-0">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
          {stats.length > 0 && (
            <p className="mt-2 text-[10px] text-muted-foreground">Contoh hasil: &quot;10+&quot; Tahun Pengalaman — angka dan suffix akan digabung.</p>
          )}
        </div>

        {/* Bento Items */}
        <div className="rounded-lg border border-border/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="size-4 text-[var(--primary)]" />
              <div>
                <h3 className="text-sm font-semibold">Highlight Cards</h3>
                <p className="text-xs text-muted-foreground">Card-card keahlian/info yang tampil di section About.</p>
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={() => setBentoItems([...bentoItems, { title: "", description: "", icon: "server" }])}>
              <Plus className="size-4" /> Tambah
            </Button>
          </div>
          <div className="space-y-4">
            {bentoItems.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">Belum ada highlight card. Klik &quot;Tambah&quot; untuk menambahkan.</p>
            )}
            {bentoItems.map((item, i) => (
              <div key={i} className="rounded-lg border border-border/30 bg-muted/20 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--primary)]">Card {i + 1}</span>
                  <Button type="button" variant="ghost" size="icon" onClick={() => setBentoItems(bentoItems.filter((_, j) => j !== i))} className="text-destructive">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Judul</Label>
                    <Input placeholder="Contoh: API Development" value={item.title} onChange={(e) => {
                      const updated = [...bentoItems]; updated[i] = { ...item, title: e.target.value }; setBentoItems(updated)
                    }} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Ikon</Label>
                    <Select value={item.icon} onValueChange={(v) => {
                      const updated = [...bentoItems]; updated[i] = { ...item, icon: v }; setBentoItems(updated)
                    }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Deskripsi</Label>
                  <Textarea rows={2} placeholder="Jelaskan keahlian atau info ini..." value={item.description} onChange={(e) => {
                    const updated = [...bentoItems]; updated[i] = { ...item, description: e.target.value }; setBentoItems(updated)
                  }} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Ukuran Card</Label>
                    <Select value={item.className ?? ""} onValueChange={(v) => {
                      const updated = [...bentoItems]; updated[i] = { ...item, className: v || undefined }; setBentoItems(updated)
                    }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {SIZE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value || "normal"} value={opt.value || "normal"}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Tags (opsional, pisahkan dengan koma)</Label>
                    <Input
                      value={item.items?.join(", ") ?? ""}
                      placeholder="VS Code, Postman, Git"
                      onChange={(e) => {
                        const updated = [...bentoItems]
                        const val = e.target.value
                        updated[i] = { ...item, items: val ? val.split(",").map((s) => s.trim()) : undefined }
                        setBentoItems(updated)
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={saving} className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Simpan
        </Button>
      </form>
    </div>
  )
}
