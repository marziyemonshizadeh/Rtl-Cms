import { useEffect, useState } from "react";
import DeleteModal from "@/components/Modals/deleteModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct/AddProduct";
import usePaginationParams from "@/hooks/usePaginationParams";
import ProductsList from "./ProductsList";
import { clearProductMutationError, fetchProduct, removeProduct } from "./store/productsSlice";

type ProductDialog = { type: "create" } | { type: "details" | "edit" | "delete"; id: number } | null;

export default function ProductsPage() {
  const data = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const { pagination, setPagination } = usePaginationParams();
  const [dialog, setDialog] = useState<ProductDialog>(null);
  const selectedId = dialog && "id" in dialog ? dialog.id : undefined;
  const selectedProduct = data.products.find((product) => product.id === selectedId);
  const selectedMutation = selectedId !== undefined ? data.mutations[selectedId] : undefined;

  useEffect(() => {
    void dispatch(fetchProduct());
  }, [dispatch]);

  const closeDialog = () => {
    if (!selectedMutation?.pending) setDialog(null);
  };

  const openDialog = (nextDialog: NonNullable<ProductDialog>) => {
    dispatch(clearProductMutationError(nextDialog.type === "create" ? "create" : nextDialog.id));
    setDialog(nextDialog);
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="header mb-0">مدیریت محصولات</h1>
      </div>
      <ProductsList
        products={data.products}
        pagination={pagination}
        setPagination={setPagination}
        loading={data.loading}
        error={data.error}
        isPending={(product) => !!data.mutations[product.id]?.pending}
        onCreate={() => openDialog({ type: "create" })}
        createDisabled={data.loading || !!data.mutations.create?.pending}
        onDetails={(product) => openDialog({ type: "details", id: product.id })}
        onEdit={(product) => openDialog({ type: "edit", id: product.id })}
        onDelete={(product) => openDialog({ type: "delete", id: product.id })}
        onRetry={() => void dispatch(fetchProduct())}
        retryDisabled={Object.values(data.mutations).some((mutation) => mutation.pending)}
      />
      {dialog?.type === "details" && selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={closeDialog} />
      )}
      {(dialog?.type === "create" || (dialog?.type === "edit" && selectedProduct)) && (
        <AddProduct
          key={dialog.type === "edit" ? selectedProduct?.id : "create"}
          product={dialog.type === "edit" ? selectedProduct : undefined}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog?.type === "delete" && selectedProduct && (
        <DeleteModal
          pending={!!selectedMutation?.pending}
          error={selectedMutation?.error}
          cancelAction={closeDialog}
          submitAction={async () => {
            try {
              await dispatch(removeProduct(selectedProduct.id)).unwrap();
              setDialog(null);
            } catch {
              return;
            }
          }}
        />
      )}
    </>
  );
}
