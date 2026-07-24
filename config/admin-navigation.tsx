import type { NavItem } from "@/config/student-navigation";

export const adminNavigation: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "LayoutDashboard",
    group: "Overview",
  },
  {
    href: "/admin/opportunities",
    label: "Opportunities",
    icon: "Briefcase",
    group: "Management",
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: "Users",
    group: "Management",
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: "BarChart3",
    group: "Insights",
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: "Settings",
    group: "System",
  },
];
