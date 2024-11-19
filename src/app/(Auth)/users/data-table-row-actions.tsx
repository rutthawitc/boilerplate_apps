"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Lock, Trash, Unlock } from "lucide-react"
import { User } from "./columns"
import { useUsers } from "@/hooks/use-users"

interface DataTableRowActionsProps {
  row: Row<User>
  table: Table<User>
}

export function DataTableRowActions({ row, table }: DataTableRowActionsProps) {
  const { onEdit } = table.options.meta as { onEdit: (user: User) => void }
  const { updateUser, deleteUser } = useUsers()

  const user = row.original

  const handleDelete = async () => {
    try {
      await deleteUser.mutateAsync(user.id)
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const handleToggleLock = async () => {
    try {
      await updateUser.mutateAsync({
        id: user.id,
        islocked: !user.islocked,
      })
    } catch (error) {
      console.error("Failed to toggle user lock:", error)
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
        <DropdownMenuItem onClick={() => onEdit(user)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToggleLock}>
          {user.islocked ? (
            <>
              <Unlock className="mr-2 h-4 w-4" />
              Unlock
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Lock
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={handleDelete}
          disabled={deleteUser.isPending}
        >
          <Trash className="mr-2 h-4 w-4" />
          {deleteUser.isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}