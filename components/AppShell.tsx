"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import {
  LayoutDashboard,
  Route as RouteIcon,
  Compass,
  MessageCircleHeart,
  BookOpen,
  ClipboardList,
  FileCheck2,
  Trophy,
  Flame,
  Bell,
  UserCog,
  LifeBuoy,
  Menu,
  X,
  Search,
  Sparkles,
} from "lucide-react";

import Logo from "@/components/Logo";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  group: string;
};

const NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    group: "Home",
  },
  {
    href: "/journey",
    label: "My Journey",
    icon: <RouteIcon className="h-4 w-4" />,
    group: "Home",
  },
  {
    href: "/opportunities",
    label: "Opportunities",
    icon: <Compass className="h-4 w-4" />,
    group: "Discover",
  },
  {
    href: "/companion",
    label: "AI Companion",
    icon: <MessageCircleHeart className="h-4 w-4" />,
    group: "Work",
  },
  {
    href: "/preparation",
    label: "Preparation",
    icon: <BookOpen className="h-4 w-4" />,
    group: "Work",
  },
  {
    href: "/mock-tests",
    label: "Mock Tests",
    icon: <Trophy className="h-4 w-4" />,
    group: "Work",
  },
  {
    href: "/documents",
    label: "Documents",
    icon: <FileCheck2 className="h-4 w-4" />,
    group: "Track",
  },
  {
    href: "/applications",
    label: "Applications",
    icon: <ClipboardList className="h-4 w-4" />,
    group: "Track",
  },
  {
    href: "/progress",
    label: "Progress",
    icon: <Flame className="h-4 w-4" />,
    group: "Track",
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: <Bell className="h-4 w-4" />,
    group: "You",
  },
  {
    href: "/profile",
    label: "Profile & Settings",
    icon: <UserCog className="h-4 w-4" />,
    group: "You",
  },
  {
    href: "/help",
    label: "Help Center",
    icon: <LifeBuoy className="h-4 w-4" />,
    group: "You",
  },
];

function SidebarInner({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const groups = [...new Set(NAV.map((item) => item.group))];

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}

      <div className="px-5 pb-4 pt-5">
        <Logo />
      </div>

      {/* Search */}

      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" />

          <span>Search everything...</span>

          <kbd className="ml-auto rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {groups.map((group) => (
          <div
            key={group}
            className="mb-3"
          >
            <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {group}
            </div>

            <ul className="space-y-0.5">
              {NAV.filter(
                (item) => item.group === group
              ).map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(
                    item.href + "/"
                  );

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {item.icon}

                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Streak Card */}

      <div className="border-t border-border p-3">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/20 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-accent" />

            Your streak
          </div>

          <div className="mt-1 text-2xl font-bold">
            14 days
          </div>

          <div className="text-[11px] text-muted-foreground">
            You showed up. That matters.
          </div>
        </div>
      </div>
    </div>
  );
}
export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-border bg-surface lg:block">
        <SidebarInner />
      </aside>

      {/* Mobile Drawer */}

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute inset-y-0 left-0 w-[280px] bg-surface shadow-xl">
            <SidebarInner
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Page */}

      <div className="lg:pl-[260px]">
        {/* Header */}

        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur md:px-8">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-lg border border-border p-2 lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            {title && (
              <h1 className="truncate text-[19px] font-bold tracking-tight text-foreground">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="truncate text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {actions}

            <Link
              href="/notifications"
              className="relative rounded-full border border-border bg-surface p-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />

              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </Link>

            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground"
              aria-label="Profile"
            >
              A
            </Link>
          </div>
        </header>

        {/* Main */}

        <main className="px-4 py-6 md:px-8 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}