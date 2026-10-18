import MetronicTable, { type MetronicColumn } from "@/components/@base/Table/MetronicTable/MetronicTable";
import TableRowActions, { type TableRowAction } from "@/components/@base/TableRowActions";
import { Badge } from "@/components/ui/badge";
import type usePaginationParams from "@/hooks/usePaginationParams";
import type Order from "./models/order";

interface OrdersListProps extends Pick<ReturnType<typeof usePaginationParams>, "pagination" | "setPagination"> {
  orders: Order[];
  loading: boolean;
  error: string | null;
  mutations: Record<string, { pending: boolean; error: string | null }>;
  onDetails: (order: Order) => void;
  onDelete: (order: Order) => void;
  onConfirmation: (order: Order) => void;
  onRetry: () => void;
  retryDisabled: boolean;
}

export default function OrdersList({
  orders,
  loading,
  error,
  mutations,
  pagination,
  setPagination,
  onDetails,
  onDelete,
  onConfirmation,
  onRetry,
  retryDisabled,
}: OrdersListProps) {
  const isPending = (row: Order) => !!mutations[row.id]?.pending;
  const actions: TableRowAction<Order>[] = [
    { id: "details_delete", action: "delete", label: "حذف", props: (row) => ({ onClick: () => onDelete(row), disabled: isPending(row) || row.confirmation }) },
    { id: "details_view", action: "view", label: "جزئیات", props: (row) => ({ onClick: () => onDetails(row), disabled: isPending(row) }) },
    { id: "details_confirm", action: "confirm", label: (row) => row.confirmation ? "کنسل" : "تایید", props: (row) => ({ onClick: () => onConfirmation(row), disabled: isPending(row) }) },
  ];
  const columns: MetronicColumn<Order>[] = [
    { id: "product", accessorFn: (order) => order.product, header: "نام محصول خریداری شده", cell: (info) => String(info.getValue()), sorted: true, size: 200 },
    { id: "customer", accessorFn: (order) => order.customer, header: "نام خریدار", cell: (info) => String(info.getValue()), sorted: true, size: 140 },
    { id: "orderDate", accessorFn: (order) => order.orderDate, header: "تاریخ سفارش", cell: (info) => String(info.getValue()), sorted: true, size: 120 },
    { id: "orderTime", accessorFn: (order) => order.orderTime, header: "ساعت سفارش", cell: (info) => String(info.getValue()), sorted: true, size: 100 },
    { id: "price", accessorFn: (order) => order.price, header: "مبلغ کل", cell: (info) => String(info.getValue()), sorted: true, size: 130 },
    { id: "discount", accessorFn: (order) => order.discount, header: "تخفیف اعمال شده", cell: (info) => String(info.getValue()), sorted: true, size: 120 },
    {
      id: "confirmation",
      accessorFn: (order) => order.confirmation,
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
    {
      id: "details_actions",
      header: "عملیات",
      cell: ({ row }) => <TableRowActions actions={actions} row={row.original} />,
      size: 250,
    },
  ];

  return (
    <MetronicTable
      data={orders}
      columns={columns}
      isLoading={loading}
      pagination={pagination}
      setPagination={setPagination}
      options={{ title: "لیست سفارشات", totalCount: orders.length, haveFilter: true, havePagination: true, haveStickyHeader: true, haveIndex: true, isAutoColumnSize: true }}
      error={error}
      onRetry={onRetry}
      retryDisabled={retryDisabled}
      emptyMessage="هیچ سفارشی یافت نشد"
    />
  );
}
