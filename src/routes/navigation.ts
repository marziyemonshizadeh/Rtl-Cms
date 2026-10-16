import {
  LayoutDashboard,
  MessagesSquare,
  Package,
  ShoppingBag,
  TicketPercent,
  UsersRound,
} from "lucide-react";

export const navigationItems = [
  { path: "/", title: "پیشخوان", icon: LayoutDashboard },
  { path: "/products", title: "محصولات", icon: Package },
  { path: "/orders", title: "سفارش‌ها", icon: ShoppingBag },
  { path: "/users", title: "کاربران", icon: UsersRound },
  { path: "/comments", title: "دیدگاه‌ها", icon: MessagesSquare },
  { path: "/discount", title: "تخفیف‌ها", icon: TicketPercent },
];
