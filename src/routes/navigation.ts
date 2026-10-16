import {
  LayoutDashboard,
  MessagesSquare,
  Package,
  ShoppingBag,
  TicketPercent,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

interface NavigationItem {
  path: `/${string}`;
  title: string;
  icon: LucideIcon;
}

export const navigationItems = [
  { path: "/", title: "پیشخوان", icon: LayoutDashboard },
  { path: "/products", title: "محصولات", icon: Package },
  { path: "/orders", title: "سفارش‌ها", icon: ShoppingBag },
  { path: "/users", title: "کاربران", icon: UsersRound },
  { path: "/comments", title: "دیدگاه‌ها", icon: MessagesSquare },
  { path: "/discount", title: "تخفیف‌ها", icon: TicketPercent },
] satisfies NavigationItem[];
