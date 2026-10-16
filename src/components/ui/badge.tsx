import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: "approved" | "pending";
}

const variants = {
  approved: "badge-approved",
  pending: "badge-pending",
};

export function Badge({ variant, className, ...props }: BadgeProps) {
  return <span className={cn(variants[variant], className)} {...props} />;
}
