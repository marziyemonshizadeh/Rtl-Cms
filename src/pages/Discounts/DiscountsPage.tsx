import { useEffect, useState } from "react";
import DeleteModal from "@/components/Modals/deleteModal";
import usePaginationParams from "@/hooks/usePaginationParams";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import DiscountsList from "./DiscountsList";
import { fetchDiscounts, removeDiscounts, setDiscountConfirmation } from "./store/discountsSlice";

export default function DiscountsPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.discount);
  const { pagination, setPagination } = usePaginationParams();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const selectedDiscount = data.discounts.find((discount) => discount.id === deleteId);
  const selectedMutation = deleteId === null ? undefined : data.mutations[deleteId];

  useEffect(() => {
    void dispatch(fetchDiscounts());
  }, [dispatch]);

  const closeDialog = () => {
    if (!selectedMutation?.pending) setDeleteId(null);
  };

  return (
    <>
      <h1 className="header">لیست کدهای تخفیف ثبت شده</h1>
      <DiscountsList
        discounts={data.discounts}
        loading={data.loading}
        error={data.error}
        mutations={data.mutations}
        pagination={pagination}
        setPagination={setPagination}
        onDelete={(discount) => {
          if (!discount.confirmation) setDeleteId(discount.id);
        }}
        onConfirmation={(discount) => {
          void dispatch(setDiscountConfirmation({ id: discount.id, confirmation: !discount.confirmation }));
        }}
        onRetry={() => void dispatch(fetchDiscounts())}
        retryDisabled={Object.values(data.mutations).some((mutation) => mutation.pending)}
      />
      {selectedDiscount && (
        <DeleteModal
          pending={!!selectedMutation?.pending}
          error={selectedMutation?.error}
          cancelAction={closeDialog}
          submitAction={async () => {
            if (selectedDiscount.confirmation) return;
            try {
              await dispatch(removeDiscounts(selectedDiscount.id)).unwrap();
              setDeleteId(null);
            } catch {
              return;
            }
          }}
        />
      )}
    </>
  );
}
