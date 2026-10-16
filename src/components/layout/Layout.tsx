import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { readPreference, savePreference } from "@/lib/themes";

const desktopQuery = "(min-width: 1024px)";

export default function Layout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(
    () => readPreference("sidebar-collapsed") === "true",
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    savePreference("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia(desktopQuery);
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <div className="app-layout" dir="rtl" data-sidebar-collapsed={collapsed}>
          <a
            href="#main-content"
            className="sr-only z-[60] rounded-lg bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
          >
            رفتن به محتوای اصلی
          </a>
          <aside id="desktop-sidebar" className="layout-sidebar">
            <Sidebar
              collapsed={collapsed}
              onToggle={() => setCollapsed((current) => !current)}
            />
          </aside>

          <SheetContent
            className="w-[280px] max-w-[calc(100vw-2rem)] border-sidebar-border bg-sidebar p-0 text-sidebar-foreground [&>button]:focus:ring-sidebar-primary"
            dir="rtl"
            onCloseAutoFocus={(event) => {
              if (window.matchMedia(desktopQuery).matches) {
                event.preventDefault();
                mainRef.current?.focus({ preventScroll: true });
              }
            }}
          >
            <SheetTitle className="sr-only">منوی اصلی فروشگاه</SheetTitle>
            <SheetDescription className="sr-only">
              دسترسی به پیشخوان و بخش‌های مدیریت فروشگاه
            </SheetDescription>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>

          <div className="layout-content">
            <Header />
            <main
              ref={mainRef}
              id="main-content"
              tabIndex={-1}
              className="layout-main"
            >
              {children}
            </main>
          </div>
        </div>
      </Sheet>
    </TooltipProvider>
  );
}
