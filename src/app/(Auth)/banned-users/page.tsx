// src/app/(Auth)/banned-users/page.tsx

"use client"

import { useState } from "react"
import { DataTable } from "./data-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useBannedUsers } from "@/hooks/use-banned-users"

export default function BannedUsersPage() {
  const { bannedUsers, isLoading } = useBannedUsers()

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
                <BreadcrumbPage>Banned Users</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
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
      </main>
    </>
  )
}
