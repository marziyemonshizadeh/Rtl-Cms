import { useAppSelector } from "../../redux/store";
import apiRequests from "../../services/configs";

interface orderProps {
  id: number;
  product: string;
  customer: string;
  orderDate: string;
  orderTime: string;
  price: string;
  discount: string;
  confirmation: boolean;
  onClick: () => void;
  showDetails: () => void;
}
export default function Order({
  id,
  product,
  customer,
  orderDate,
  orderTime,
  price,
  discount,
  confirmation,
  onClick,
  showDetails,
}: orderProps) {
  const data = useAppSelector((state) => state.orders);
  let newData: any = data.orders.find((i) => i.id === id);

  const confirmationHandler = (id: any) => {
    apiRequests.put(`/orders/${id}`, {
      product: newData?.product,
      customer: newData?.customer,
      orderDate: newData?.orderDate,
      orderTime: newData?.orderTime,
      price: newData?.price,
      discount: newData?.discount,
      confirmation: !newData?.confirmation,
    });
  };
  return (
    <tr className={`${confirmation ? `text-slate-400 font-bold` : null} `}>
      <td className="text-center py-8">{product}</td>
      <td className="text-center py-8"> {customer} </td>
      <td className="text-center py-8">{orderDate}</td>
      <td className="text-center py-8">{orderTime}</td>
      <td className="text-center py-8">{price}</td>
      <td className="text-center py-8">{discount}</td>
      <td className="py-8 text-center">
        <button
          type="button"
          className={`m-1 ${confirmation ? "btnDisable " : "btn"}`}
          onClick={showDetails}
        >
          جزئیات
        </button>
        <button
          type="button"
          className={`m-1 ${confirmation ? "btnDisable " : "btn"}`}
          onClick={onClick}
          disabled={confirmation}
        >
          حذف
        </button>
        <button
          type="button"
          className="btn m-1"
          onClick={() => {
            confirmationHandler(id);
          }}
        >
          {confirmation ? <>کنسل</> : <>تایید</>}
        </button>
      </td>
    </tr>
  );
}
