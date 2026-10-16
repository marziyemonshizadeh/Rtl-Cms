import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { removeOrders, setOrderConfirmation } from "@/redux/store/orders";
import DeleteModal from "@/components/Modals/deleteModal";
import DetailsModal from "@/components/Modals/detailsModal";

interface orderProps {
  id: number;
  product: string;
  customer: string;
  orderDate: string;
  orderTime: string;
  price: number | string;
  discount: string;
  confirmation: boolean;
  isMobile?: boolean;
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
}: orderProps) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const dispatch = useAppDispatch();
  const mutation = useAppSelector((state) => state.orders.mutations[id]);
  const pending = !!mutation?.pending;

  const confirmationHandler = () => {
    void dispatch(setOrderConfirmation({ id, confirmation: !confirmation }));
  };

  const modalSubmit = async () => {
    try {
      await dispatch(removeOrders(id)).unwrap();
      setIsShowModal(false);
    } catch {
      return;
    }
  };
  return (
    <>
      <tr className="table-row">
        <td className="table-cell">{product}</td>
        <td className="table-cell"> {customer} </td>
        <td className="table-cell">{orderDate}</td>
        <td className="table-cell">{orderTime}</td>
        <td className="table-cell">{price}</td>
        <td className="table-cell">{discount}</td>
        <td className="table-cell">
          <Badge variant={confirmation ? "approved" : "pending"}>
            {confirmation ? "تایید شده" : "در انتظار"}
          </Badge>
        </td>
        <td className="table-cell">
          <button
            type="button"
            disabled={pending}
            className={`m-1 ${confirmation ? "btnDisable " : "btn"}`}
            onClick={(event) => {
              event.currentTarget.focus();
              setIsShowDetailsModal(true);
            }}
          >
            جزئیات
          </button>
          <button
            type="button"
            disabled={pending || confirmation}
            className={`m-1 ${confirmation ? "btnDisable " : "btn"}`}
            onClick={(event) => {
              event.currentTarget.focus();
              setIsShowModal(true);
            }}
          >
            حذف
          </button>
          {mutation?.error && (
            <p role="alert" className="text-destructive">{mutation.error}</p>
          )}
          <button
            type="button"
            disabled={pending}
            className="btn m-1"
            onClick={confirmationHandler}
          >
            {confirmation ? <>کنسل</> : <>تایید</>}
          </button>
        </td>
      </tr>

      {/* modals */}
      {isShowModal && (
        <DeleteModal
          pending={pending}
          error={mutation?.error}
          submitAction={modalSubmit}
          cancelAction={() => setIsShowModal(false)}
        />
      )}

      {isShowDetailsModal && (
        <DetailsModal
          title="جزئیات سفارش"
          onHide={() => setIsShowDetailsModal(false)}
          items={[
            { label: "محصول", value: product },
            { label: "مشتری", value: customer },
            { label: "تاریخ سفارش", value: orderDate },
            { label: "قیمت", value: price },
            { label: "تخفیف", value: discount },
          ]}
        />
      )}
    </>
  );
}
