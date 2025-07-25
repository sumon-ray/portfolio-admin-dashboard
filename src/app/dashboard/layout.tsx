import type React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar" // Your AppSidebar component
import "../globals.css" // Ensure global styles are imported
import { cookies } from "next/headers" // For persisting sidebar state

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  // Get the default open state for the sidebar from cookies for persistence
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* This flex container holds the sidebar and the main content area side-by-side */}
      <div className="flex min-h-screen">
        <AppSidebar /> {/* Your sidebar component, which handles its own fixed positioning and width */}
        {/* The main content area:
            - `flex-1`: This is crucial. It tells this div to take up all remaining horizontal space
                        after the sidebar. The shadcn/ui Sidebar component itself will push this
                        content over, so no explicit `ml-[...]` is needed here.
            - `flex flex-col`: Makes this a flex container for its children (header and page content),
                               stacking them vertically.
            - `bg-gray-50`: Sets the background color for the main content area.
            - `overflow-auto`: Allows vertical scrolling if the content within this area exceeds its height.
        */}
        <main className="flex-1 flex flex-col bg-gray-50 overflow-auto">
          {/* A header for the main content area, including the sidebar toggle button */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white shadow-sm">
            <SidebarTrigger className="-ml-1" /> {/* This button toggles the sidebar */}
            <h1 className="text-lg font-semibold">Dashboard</h1> {/* Example title */}
          </header>
          {children} {/* This is where your page.tsx content (e.g., Projectpage) will be rendered */}
        </main>
      </div>
    </SidebarProvider>
  )
}
