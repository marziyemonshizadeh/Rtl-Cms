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
      className="flex h-full min-h-0 w-full flex-col bg-zinc-950 text-zinc-300"
      dir="rtl"
    >
      <NavLink
        to="/"
        onClick={onNavigate}
        aria-label="مدیریت فروشگاه، پیشخوان"
        className={cn(
          "flex h-24 shrink-0 items-center gap-3 px-6",
          collapsed && "justify-center px-0",
        )}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lime-400 text-zinc-950">
          <PanelsTopLeft className="size-5" aria-hidden="true" />
        </span>
        {!collapsed && (
          <span className="min-w-0">
            <span className="block text-lg font-bold tracking-tight text-white">
              مدیریت فروشگاه
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.2em] text-zinc-500">
              RTL CMS
            </span>
          </span>
        )}
      </NavLink>

      <nav aria-label="منوی اصلی" className="flex-1 overflow-y-auto px-3 py-5">
        <p
          className={cn(
            "mb-4 px-3 text-[11px] font-medium text-zinc-500",
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
                        "group relative flex h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium outline-none transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-lime-400",
                        isActive &&
                          "bg-lime-400/10 text-lime-300 hover:bg-lime-400/15 hover:text-lime-300",
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
                          <span className="size-1.5 rounded-full bg-lime-400" />
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

      <div className="shrink-0 border-t border-white/[0.07] p-3">
        {!collapsed && (
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
            <Store
              className="size-5 shrink-0 text-zinc-400"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-zinc-200">فروشگاه شما</p>
              <p className="mt-1 text-[11px] text-zinc-500">
                همه‌چیز، در یک نگاه
              </p>
            </div>
          </div>
        )}
        {onToggle && (
          <Button
            variant="ghost"
            className={cn(
              "h-10 w-full justify-start gap-3 rounded-xl px-3 text-xs text-zinc-400 hover:bg-white/5 hover:text-white",
              collapsed && "justify-center px-0",
            )}
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
            {!collapsed && "جمع کردن منو"}
          </Button>
        )}
      </div>
    </div>
  );
}
