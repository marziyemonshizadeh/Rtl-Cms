import {
  ArrowLeftToLine,
  ArrowRightToLine,
  PanelsTopLeft,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import SidebarMenu from "./SidebarMenu";

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
          "relative flex h-[60px] shrink-0 items-center px-6 lg:h-[70px]",
          !onToggle && "pe-12",
          collapsed && "justify-center px-0",
        )}
      >
        <Link
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
        </Link>
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

      <SidebarMenu collapsed={collapsed} onNavigate={onNavigate} />

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
