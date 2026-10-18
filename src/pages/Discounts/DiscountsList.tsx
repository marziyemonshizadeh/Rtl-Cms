import type { ReactElement } from "react";
import MetronicTable, { type MetronicColumn } from "@/components/@base/Table/MetronicTable/MetronicTable";
import TableRowActions, { type TableRowAction } from "@/components/@base/TableRowActions";
import { Badge } from "@/components/ui/badge";
import type usePaginationParams from "@/hooks/usePaginationParams";
import type Discount from "./models/discount";

interface DiscountsListProps extends Pick<ReturnType<typeof usePaginationParams>, "pagination" | "setPagination"> {
  discounts: Discount[];
  loading: boolean;
  error: string | null;
  mutations: Record<string, { pending: boolean; error: string | null }>;
  onDelete: (discount: Discount) => void;
  onConfirmation: (discount: Discount) => void;
  onRetry: () => void;
  retryDisabled: boolean;
}

export default function DiscountsList({
  discounts,
  loading,
  error,
  mutations,
  pagination,
  setPagination,
  onDelete,
  onConfirmation,
  onRetry,
  retryDisabled,
}: DiscountsListProps) {
  const actions: TableRowAction<Discount>[] = [
    {
      id: "details_confirm",
      action: "confirm",
      label: (discount) => discount.confirmation ? "کنسل" : "تایید",
      props: (discount) => ({ onClick: () => onConfirmation(discount), disabled: !!mutations[discount.id]?.pending }),
    },
    {
      id: "details_delete",
      action: "delete",
      label: "حذف",
      props: (discount) => ({ onClick: () => onDelete(discount), disabled: !!mutations[discount.id]?.pending || discount.confirmation }),
    },
  ];
  const columns: (MetronicColumn<Discount> | ReactElement)[] = [
    { id: "discountCode", accessorFn: (discount) => discount.discountCode, header: "کد تخفیف", cell: (info) => String(info.getValue()), sorted: true, size: 150 },
    { id: "discountPercent", accessorFn: (discount) => discount.discountPercent, header: "درصد تخفیف", cell: (info) => String(info.getValue()), sorted: true, size: 110 },
    { id: "history", accessorFn: (discount) => discount.history, header: "تاریخ ثبت", cell: (info) => String(info.getValue()), sorted: true, size: 130 },
    { id: "adminName", accessorFn: (discount) => discount.adminName, header: "ثبت شده توسط", cell: (info) => String(info.getValue()), sorted: true, size: 150 },
    { id: "product", accessorFn: (discount) => discount.product, header: "ساخته شده برای", cell: (info) => String(info.getValue()), sorted: true, size: 180 },
    {
      id: "confirmation",
      accessorFn: (discount) => discount.confirmation,
      header: "وضعیت",
      cell: (info) => (
        <div className="space-y-2">
          <Badge variant={info.getValue() ? "approved" : "pending"}>
            {info.getValue() ? "تایید شده" : "در انتظار"}
          </Badge>
          {mutations[info.row.original.id]?.error && (
            <p role="alert" className="text-xs text-destructive">{mutations[info.row.original.id].error}</p>
          )}
        </div>
      ),
      sorted: true,
      size: 120,
    },
    <TableRowActions key="details_actions" actions={actions} haveSeparateColumns defaultColumnSize={40} />,
  ];

  return (
    <MetronicTable
      data={discounts}
      columns={columns}
      isLoading={loading}
      pagination={pagination}
      setPagination={setPagination}
      options={{ title: "لیست کدهای تخفیف", totalCount: discounts.length, haveFilter: true, havePagination: true, haveStickyHeader: true, haveIndex: true }}
      error={error}
      onRetry={onRetry}
      retryDisabled={retryDisabled}
      emptyMessage="هیچ تخفیفی یافت نشد"
    />
  );
}
