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

interface NavLinkRow {
  id?: string
  label: string
  href: string
  sort_order: number
}

const emptyLink: NavLinkRow = { label: "", href: "", sort_order: 0 }

export function NavLinksManager() {
  const { items, loading, create, update, remove } = useTableCrud<NavLinkRow>("nav_links")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState<NavLinkRow>(emptyLink)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function openCreate() { setForm(emptyLink); setEditId(null); setDialogOpen(true) }
  function openEdit(item: NavLinkRow) { setForm(item); setEditId(item.id!); setDialogOpen(true) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { id: _, ...fields } = form
    const error = editId ? await update(editId, fields) : await create(fields)
    setSaving(false)
    if (error) toast.error("Gagal menyimpan", { description: error })
    else { toast.success(editId ? "Link diupdate" : "Link ditambahkan"); setDialogOpen(false) }
  }

  async function handleDelete(id: string, label: string) {
    if (!confirm(`Hapus link "${label}"?`)) return
    const error = await remove(id)
    if (error) toast.error("Gagal menghapus", { description: error })
    else toast.success("Link dihapus")
  }

  if (loading) return <div className="h-8 w-48 animate-pulse rounded bg-muted" />

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Nav Links</h2>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} link navigasi</p>
        </div>
        <Button onClick={openCreate} className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          <Plus className="size-4" /> Tambah
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{item.label}</h3>
              <p className="text-sm text-muted-foreground font-mono">{item.href}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">#{item.sort_order}</span>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="size-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id!, item.label)} className="text-destructive"><Trash2 className="size-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Link" : "Tambah Link"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2"><Label>Label</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Home" required /></div>
            <div className="space-y-2"><Label>Href</Label><Input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} placeholder="#home" required /></div>
            <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
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
