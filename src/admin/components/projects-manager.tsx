import { useState } from "react"
import { useTableCrud } from "@/admin/hooks/use-table-crud"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { ImageUploader } from "./image-uploader"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Loader2, Save } from "lucide-react"

interface ProjectRow {
  id?: string
  title: string
  description: string
  tech_stack: string[]
  github: string
  live_demo: string
  image: string
  category: string
  sort_order: number
}

const emptyProject: ProjectRow = {
  title: "", description: "", tech_stack: [], github: "",
  live_demo: "", image: "", category: "backend", sort_order: 0,
}

export function ProjectsManager() {
  const { items, loading, create, update, remove } = useTableCrud<ProjectRow>("projects")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState<ProjectRow>(emptyProject)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [techInput, setTechInput] = useState("")

  function openCreate() {
    setForm(emptyProject)
    setTechInput("")
    setEditId(null)
    setDialogOpen(true)
  }

  function openEdit(item: ProjectRow) {
    setForm(item)
    setTechInput(item.tech_stack.join(", "))
    setEditId(item.id!)
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { id: _, ...fields } = form
    fields.tech_stack = techInput.split(",").map((s) => s.trim()).filter(Boolean)
    const error = editId ? await update(editId, fields) : await create(fields)
    setSaving(false)
    if (error) {
      toast.error("Gagal menyimpan", { description: error })
    } else {
      toast.success(editId ? "Project diupdate" : "Project ditambahkan")
      setDialogOpen(false)
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus project "${title}"?`)) return
    const error = await remove(id)
    if (error) toast.error("Gagal menghapus", { description: error })
    else toast.success("Project dihapus")
  }

  if (loading) return <div className="h-8 w-48 animate-pulse rounded bg-muted" />

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} project</p>
        </div>
        <Button onClick={openCreate} className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
          <Plus className="size-4" /> Tambah
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4">
            {/* Image thumbnail */}
            {item.image && (
              <div className="size-16 shrink-0 overflow-hidden rounded-lg border border-border/30 bg-muted">
                <img src={item.image} alt={item.title} className="size-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{item.title}</h3>
                <span className="shrink-0 rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--primary)] uppercase">{item.category}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{item.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.tech_stack.map((t) => (
                  <span key={t} className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                <Pencil className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id!, item.title)} className="text-destructive">
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Project" : "Tambah Project"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="fullstack">Fullstack</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tech Stack (comma-separated)</Label>
              <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Node.js, TypeScript, PostgreSQL" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Live Demo URL</Label>
                <Input value={form.live_demo} onChange={(e) => setForm({ ...form, live_demo: e.target.value })} />
              </div>
            </div>
            <ImageUploader
              label="Project Image"
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              folder="projects"
            />
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
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
