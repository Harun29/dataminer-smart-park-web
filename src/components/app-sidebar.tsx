"use client"

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Map,
  Settings,
  Users
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SettingsDialog } from "./settings-dialog"
import { useAuth } from "@/app/context/authContext"
import WorkersTasks from "./workers-tasks"

const data = {
  user: {
    name: "ADMIN",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "DataMiner SPO",
      logo: GalleryVerticalEnd,
      plan: "Smart Park Ops",
    }
  ],
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: Map,
    },
    {
      title: "Workers",
      url: "/workers",
      icon: Users,
    },
    {
      title: "Alarm Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const {isAdmin} = useAuth();

  const handleAlarmsClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Sidebar collapsible={isAdmin ? "icon" : "offcanvas"} {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent className="custom-scrollbar">
          {isAdmin && <NavMain items={data.navMain} onAlarmsClick={handleAlarmsClick} />}
          {!isAdmin && <WorkersTasks />}
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SettingsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}