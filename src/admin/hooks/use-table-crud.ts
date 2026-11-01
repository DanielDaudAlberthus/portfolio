import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"

export function useTableCrud<T extends { id?: string }>(
  tableName: string,
  orderBy = "sort_order"
) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from(tableName)
      .select("*")
      .order(orderBy)
    setItems((data as T[]) ?? [])
    setLoading(false)
  }, [tableName, orderBy])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function create(item: Omit<T, "id">) {
    const { error } = await supabase.from(tableName).insert(item)
    if (error) return error.message
    await refresh()
    return null
  }

  async function update(id: string, item: Partial<T>) {
    const { error } = await supabase.from(tableName).update(item).eq("id", id)
    if (error) return error.message
    await refresh()
    return null
  }

  async function remove(id: string) {
    const { error } = await supabase.from(tableName).delete().eq("id", id)
    if (error) return error.message
    await refresh()
    return null
  }

  return { items, loading, create, update, remove, refresh }
}

export function useSingleRow<T extends { id?: string }>(tableName: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const { data: row } = await supabase
      .from(tableName)
      .select("*")
      .limit(1)
      .single()
    setData(row as T | null)
    setLoading(false)
  }, [tableName])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function save(item: Partial<T>) {
    if (data?.id) {
      const { error } = await supabase.from(tableName).update(item).eq("id", data.id)
      if (error) return error.message
    } else {
      const { error } = await supabase.from(tableName).insert(item)
      if (error) return error.message
    }
    await refresh()
    return null
  }

  return { data, loading, save, refresh }
}
