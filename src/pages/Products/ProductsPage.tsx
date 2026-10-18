import { useEffect, useState } from "react";
import DeleteModal from "@/components/Modals/deleteModal";
import EditModal from "@/components/Modals/editModal";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct/AddProduct";
import usePaginationParams from "@/hooks/usePaginationParams";
import ProductsList from "./ProductsList";
import { addProduct, clearProductMutationError, fetchProduct, removeProduct, updateProduct } from "./store/productsSlice";

type ProductDialog = { type: "details" | "edit" | "delete"; id: number } | null;

export default function ProductsPage() {
  const data = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const { pagination, setPagination } = usePaginationParams();
  const [dialog, setDialog] = useState<ProductDialog>(null);
  const selectedProduct = data.products.find((product) => product.id === dialog?.id);
  const selectedMutation = dialog ? data.mutations[dialog.id] : undefined;
  const createMutation = data.mutations.create;

  useEffect(() => {
    void dispatch(fetchProduct());
  }, [dispatch]);

  const closeDialog = () => {
    if (!selectedMutation?.pending) setDialog(null);
  };

  const openDialog = (type: NonNullable<ProductDialog>["type"], id: number) => {
    dispatch(clearProductMutationError(id));
    setDialog({ type, id });
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="header mb-0">مدیریت محصولات</h1>
      </div>
      <Card id="new-product" tabIndex={-1} aria-labelledby="new-product-title" className="scroll-mt-[calc(var(--header-height)+1rem)]">
        <h2 id="new-product-title" className="mb-5 text-base font-semibold">افزودن محصول جدید</h2>
        <AddProduct
          mode="create"
          pending={!!createMutation?.pending}
          disabled={data.loading}
          error={createMutation?.error}
          onSubmit={async (values) => {
            await dispatch(addProduct(values)).unwrap();
          }}
        />
      </Card>
      <ProductsList
        products={data.products}
        pagination={pagination}
        setPagination={setPagination}
        loading={data.loading}
        error={data.error}
        isPending={(product) => !!data.mutations[product.id]?.pending}
        onDetails={(product) => openDialog("details", product.id)}
        onEdit={(product) => openDialog("edit", product.id)}
        onDelete={(product) => openDialog("delete", product.id)}
        onRetry={() => void dispatch(fetchProduct())}
        retryDisabled={Object.values(data.mutations).some((mutation) => mutation.pending)}
      />
      {dialog?.type === "details" && selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={closeDialog} />
      )}
      {dialog?.type === "edit" && selectedProduct && (
        <EditModal pending={!!selectedMutation?.pending} onClose={closeDialog}>
          <AddProduct
            key={selectedProduct.id}
            mode="edit"
            defaultValues={selectedProduct}
            pending={!!selectedMutation?.pending}
            error={selectedMutation?.error}
            onCancel={closeDialog}
            onSubmit={async (values) => {
              await dispatch(updateProduct({ id: selectedProduct.id, changes: values })).unwrap();
              setDialog(null);
            }}
          />
        </EditModal>
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
