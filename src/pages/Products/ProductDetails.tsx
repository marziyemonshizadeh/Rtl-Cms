import DetailsModal from "@/components/Modals/detailsModal";
import type { Product } from "./AddProduct/Models/ProductModel";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetails({ product, onClose }: ProductDetailsProps) {
  return (
    <DetailsModal
      title="جزئیات محصول"
      onHide={onClose}
      items={[
        { label: "نام محصول", value: product.name },
        { label: "قیمت", value: `${product.price.toLocaleString("fa-IR")} تومان` },
        { label: "موجودی", value: product.count.toLocaleString("fa-IR") },
      ]}
    />
  );
}
