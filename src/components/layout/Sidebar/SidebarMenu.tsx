import { NavLink } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/routes/navigation";

interface SidebarMenuProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

export default function SidebarMenu({ collapsed, onNavigate }: SidebarMenuProps) {
  return (
    <nav aria-label="منوی اصلی" className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
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
  );
}
