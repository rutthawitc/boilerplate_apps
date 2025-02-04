// src/app/(Auth)/banned-users/data-table-row-actions.tsx

"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Undo, Trash } from "lucide-react"
import { BannedUser } from "@/hooks/use-banned-users"
import { useBannedUsers } from "@/hooks/use-banned-users"
import { useUsers } from "@/hooks/use-users"
import { toast } from "sonner"

interface DataTableRowActionsProps {
  row: Row<BannedUser>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { deleteBannedUser } = useBannedUsers()
  const { addUser } = useUsers()

  const bannedUser = row.original

  const handleDelete = async () => {
    try {
      await deleteBannedUser.mutateAsync(bannedUser.id)
    } catch (error) {
      console.error("Failed to delete banned user:", error)
    }
  }

  const handleUnban = async () => {
    try {
      // Add user back to users table
      await addUser.mutateAsync({
        id: bannedUser.id,
        name: bannedUser.name,
        role: "user",
        status: "active",
        islocked: false,
      })
      // Remove from banned users
      await deleteBannedUser.mutateAsync(bannedUser.id)
    } catch (error) {
      console.error("Failed to unban user:", error)
      toast.error("Failed to unban user")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleUnban}>
          <Undo className="mr-2 h-4 w-4" />
          Unban User
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={handleDelete}
          disabled={deleteBannedUser.isPending}
        >
          <Trash className="mr-2 h-4 w-4" />
          {deleteBannedUser.isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
