import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeOrders } from "../../redux/store/orders";
import apiRequests from "../../services/configs";
import DeleteModal from "../Modals/deleteModal";
import DetailsModal from "../Modals/detailsModal";

interface orderProps {
  id: number;
  product: string;
  customer: string;
  orderDate: string;
  orderTime: string;
  price: string;
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
  const confirmationHandler = (id: any) => {
    apiRequests.put(`/orders/${id}`, {
      product: product,
      customer: customer,
      orderDate: orderDate,
      orderTime: orderTime,
      price: price,
      discount: discount,
      confirmation: !confirmation,
    });
    toast.success("! وضعیت سفارش مورد نظر با موفقیت تغییر کرد", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState<boolean>(false);
  const dispatch = useDispatch<any>();

  const modalSubmit = () => {
    setIsShowModal(false);
    dispatch(removeOrders(id));
    toast.success("! سفارش مورد نظر با موفقیت حذف شد", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
          <span className={confirmation ? "badge-approved" : "badge-pending"}>
            {confirmation ? "تایید شده" : "در انتظار"}
          </span>
        </td>
        <td className="table-cell">
          <button
            type="button"
            className={`m-1 ${confirmation ? "btnDisable " : "btn"}`}
            onClick={() => setIsShowDetailsModal(true)}
          >
            جزئیات
          </button>
          <button
            type="button"
            className={`m-1 ${confirmation ? "btnDisable " : "btn"}`}
            onClick={() => {
              setIsShowModal(true);
            }}
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

      {/* modals */}
      {isShowModal && (
        <DeleteModal
          Id={id}
          submitAction={modalSubmit}
          cancelAction={() => setIsShowModal(false)}
          remove={removeOrders}
        />
      )}

      {isShowDetailsModal && (
        <DetailsModal
          product={product}
          customer={customer}
          orderDate={orderDate}
          price={price}
          discount={discount}
          order={true}
          onHide={() => setIsShowDetailsModal(false)}
        >
          <th className="py-3">محصول</th>
          <th className="py-3"> مشتری</th>
          <th className="py-3">تاریخ </th>
          <th className="py-3">قیمت</th>
          <th className="py-3"> تخفیف</th>
        </DetailsModal>
      )}
    </>
  );
}
