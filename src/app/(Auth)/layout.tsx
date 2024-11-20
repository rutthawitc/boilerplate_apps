import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
