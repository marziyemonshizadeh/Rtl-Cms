import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../redux/store";
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
  // onClick: () => void;
  // showDetails: () => void;
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
}: // onClick,
// showDetails,
orderProps) {
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
          Id={id}
          order={true}
          getItem="orders"
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
