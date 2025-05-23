"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Contact2,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  SquareTerminalIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import Link from "next/link"

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Project",
      url: "/dashboard/project/all-projects",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Add project",
          url: "/dashboard/project",
        },
        {
          title: "Projects",
          url: "/dashboard/project/all-projects",
        },
    
      ],
    },
 
   
    {
      title: "Resume",
      url: "/dashboard/resume",
      icon: Settings2,
   
    },
   
    {
      title: "Contact",
      url: "/dashboard/contact",
      icon: Contact2,
   
    },
    {
      title: "Skills",
      url: "/dashboard/skills",
      icon: Bot,
      items: [
        {
          title: "Add skills",
          url: "/dashboard/skills",
        },
        {
          title: "My Skills",
          url: "/dashboard/skills/all-skills",
        },
    
      ],
    },
    {
      title: "Blogs",
      url: "/dashboard/blog",
      icon: Bot,
      items: [
        {
          title: "Add blog",
          url: "/dashboard/blog",
        },
        {
          title: "My blogs",
          url: "/dashboard/blog/all-blogs",
        },
    
      ],
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuSubItem>
          <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
               <h2 className="font-bold text-xl">Portfolio</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent> 
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
