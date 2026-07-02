import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NAVIGATION_ITEMS } from "@/config/navigation";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function AppSidebar() {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  const role = user?.role ?? "";

  const menuItems = NAVIGATION_ITEMS.filter((item) =>
    item.allowedRoles.includes(role)
  );

  return (
    <Sidebar className="flex flex-col h-screen bg-gray-100" variant="inset">
      <SidebarHeader>
        <h2 className="text-xl font-bold">
          Salon Scheduler
        </h2>
      </SidebarHeader>

     <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <SidebarMenuButton asChild isActive={isActive}>
                    <span
                      className={`flex items-center gap-3 rounded-md px-2 py-1 ${
                        isActive
                          ? "bg-black text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.icon && <item.icon size={18} />}
                      <span>{item.label}</span>
                    </span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <div>
          <p className="font-medium">
            {user?.email}
          </p>

          <p className="text-sm text-muted-foreground">
            {user?.role}
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}