import { useEffect, useState } from "react";
import DeleteModal from "@/components/Modals/deleteModal";
import usePaginationParams from "@/hooks/usePaginationParams";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import OrderDetails from "./OrderDetails";
import OrdersList from "./OrdersList";
import { fetchOrders, removeOrders, setOrderConfirmation } from "./store/ordersSlice";

type OrderDialog = { type: "details" | "delete"; id: number } | null;

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.orders);
  const { pagination, setPagination } = usePaginationParams();
  const [dialog, setDialog] = useState<OrderDialog>(null);
  const selectedOrder = data.orders.find((order) => order.id === dialog?.id);
  const selectedMutation = dialog ? data.mutations[dialog.id] : undefined;

  useEffect(() => {
    void dispatch(fetchOrders());
  }, [dispatch]);

  const closeDialog = () => {
    if (!selectedMutation?.pending) setDialog(null);
  };

  return (
    <>
      <h1 className="header">لیست سفارشات ثبت شده</h1>
      <OrdersList
        orders={data.orders}
        loading={data.loading}
        error={data.error}
        mutations={data.mutations}
        pagination={pagination}
        setPagination={setPagination}
        onDetails={(order) => setDialog({ type: "details", id: order.id })}
        onDelete={(order) => {
          if (!order.confirmation) setDialog({ type: "delete", id: order.id });
        }}
        onConfirmation={(order) => {
          void dispatch(setOrderConfirmation({ id: order.id, confirmation: !order.confirmation }));
        }}
        onRetry={() => void dispatch(fetchOrders())}
        retryDisabled={Object.values(data.mutations).some((mutation) => mutation.pending)}
      />
      {dialog?.type === "details" && selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={closeDialog} />
      )}
      {dialog?.type === "delete" && selectedOrder && (
        <DeleteModal
          pending={!!selectedMutation?.pending}
          error={selectedMutation?.error}
          cancelAction={closeDialog}
          submitAction={async () => {
            if (selectedOrder.confirmation) return;
            try {
              await dispatch(removeOrders(selectedOrder.id)).unwrap();
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
