import type { ReactElement } from "react";
import { Plus } from "lucide-react";
import MetronicTable, { type MetronicColumn } from "@/components/@base/Table/MetronicTable/MetronicTable";
import TableRowActions, { type TableRowAction } from "@/components/@base/TableRowActions";
import { Button } from "@/components/ui/button";
import type usePaginationParams from "@/hooks/usePaginationParams";
import type { Product } from "./AddProduct/Models/ProductModel";

interface ProductsListProps extends ReturnType<typeof usePaginationParams> {
  products: Product[];
  loading: boolean;
  error: string | null;
  isPending: (product: Product) => boolean;
  onDetails: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onRetry: () => void;
  retryDisabled: boolean;
}

export default function ProductsList({
  products, loading, error, pagination, setPagination, isPending, onDetails, onEdit, onDelete, onRetry, retryDisabled,
}: ProductsListProps) {
  const actions: TableRowAction<Product>[] = [
    { id: "details_delete", action: "delete", label: "حذف", props: (row) => ({ onClick: () => onDelete(row), disabled: isPending(row) }) },
    { id: "details_view", action: "view", label: "جزئیات", props: (row) => ({ onClick: () => onDetails(row), disabled: isPending(row) }) },
    { id: "details_edit", action: "edit", label: "ویرایش", props: (row) => ({ onClick: () => onEdit(row), disabled: isPending(row) }) },
  ];
  const columns: (MetronicColumn<Product> | ReactElement)[] = [
    { id: "image", accessorFn: (row) => row.img, header: "عکس", size: 120, cell: (info) => <img src={String(info.getValue())} alt={info.row.original.name} className="mx-auto max-h-20 max-w-full rounded object-contain" /> },
    { id: "name", accessorFn: (row) => row.name, header: "اسم", sorted: true, size: 200, cell: (info) => <span className="break-words">{String(info.getValue())}</span> },
    { id: "price", accessorFn: (row) => row.price, header: "قیمت", sorted: true, size: 170, cell: (info) => `${Number(info.getValue()).toLocaleString("fa-IR")} تومان` },
    { id: "count", accessorFn: (row) => row.count, header: "موجودی", sorted: true, size: 100, cell: (info) => Number(info.getValue()).toLocaleString("fa-IR") },
    <TableRowActions key="details_actions" actions={actions} haveSeparateColumns defaultColumnSize={40} />,
  ];

  return (
    <MetronicTable
      data={products}
      columns={columns}
      isLoading={loading}
      pagination={pagination}
      setPagination={setPagination}
      options={{ title: "لیست محصولات", totalCount: products.length, haveFilter: true, havePagination: true, haveStickyHeader: true, haveIndex: true }}
      addNewItemBtn={<Button asChild size="sm"><a href="#new-product"><Plus aria-hidden="true" />افزودن محصول</a></Button>}
      error={error}
      onRetry={onRetry}
      retryDisabled={retryDisabled}
      emptyMessage="هیچ محصولی یافت نشد"
    />
  );
}
