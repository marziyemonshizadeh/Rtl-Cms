import {
  ChevronDown,
  ChevronLeft,
  CircleUser,
  Menu,
  Moon,
  Palette,
  Plus,
  Sun,
  UserRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleDarkmode } from "@/redux/store/darkmood";
import { navigationItems } from "@/routes/navigation";
import { themes } from "@/lib/themes";
import { setTheme } from "@/redux/store/theme";

export default function Navbar() {
  // #region State
  const dispatch = useAppDispatch();
  const isDarkmode = useAppSelector((state) => state.darkmode.isDarkmode);
  const theme = useAppSelector((state) => state.theme.current);
  const currentTheme = themes.find((item) => item.id === theme) ?? themes[0];
  const { pathname } = useLocation();
  const page =
    navigationItems.find((item) => item.path === pathname) ??
    navigationItems[0];
  const today = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
  // #endregion

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 xl:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-9 shrink-0 lg:hidden"
              aria-label="باز کردن منوی اصلی"
            >
              <Menu className="size-[18px]" />
            </Button>
          </SheetTrigger>
          <div className="min-w-0">
            <nav
              aria-label="مسیر صفحه"
              className="hidden items-center gap-2 text-[11px] text-muted-foreground sm:flex"
            >
              <Link to="/" className="transition-colors hover:text-foreground">
                فروشگاه
              </Link>
              <ChevronLeft className="size-3" aria-hidden="true" />
              <span aria-current="page">{page.title}</span>
            </nav>
            <p className="mt-1.5 truncate text-sm font-semibold">
              {page.title}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="me-2 hidden text-xs text-muted-foreground xl:block">
            {today}
          </span>
          <Button asChild size="sm" className="h-9 gap-2 rounded-lg">
            <Link
              to="/products"
              aria-label="افزودن محصول"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">محصول جدید</span>
            </Link>
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-muted-foreground"
                onClick={() => dispatch(toggleDarkmode())}
                aria-label={
                  isDarkmode ? "فعال کردن حالت روشن" : "فعال کردن حالت تاریک"
                }
              >
                {isDarkmode ? (
                  <Sun className="size-[18px]" />
                ) : (
                  <Moon className="size-[18px]" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isDarkmode ? "حالت روشن" : "حالت تاریک"}
            </TooltipContent>
          </Tooltip>
          <div className="h-7 w-px bg-border" />
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto gap-2 rounded-xl p-1.5 sm:gap-3"
                aria-label="منوی مدیر فروشگاه"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
                  <UserRound className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="hidden text-start md:block">
                  <span className="block text-xs font-semibold">
                    مدیر فروشگاه
                  </span>
                  <span className="mt-1 block text-[10px] font-normal text-muted-foreground">
                    پنل مدیریت
                  </span>
                </span>
                <ChevronDown
                  className="hidden size-3.5 text-muted-foreground md:block"
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem>
                <CircleUser />
                <Link to="/profile">پروفایل</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  aria-label={`رنگ‌بندی محیط، تم فعلی: ${currentTheme.label}`}
                >
                  <Palette className="text-primary" aria-hidden="true" />
                  <span>رنگ‌بندی محیط</span>
                  <span
                    data-theme={theme}
                    className="ms-auto size-3 shrink-0 rounded-full border border-border bg-[var(--theme-swatch)]"
                    aria-hidden="true"
                  />
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuLabel>انتخاب رنگ‌بندی</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    aria-label="رنگ‌بندی محیط"
                    value={theme}
                    onValueChange={(value) => {
                      const selected = themes.find((item) => item.id === value);
                      if (selected) dispatch(setTheme(selected.id));
                    }}
                  >
                    {themes.map((item) => (
                      <DropdownMenuRadioItem key={item.id} value={item.id}>
                        <span
                          data-theme={item.id}
                          className="size-5 shrink-0 rounded-full border border-border bg-[var(--theme-swatch)]"
                          aria-hidden="true"
                        />
                        <span className="flex flex-1 items-center justify-between gap-3">
                          <span>{item.label}</span>
                          <span dir="ltr" className="text-xs text-muted-foreground">
                            {item.name}
                          </span>
                        </span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={isDarkmode}
                onCheckedChange={() => dispatch(toggleDarkmode())}
              >
                حالت تاریک
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
