import {
  ArrowLeftToLine,
  ArrowRightToLine,
  PanelsTopLeft,
  Store,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/routes/navigation";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
}

export default function Sidebar({
  collapsed = false,
  onToggle,
  onNavigate,
}: SidebarProps) {
  return (
    <div
      className="flex h-full min-h-0 w-full flex-col bg-sidebar text-sidebar-foreground"
      dir="rtl"
    >
      <div
        className={cn(
          "relative flex h-24 shrink-0 items-center px-6",
          collapsed && "justify-center px-0",
        )}
      >
        <NavLink
          to="/"
          onClick={onNavigate}
          aria-label="مدیریت فروشگاه، پیشخوان"
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2.5",
            collapsed && "flex-none",
          )}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <PanelsTopLeft className="size-5" aria-hidden="true" />
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold tracking-tight text-sidebar-foreground">
                مدیریت فروشگاه
              </span>
              <span className="mt-1 block text-[10px] tracking-[0.2em] text-sidebar-muted-foreground">
                RTL CMS
              </span>
            </span>
          )}
        </NavLink>
        {onToggle && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute -end-4 top-1/2 z-50 size-8 -translate-y-1/2 rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-sidebar-primary"
                onClick={onToggle}
                aria-label={
                  collapsed ? "باز کردن نوار کناری" : "جمع کردن نوار کناری"
                }
                aria-expanded={!collapsed}
                aria-controls="desktop-sidebar"
              >
                {collapsed ? (
                  <ArrowLeftToLine className="size-4" />
                ) : (
                  <ArrowRightToLine className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {collapsed ? "باز کردن نوار کناری" : "جمع کردن نوار کناری"}
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <nav aria-label="منوی اصلی" className="flex-1 overflow-y-auto px-3 py-5">
        <p
          className={cn(
            "mb-4 px-3 text-[11px] font-medium text-sidebar-muted-foreground",
            collapsed && "sr-only",
          )}
        >
          فضای کاری
        </p>
        <ul className="space-y-1.5">
          {navigationItems.map(({ path, title, icon: Icon }) => (
            <li key={path}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={path}
                    end={path === "/"}
                    onClick={onNavigate}
                    aria-label={collapsed ? title : undefined}
                    className={({ isActive }) =>
                      cn(
                        "group relative flex h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-primary",
                        isActive &&
                          "bg-sidebar-primary/10 text-sidebar-primary hover:bg-sidebar-primary/15 hover:text-sidebar-primary",
                        collapsed && "justify-center px-0",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className="size-[19px] shrink-0"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                        {!collapsed && <span className="flex-1">{title}</span>}
                        {isActive && !collapsed && (
                          <span className="size-1.5 rounded-full bg-sidebar-primary" />
                        )}
                      </>
                    )}
                  </NavLink>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="left">{title}</TooltipContent>
                )}
              </Tooltip>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="shrink-0 border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
            <Store
              className="size-5 shrink-0 text-sidebar-muted-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-sidebar-foreground">فروشگاه شما</p>
              <p className="mt-1 text-[11px] text-sidebar-muted-foreground">
                همه‌چیز، در یک نگاه
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
