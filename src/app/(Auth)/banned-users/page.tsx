"use client"

import { useState } from "react"
import { DataTable } from "./data-table"
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
import { useBannedUsers } from "@/hooks/use-banned-users"

export default function BannedUsersPage() {
  const { bannedUsers, isLoading } = useBannedUsers()

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
                    <BreadcrumbPage>Banned Users</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="container flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Banned Users</h2>
                  <p className="text-muted-foreground">
                    Here&apos;s a list of all banned users in the system
                  </p>
                </div>
              </div>
              <DataTable
                data={bannedUsers?.data || []}
                isLoading={isLoading}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
