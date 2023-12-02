interface orderProps {
  product: string;
  customer: string;
  orderDate: string;
  orderTime: string;
  price: string;
  discount: string;
  onClick: () => void;
  showDetails: () => void;
}
export default function Order({
  product,
  customer,
  orderDate,
  orderTime,
  price,
  discount,
  onClick,
  showDetails,
}: orderProps) {
  return (
    <tr>
      <td className="text-center py-8">{product}</td>
      <td className="text-center py-8"> {customer} </td>
      <td className="text-center py-8">{orderDate}</td>
      <td className="text-center py-8">{orderTime}</td>
      <td className="text-center py-8">{price}</td>
      <td className="text-center py-8">{discount}</td>
      <td className="py-8 text-center">
        <button type="button" className="btn m-1" onClick={showDetails}>
          جزئیات
        </button>
        <button type="button" className="btn m-1" onClick={onClick}>
          حذف
        </button>
        <button type="button" className="btn m-1">
          بعدا بررسی می شود
        </button>
        <button type="button" className="btn m-1">
          تایید
        </button>
      </td>
    </tr>
  );
}
