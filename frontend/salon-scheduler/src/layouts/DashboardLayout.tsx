import { Outlet } from "react-router-dom";

import AppSidebar from "@/components/layout/Sidebar";

import TopNavbar from "@/components/layout/TopNavbar";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <TopNavbar/>
        <SidebarTrigger />
        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}