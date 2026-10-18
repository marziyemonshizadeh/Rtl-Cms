import type { ButtonHTMLAttributes } from "react";
import { Check, Eye, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface TableRowAction<T> {
  id: string;
  action: "delete" | "view" | "edit" | "confirm";
  label: string | ((row: T) => string);
  props: (row: T) => Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled">;
}

export interface TableRowActionsProps<T> {
  actions: TableRowAction<T>[];
  row: T;
}

const icons = { delete: Trash2, view: Eye, edit: SquarePen, confirm: Check };

export default function TableRowActions<T>({ actions, row }: TableRowActionsProps<T>) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {actions.map((action) => {
        const props = action.props(row);
        const label = typeof action.label === "function" ? action.label(row) : action.label;
        const Icon = icons[action.action];
        return (
          <Tooltip key={action.id}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="metronic-action"
                data-action={action.action}
                aria-label={label}
                disabled={props.disabled}
                onClick={(event) => {
                  event.currentTarget.focus();
                  props.onClick?.(event);
                }}
              >
                <Icon aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
