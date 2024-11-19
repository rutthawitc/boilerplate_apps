import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { User } from "@/app/(Auth)/users/columns"
import { toast } from "sonner"

export function useUsers() {
  const queryClient = useQueryClient()

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pwa_user")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        toast.error("Failed to fetch users")
        throw error
      }

      return data || []
    },
  })

  const createUser = useMutation({
    mutationFn: async (newUser: Omit<User, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("pwa_user")
        .insert([newUser])
        .select()
        .single()

      if (error) {
        toast.error("Failed to create user")
        throw error
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User created successfully")
    },
  })

  const updateUser = useMutation({
    mutationFn: async (user: Partial<User> & { id: string }) => {
      const { data, error } = await supabase
        .from("pwa_user")
        .update(user)
        .eq("id", user.id)
        .select()
        .single()

      if (error) {
        toast.error("Failed to update user")
        throw error
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User updated successfully")
    },
  })

  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pwa_user").delete().eq("id", id)

      if (error) {
        toast.error("Failed to delete user")
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User deleted successfully")
    },
  })

  return {
    users,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
  }
}
