import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  placement?: "center" | "sheet";
  layout?: "default" | "sections";
  pending?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({
  className,
  children,
  dir = "rtl",
  placement = "center",
  layout = "default",
  pending = false,
  onEscapeKeyDown,
  onInteractOutside,
  ...props
}, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none" />
    <DialogPrimitive.Content
      ref={ref}
      dir={dir}
      aria-busy={pending}
      className={cn(
        "fixed z-50 overflow-y-auto bg-popover text-popover-foreground shadow-lg outline-none",
        placement === "center"
          ? cn(
            "inset-x-4 top-1/2 mx-auto max-h-[calc(100dvh-2rem)] max-w-lg -translate-y-1/2 rounded-lg border",
            layout === "sections"
              ? "flex flex-col overflow-hidden"
              : "p-4 pt-12 sm:p-6 sm:pt-12",
          )
          : "inset-y-0 start-0 h-dvh w-3/4 border-e p-6 transition ease-in-out data-[state=closed]:duration-200 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right motion-reduce:animate-none",
        className,
      )}
      onEscapeKeyDown={(event) => {
        onEscapeKeyDown?.(event);
        if (pending) event.preventDefault();
      }}
      onInteractOutside={(event) => {
        onInteractOutside?.(event);
        if (pending) event.preventDefault();
      }}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        disabled={pending}
        className="absolute end-3 top-3 z-10 rounded-sm p-1.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <X className="size-4" aria-hidden="true" />
        <span className="sr-only">بستن</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex shrink-0 flex-col gap-2 border-b px-5 py-5 pe-12 text-start", className)} {...props} />;
}

function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-h-0 flex-1 overflow-y-auto px-5 py-5", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex shrink-0 flex-wrap items-center justify-end gap-3 border-t px-5 py-4", className)} {...props} />;
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
