import DataTable, { type DataTableColumn } from "@/components/@base/Table/DataTable";
import { Button } from "@/components/ui/button";
import type { Product } from "./models/product";

interface ProductsListProps {
  products: readonly Product[];
  loading: boolean;
  error: string | null;
  isPending: (product: Product) => boolean;
  onDetails: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onRetry: () => void;
  retryDisabled: boolean;
}

const columns: DataTableColumn<Product>[] = [
  {
    id: "image",
    header: "عکس",
    render: (product) => (
      <img src={product.img} alt={product.name} className="mx-auto max-h-24 max-w-full rounded object-contain" />
    ),
  },
  { id: "name", header: "اسم", render: (product) => product.name },
  { id: "price", header: "قیمت", render: (product) => `${product.price.toLocaleString("fa-IR")} تومان` },
  { id: "count", header: "موجودی", render: (product) => product.count.toLocaleString("fa-IR") },
];

export default function ProductsList({
  products,
  loading,
  error,
  isPending,
  onDetails,
  onEdit,
  onDelete,
  onRetry,
  retryDisabled,
}: ProductsListProps) {
  return (
    <DataTable
      title="لیست محصولات"
      toolbar={!loading && !error && (
        <span className="text-xs text-muted-foreground">{products.length.toLocaleString("fa-IR")} محصول</span>
      )}
      records={products}
      columns={columns}
      getRowId={(product) => product.id}
      renderActions={(product) => (
        <div role="group" aria-label={`عملیات ${product.name}`} aria-busy={isPending(product)} className="flex flex-wrap justify-end gap-2 md:justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending(product)}
            onClick={(event) => {
              event.currentTarget.focus();
              onDetails(product);
            }}
          >
            جزئیات
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={isPending(product)}
            onClick={(event) => {
              event.currentTarget.focus();
              onDelete(product);
            }}
          >
            حذف
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending(product)}
            onClick={(event) => {
              event.currentTarget.focus();
              onEdit(product);
            }}
          >
            ویرایش
          </Button>
        </div>
      )}
      loading={loading}
      error={error}
      emptyMessage="هیچ محصولی یافت نشد"
      onRetry={onRetry}
      retryDisabled={retryDisabled}
    />
  );
}
