interface orderProps {
  product: string;
  customer: string;
  orderDate: string;
  orderTime: string;
  price: string;
  discount: string;
}
export default function Order({
  product,
  customer,
  orderDate,
  orderTime,
  price,
  discount,
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
        <button type="button" className="btn">
          جزئیات
        </button>
        <button type="button" className="btn">
          حذف
        </button>
        <button type="button" className="btn">
          بعدا بررسی می شود
        </button>
        <button type="button" className="btn">
          تایید
        </button>
      </td>
    </tr>
  );
}
