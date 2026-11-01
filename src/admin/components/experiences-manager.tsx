import { useState } from "react"
import { useTableCrud } from "@/admin/hooks/use-table-crud"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Loader2, Save } from "lucide-react"

interface ExperienceRow {
  id?: string
  company: string
  role: string
  period: string
  description: string
  tech_used: string[]
  sort_order: number
}

const emptyExp: ExperienceRow = {
  company: "", role: "", period: "", description: "", tech_used: [], sort_order: 0,
}

export function ExperiencesManager() {
  const { items, loading, create, update, remove } = useTableCrud<ExperienceRow>("experiences")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState<ExperienceRow>(emptyExp)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [techInput, setTechInput] = useState("")

  function openCreate() { setForm(emptyExp); setTechInput(""); setEditId(null); setDialogOpen(true) }
  function openEdit(item: ExperienceRow) { setForm(item); setTechInput(item.tech_used.join(", ")); setEditId(item.id!); setDialogOpen(true) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { id: _, ...fields } = form
    fields.tech_used = techInput.split(",").map((s) => s.trim()).filter(Boolean)
    const error = editId ? await update(editId, fields) : await create(fields)
    setSaving(false)
    if (error) toast.error("Gagal menyimpan", { description: error })
    else { toast.success(editId ? "Experience diupdate" : "Experience ditambahkan"); setDialogOpen(false) }
  }

  async function handleDelete(id: string, company: string) {
    if (!confirm(`Hapus experience di "${company}"?`)) return
    const error = await remove(id)
    if (error) toast.error("Gagal menghapus", { description: error })
    else toast.success("Experience dihapus")
  }

  if (loading) return <div className="h-8 w-48 animate-pulse rounded bg-muted" />

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Experience</h2>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} pengalaman</p>
        </div>
        <Button onClick={openCreate} className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          <Plus className="size-4" /> Tambah
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{item.role}</h3>
              <p className="text-sm text-[var(--primary)]">{item.company}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.period}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="size-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id!, item.company)} className="text-destructive"><Trash2 className="size-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Experience" : "Tambah Experience"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Company</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Role</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Period</Label><Input value={form.period} placeholder="Jun 2024 - Sekarang" onChange={(e) => setForm({ ...form, period: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Tech Used (comma-separated)</Label><Input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Laravel, PHP, MySQL" /></div>
            <Button type="submit" disabled={saving} className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {editId ? "Update" : "Tambah"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
