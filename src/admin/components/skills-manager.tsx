import { useState } from "react"
import { useTableCrud } from "@/admin/hooks/use-table-crud"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Loader2, Save } from "lucide-react"

interface SkillItemData {
  name: string
  level: "Expert" | "Advanced" | "Intermediate"
}

interface SkillRow {
  id?: string
  category: string
  icon: string
  items: SkillItemData[]
  sort_order: number
}

const ICON_OPTIONS = [
  { value: "code", label: "💻 Code" },
  { value: "layers", label: "📚 Frameworks" },
  { value: "database", label: "🗄️ Database" },
  { value: "terminal", label: "⌨️ Terminal / Tools" },
  { value: "globe", label: "🌐 Web" },
  { value: "server", label: "🖥️ Server" },
  { value: "shield", label: "🛡️ Security" },
  { value: "palette", label: "🎨 Design" },
]

const emptySkill: SkillRow = { category: "", icon: "code", items: [], sort_order: 0 }

export function SkillsManager() {
  const { items, loading, create, update, remove } = useTableCrud<SkillRow>("skills")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState<SkillRow>(emptySkill)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function openCreate() {
    setForm({ ...emptySkill, sort_order: items.length })
    setEditId(null)
    setDialogOpen(true)
  }
  function openEdit(item: SkillRow) { setForm(item); setEditId(item.id!); setDialogOpen(true) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { id: _, ...fields } = form
    const error = editId ? await update(editId, fields) : await create(fields)
    setSaving(false)
    if (error) toast.error("Gagal menyimpan", { description: error })
    else { toast.success(editId ? "Skill diupdate" : "Skill ditambahkan"); setDialogOpen(false) }
  }

  async function handleDelete(id: string, category: string) {
    if (!confirm(`Hapus kategori skill "${category}"?`)) return
    const error = await remove(id)
    if (error) toast.error("Gagal menghapus", { description: error })
    else toast.success("Skill dihapus")
  }

  function addSkillItem() {
    setForm({ ...form, items: [...form.items, { name: "", level: "Intermediate" }] })
  }

  function updateSkillItem(index: number, field: keyof SkillItemData, value: string) {
    const updated = [...form.items]
    updated[index] = { ...updated[index], [field]: value }
    setForm({ ...form, items: updated })
  }

  function removeSkillItem(index: number) {
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) })
  }

  if (loading) return <div className="h-8 w-48 animate-pulse rounded bg-muted" />

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="mt-1 text-sm text-muted-foreground">Kelola kategori dan daftar keahlian teknis kamu.</p>
        </div>
        <Button onClick={openCreate} className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          <Plus className="size-4" /> Tambah Kategori
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">Belum ada skill. Klik &quot;Tambah Kategori&quot; untuk mulai.</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-lg">
              {ICON_OPTIONS.find((o) => o.value === item.icon)?.label.split(" ")[0] || "💻"}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{item.category}</h3>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {item.items.map((s) => (
                  <span key={s.name} className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                    {s.name}
                  </span>
                ))}
                {item.items.length === 0 && (
                  <span className="text-xs text-muted-foreground italic">Belum ada skill di kategori ini</span>
                )}
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="size-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id!, item.category)} className="text-destructive"><Trash2 className="size-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Kategori Skill" : "Tambah Kategori Skill"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Nama Kategori</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Contoh: Languages, Frameworks" required />
              </div>
              <div className="space-y-2">
                <Label>Ikon</Label>
                <Select value={form.icon} onValueChange={(v) => setForm({ ...form, icon: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Skill Items */}
            <div className="rounded-lg border border-border/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold">Daftar Skill</h4>
                  <p className="text-xs text-muted-foreground">Tambahkan skill dan level keahlian di kategori ini.</p>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={addSkillItem}><Plus className="size-4" /> Tambah</Button>
              </div>
              <div className="space-y-2">
                {form.items.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-3">Klik &quot;Tambah&quot; untuk menambahkan skill.</p>
                )}
                {form.items.map((si, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-muted/30 p-2">
                    <Input className="flex-1" placeholder="Nama skill, contoh: JavaScript" value={si.name} onChange={(e) => updateSkillItem(i, "name", e.target.value)} />
                    <Select value={si.level} onValueChange={(v) => updateSkillItem(i, "level", v)}>
                      <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Expert">⭐ Expert</SelectItem>
                        <SelectItem value="Advanced">🔥 Advanced</SelectItem>
                        <SelectItem value="Intermediate">📘 Intermediate</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSkillItem(i)} className="text-destructive shrink-0"><Trash2 className="size-4" /></Button>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" disabled={saving} className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {editId ? "Simpan Perubahan" : "Tambah Kategori"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
