import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon | string;
  group: string;
};

export const studentNavigation: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    group: "Home",
  },
  {
    href: "/journey",
    label: "My Journey",
    icon: "Route",
    group: "Home",
  },
  {
    href: "/opportunities",
    label: "Opportunities",
    icon: "Compass",
    group: "Discover",
  },
  {
    href: "/saved-opportunities",
    label: "Saved Opportunities",
    icon: "Bookmark",
    group: "Discover",
  },
  {
    href: "/companion",
    label: "AI Companion",
    icon: "MessageCircleHeart",
    group: "Work",
  },
  {
    href: "/preparation",
    label: "Preparation",
    icon: "BookOpen",
    group: "Work",
  },
  {
    href: "/mock-tests",
    label: "Mock Tests",
    icon: "Trophy",
    group: "Work",
  },
  {
    href: "/documents",
    label: "Documents",
    icon: "FileCheck2",
    group: "Track",
  },
  {
    href: "/applications",
    label: "Applications",
    icon: "ClipboardList",
    group: "Track",
  },
  {
    href: "/progress",
    label: "Progress",
    icon: "Flame",
    group: "Track",
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: "Bell",
    group: "You",
  },
  {
    href: "/profile",
    label: "Profile & Settings",
    icon: "UserCog",
    group: "You",
  },
  {
    href: "/help",
    label: "Help Center",
    icon: "LifeBuoy",
    group: "You",
  },
  
];
