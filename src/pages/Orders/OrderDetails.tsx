import DetailsModal from "@/components/Modals/detailsModal";
import type Order from "./models/order";

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetails({ order, onClose }: OrderDetailsProps) {
  return (
    <DetailsModal
      title="جزئیات سفارش"
      onHide={onClose}
      items={[
        { label: "محصول", value: order.product },
        { label: "مشتری", value: order.customer },
        { label: "تاریخ سفارش", value: order.orderDate },
        { label: "قیمت", value: order.price },
        { label: "تخفیف", value: order.discount },
      ]}
    />
  );
}
