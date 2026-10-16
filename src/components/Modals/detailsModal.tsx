import type { ReactNode } from "react";
import ModalsTemplate from "@/components/modalsTemplate/modalsTemplate";

interface DetailsModalProps {
  title: string;
  onHide: () => void;
  items: readonly { label: string; value: ReactNode }[];
}

export default function DetailsModal({ title, onHide, items }: DetailsModalProps) {
  return (
    <ModalsTemplate
      title={title}
      description="اطلاعات ثبت‌شده را مشاهده کنید."
      onClose={onHide}
    >
      <dl className="grid gap-4 text-start sm:grid-cols-2">
        {items.map(({ label, value }) => (
          <div key={label} className="min-w-0 space-y-1">
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="whitespace-pre-wrap break-words text-sm leading-7 [overflow-wrap:anywhere]">{value}</dd>
          </div>
        ))}
      </dl>
    </ModalsTemplate>
  );
}
