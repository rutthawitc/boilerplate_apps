import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export type BannedUser = {
  id: string
  name: string
  desc: string
  created_at: string
}

export function useBannedUsers() {
  const queryClient = useQueryClient()

  const bannedUsers = useQuery<BannedUser[]>({
    queryKey: ["banned-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("banned_users")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        toast.error("Failed to fetch banned users")
        throw error
      }

      return data || []
    },
  })

  const addBannedUser = useMutation({
    mutationFn: async (user: Omit<BannedUser, "created_at">) => {
      const { data, error } = await supabase
        .from("banned_users")
        .insert([user])
        .select()
        .single()

      if (error) {
        toast.error("Failed to ban user")
        throw error
      }

      toast.success("User banned successfully")
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banned-users"] })
    },
  })

  const updateBannedUser = useMutation({
    mutationFn: async (user: Partial<BannedUser> & { id: string }) => {
      const { data, error } = await supabase
        .from("banned_users")
        .update(user)
        .eq("id", user.id)
        .select()
        .single()

      if (error) {
        toast.error("Failed to update banned user")
        throw error
      }

      toast.success("Banned user updated successfully")
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banned-users"] })
    },
  })

  const deleteBannedUser = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("banned_users")
        .delete()
        .eq("id", id)

      if (error) {
        toast.error("Failed to delete banned user")
        throw error
      }

      toast.success("Banned user deleted successfully")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banned-users"] })
    },
  })

  return {
    bannedUsers,
    addBannedUser,
    updateBannedUser,
    deleteBannedUser,
    isLoading: bannedUsers.isLoading,
  }
}
