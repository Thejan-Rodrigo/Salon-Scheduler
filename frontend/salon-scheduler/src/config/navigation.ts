import {
  LayoutDashboard,
  Users,
  Scissors,
  CalendarDays,
  UserRound,
  Settings,
} from "lucide-react";
import { ROUTES } from "@/routes/routePaths";

export const NAVIGATION_ITEMS = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    allowedRoles: ["Admin", "Staff"],
  },

  {
    label: "Staff",
    path: ROUTES.STAFF,
    icon: Users,
    allowedRoles: ["Admin"],
  },

  {
    label: "Services",
    path: ROUTES.SERVICE,
    icon: Scissors,
    allowedRoles: ["Admin"],
  },

  {
    label: "Appointments",
    path: ROUTES.HOME,
    icon: CalendarDays,
    allowedRoles: ["Admin", "Staff"],
  },

  {
    label: "Customers",
    path: ROUTES.HOME,
    icon: UserRound,
    allowedRoles: ["Admin", "Staff"],
  },

  {
    label: "Settings",
    path: ROUTES.HOME,
    icon: Settings,
    allowedRoles: ["Admin"],
  },
];