import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ModalsTemplateProps {
  title: string;
  description: string;
  onClose: () => void;
  pending?: boolean;
  children: ReactNode;
}

export default function ModalsTemplate({
  title,
  description,
  onClose,
  pending = false,
  children,
}: ModalsTemplateProps) {
  const [returnFocusTo] = useState(() =>
    typeof document !== "undefined" && document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  );

  return (
    <Dialog open onOpenChange={(open) => {
      if (!open && !pending) onClose();
    }}>
      <DialogContent
        pending={pending}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          const target = returnFocusTo?.isConnected
            && !returnFocusTo.matches(":disabled")
            && returnFocusTo.getClientRects().length
            ? returnFocusTo
            : document.getElementById("main-content");
          target?.focus({ preventScroll: true });
        }}
      >
        <div className="mb-5 space-y-2 border-b pb-4 text-start">
          <DialogTitle className="break-words text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm leading-6 text-muted-foreground">
            {description}
          </DialogDescription>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}
