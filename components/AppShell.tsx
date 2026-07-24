"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useSession } from "next-auth/react";

import {
  Bell,
  Menu,
  X,
  Search,
  Sparkles,
  LayoutDashboard,
  Route as RouteIcon,
  Compass,
  MessageCircleHeart,
  BookOpen,
  ClipboardList,
  FileCheck2,
  Trophy,
  Flame,
  UserCog,
  LifeBuoy,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  Bookmark,
  type LucideIcon,
} from "lucide-react";

import Logo from "@/components/Logo";
import { studentNavigation, type NavItem } from "@/config/student-navigation";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Route: RouteIcon,
  RouteIcon,
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
  Briefcase,
  Users,
  Bookmark,
  BarChart3,
  Settings,
};

function SidebarInner({
  navigation = studentNavigation,
  onNavigate,
}: {
  navigation?: NavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const groups = [...new Set(navigation.map((item) => item.group))];

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
              {navigation
                .filter((item) => item.group === group)
                .map((item) => {
                  const active = pathname === item.href;
                  const Icon =
                    typeof item.icon === "string"
                      ? ICON_MAP[item.icon] || Compass
                      : item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />

                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer hint */}

      <div className="border-t border-border p-3">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />

            <span>SAATHI Ambient Mode</span>
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
  navigation = studentNavigation,
  title,
  subtitle,
  actions,
  unreadCount,
  children,
}: {
  navigation?: NavItem[];
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  unreadCount?: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const userName = session?.user?.name || "Ananya";
  const userImage = session?.user?.image || null;
  const avatarLetter = userName.charAt(0).toUpperCase();

  const activeNavigation = navigation;
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-border bg-surface lg:block">
        <SidebarInner
         navigation={activeNavigation} 
         onNavigate={() => setOpen(false)}/>
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
              navigation={activeNavigation}
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

              {typeof unreadCount === "number" && unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>

            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground"
              aria-label="Profile"
            >
              {userImage ? (
                <img src={userImage} alt={userName} className="h-full w-full object-cover" />
              ) : (
                avatarLetter
              )}
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