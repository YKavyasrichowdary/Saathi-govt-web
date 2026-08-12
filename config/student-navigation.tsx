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
    href: "/recommendations",
    label: "Recommendations",
    icon: "Sparkles",
    group: "Discover",
  },
  {
    href: "/ai",
    label: "AI Companion",
    icon: "MessageCircleHeart",
    group: "Work",
  },
  {
    href: "/roadmap",
    label: "Roadmaps",
    icon: "Route",
    group: "Work",
  },
  {
    href: "/documents",
    label: "Documents",
    icon: "FileCheck2",
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
