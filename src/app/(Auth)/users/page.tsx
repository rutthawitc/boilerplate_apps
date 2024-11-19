"use client"

import { useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { UserDialog } from "./user-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { User } from "./columns"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarProvider } from "@/components/ui/sidebar"
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
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
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
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="container flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Users & Roles</h2>
                  <p className="text-muted-foreground">
                    Here&apos;s a list of all users in the system
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={onNew}>
                    <Plus className="mr-2 h-4 w-4" /> Add User
                  </Button>
                </div>
              </div>
              <DataTable
                columns={columns}
                data={users}
                onEdit={onEdit}
                isLoading={isLoading}
              />
              <UserDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                user={selectedUser}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
