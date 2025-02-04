// src/app/(Auth)/users/columns.tsx

"use client"

import { CellContext, ColumnDef, Row } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export type User = {
  id: string
  name: string
  role: string
  status: "active" | "inactive"
  islocked: boolean
  created_at: string
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<User> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }: { row: Row<User> }) => <div className="w-[180px]">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }: { row: Row<User> }) => <div className="w-[80px]">{row.getValue("role")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }: { row: Row<User> }) => {
      const status = row.getValue("status") as string
      return (
        <div className="w-[80px]">
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status}
          </Badge>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "islocked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Locked" />
    ),
    cell: ({ row }: { row: Row<User> }) => {
      const islocked = row.getValue("islocked") as boolean
      return (
        <div className="w-[80px]">
          <Badge variant={islocked ? "destructive" : "outline"}>
            {islocked ? "Locked" : "Unlocked"}
          </Badge>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }: { row: Row<User> }) => {
      const date = new Date(row.getValue("created_at"))
      return <div className="w-[120px]">{date.toLocaleDateString()}</div>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row, table }: CellContext<User, unknown>) => (
      <DataTableRowActions row={row} table={table} />
    ),
  },
]
