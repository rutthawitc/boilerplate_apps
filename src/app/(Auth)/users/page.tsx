"use client"

import { useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { UserDialog } from "./user-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { User } from "./columns"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useUsers } from "@/hooks/use-users"

export default function UsersPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const { users, isLoading } = useUsers()

  function onEdit(user: User) {
    setSelectedUser(user)
    setDialogOpen(true)
  }

  function onNew() {
    setSelectedUser(undefined)
    setDialogOpen(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Users & Roles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center space-x-4">
            <Button onClick={onNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <DataTable
          columns={columns}
          data={users}
          onEdit={onEdit}
          isLoading={isLoading}
        />
      </main>
      <UserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={selectedUser}
      />
    </>
  )
}
