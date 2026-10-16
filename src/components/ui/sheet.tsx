import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Sheet = Dialog;
const SheetTrigger = DialogTrigger;
const SheetTitle = DialogTitle;
const SheetDescription = DialogDescription;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  Omit<React.ComponentPropsWithoutRef<typeof DialogContent>, "placement" | "pending">
>((props, ref) => <DialogContent placement="sheet" ref={ref} {...props} />);
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription };
