
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppSelector } from "@/redux/hooks";

export default function App() {
  // #region State
  const isDarkmode = useAppSelector((state) => state.darkmode.isDarkmode);
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebar-collapsed") === "true",
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkmode);
  }, [isDarkmode]);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const toggleSidebar = () => {
    setCollapsed((current) => {
      localStorage.setItem("sidebar-collapsed", String(!current));
      return !current;
    });
  };
  // #endregion

  return (
    <TooltipProvider delayDuration={200}>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <div
          dir="rtl"
          className="min-h-screen bg-background text-foreground"
          style={
            {
              "--sidebar-width": collapsed ? "5.25rem" : "16.5rem",
            } as CSSProperties
          }
        >
          <a
            href="#main-content"
            className="sr-only z-[60] rounded-lg bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
          >
            رفتن به محتوای اصلی
          </a>
          <aside
            id="desktop-sidebar"
            className="fixed inset-y-0 start-0 z-40 hidden w-[var(--sidebar-width)] border-e border-sidebar-border transition-[width] duration-200 motion-reduce:transition-none lg:flex"
          >
            <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
          </aside>

          <SheetContent
            className="w-[280px] border-sidebar-border bg-sidebar p-0 text-sidebar-foreground [&>button]:focus:ring-sidebar-primary"
            dir="rtl"
          >
            <SheetTitle className="sr-only">منوی اصلی فروشگاه</SheetTitle>
            <SheetDescription className="sr-only">
              دسترسی به پیشخوان و بخش‌های مدیریت فروشگاه
            </SheetDescription>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>

          <div className="min-w-0 transition-[padding] duration-200 motion-reduce:transition-none lg:ps-[var(--sidebar-width)]">
            <Navbar />
            <main
              id="main-content"
              tabIndex={-1}
              className="mx-auto max-w-[1600px] p-4 outline-none sm:p-6 xl:p-8"
            >
              <Outlet />
            </main>
          </div>
        </div>
      </Sheet>
    </TooltipProvider>
  );
}
