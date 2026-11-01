import { useState } from "react"
import { useTableCrud } from "@/admin/hooks/use-table-crud"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Loader2, Save } from "lucide-react"

interface EducationRow {
  id?: string
  institution: string
  degree: string
  period: string
  sort_order: number
}

const emptyEdu: EducationRow = { institution: "", degree: "", period: "", sort_order: 0 }

export function EducationManager() {
  const { items, loading, create, update, remove } = useTableCrud<EducationRow>("education")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState<EducationRow>(emptyEdu)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function openCreate() { setForm(emptyEdu); setEditId(null); setDialogOpen(true) }
  function openEdit(item: EducationRow) { setForm(item); setEditId(item.id!); setDialogOpen(true) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { id: _, ...fields } = form
    const error = editId ? await update(editId, fields) : await create(fields)
    setSaving(false)
    if (error) toast.error("Gagal menyimpan", { description: error })
    else { toast.success(editId ? "Education diupdate" : "Education ditambahkan"); setDialogOpen(false) }
  }

  async function handleDelete(id: string, institution: string) {
    if (!confirm(`Hapus "${institution}"?`)) return
    const error = await remove(id)
    if (error) toast.error("Gagal menghapus", { description: error })
    else toast.success("Education dihapus")
  }

  if (loading) return <div className="h-8 w-48 animate-pulse rounded bg-muted" />

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} pendidikan</p>
        </div>
        <Button onClick={openCreate} className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          <Plus className="size-4" /> Tambah
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{item.degree}</h3>
              <p className="text-sm text-muted-foreground">{item.institution}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.period}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="size-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id!, item.institution)} className="text-destructive"><Trash2 className="size-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Education" : "Tambah Education"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2"><Label>Institution</Label><Input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Degree</Label><Input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} required /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Period</Label><Input value={form.period} placeholder="2022 - 2026" onChange={(e) => setForm({ ...form, period: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
            </div>
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
