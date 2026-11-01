import { useState, useRef, useCallback } from "react"
import { uploadImage, deleteImage } from "@/lib/storage"
import { cn } from "@/lib/utils"
import { ImagePlus, Loader2, X, Upload } from "lucide-react"

interface ImageUploaderProps {
  /** Current image URL */
  value: string
  /** Called with the new public URL (or empty string on remove) */
  onChange: (url: string) => void
  /** Storage folder name, e.g. "projects" or "profile" */
  folder?: string
  /** Optional label displayed above the dropzone */
  label?: string
  /** Shape variant */
  variant?: "rectangle" | "circle"
  /** Custom className for the container */
  className?: string
}

const ACCEPT = ".jpg,.jpeg,.png,.webp,.gif"
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export function ImageUploader({
  value,
  onChange,
  folder = "general",
  label,
  variant = "rectangle",
  className,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      setError(null)

      // Validate type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
      if (!validTypes.includes(file.type)) {
        setError("Format tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.")
        return
      }

      // Validate size
      if (file.size > MAX_SIZE) {
        setError("Ukuran file terlalu besar. Maksimal 5MB.")
        return
      }

      setUploading(true)
      try {
        // Delete old image if exists
        if (value) {
          try {
            await deleteImage(value)
          } catch {
            // ignore delete errors for old images
          }
        }

        const url = await uploadImage(file, folder)
        onChange(url)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Upload gagal"
        setError(message)
      } finally {
        setUploading(false)
      }
    },
    [value, onChange, folder]
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // Reset input so the same file can be re-selected
    e.target.value = ""
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
  }

  async function handleRemove(e: React.MouseEvent) {
    e.stopPropagation()
    if (!value) return
    setUploading(true)
    setError(null)
    try {
      await deleteImage(value)
    } catch {
      // ignore
    }
    onChange("")
    setUploading(false)
  }

  const isCircle = variant === "circle"

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none">{label}</label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Has Image — Show Preview */}
      {value && !uploading ? (
        <div className={cn("relative group", isCircle ? "w-32 h-32" : "w-full")}>
          <div
            className={cn(
              "overflow-hidden border-2 border-border/50 cursor-pointer transition-all hover:border-[var(--primary)]/50",
              isCircle
                ? "rounded-full w-32 h-32"
                : "rounded-lg aspect-video w-full"
            )}
            onClick={() => inputRef.current?.click()}
          >
            <img
              src={value}
              alt="Preview"
              className={cn(
                "w-full h-full object-cover",
                isCircle ? "rounded-full" : ""
              )}
            />
            {/* Hover overlay */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity",
                isCircle ? "rounded-full" : "rounded-lg"
              )}
            >
              <div className="flex flex-col items-center gap-1 text-white">
                <Upload className="size-5" />
                <span className="text-xs font-medium">Ganti Gambar</span>
              </div>
            </div>
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={handleRemove}
            className={cn(
              "absolute -top-2 -right-2 z-10 flex size-6 items-center justify-center rounded-full bg-destructive text-white shadow-lg transition-transform hover:scale-110",
              "opacity-0 group-hover:opacity-100"
            )}
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        /* No Image — Show Dropzone */
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed transition-all",
            isCircle
              ? "w-32 h-32 rounded-full"
              : "w-full rounded-lg aspect-video max-h-48",
            dragOver
              ? "border-[var(--primary)] bg-[var(--primary)]/10 scale-[1.02]"
              : "border-border/50 hover:border-[var(--primary)]/50 hover:bg-muted/30",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="size-8 animate-spin text-[var(--primary)]" />
              <span className="text-xs text-muted-foreground">Mengupload...</span>
            </>
          ) : (
            <>
              <div className="flex size-12 items-center justify-center rounded-full bg-muted/50">
                <ImagePlus className="size-6 text-muted-foreground" />
              </div>
              {!isCircle && (
                <>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      Drag & drop gambar di sini
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      atau klik untuk browse • JPG, PNG, WebP, GIF • Max 5MB
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <span className="inline-block size-1.5 rounded-full bg-destructive" />
          {error}
        </p>
      )}
    </div>
  )
}
