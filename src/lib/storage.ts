import { supabase } from "./supabase"

const BUCKET = "portfolio-images"

/**
 * Upload a file to Supabase Storage.
 * Returns the public URL on success, or throws on error.
 */
export async function uploadImage(
  file: File,
  folder: string = "general"
): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) throw new Error(error.message)

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filename)

  return urlData.publicUrl
}

/**
 * Delete an image from Supabase Storage by its public URL.
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  // Extract the path from the public URL
  // URL format: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return // not a storage URL, skip

  const path = publicUrl.slice(idx + marker.length)
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw new Error(error.message)
}
