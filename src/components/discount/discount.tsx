import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../components/Modals/deleteModal";
import { useAppSelector } from "../../redux/store";
import { removeDiscounts } from "../../redux/store/discounts";
import apiRequests from "../../services/configs";

interface discountProps {
  id: number;
  confirmation: boolean;
  adminName: string;
  discountPercent: string;
  discountCode: string;
  product: string;
  history: string;
  isMobile?: boolean;
}
export default function Discount({
  id,
  discountCode,
  discountPercent,
  history,
  adminName,
  product,
  confirmation,
}: discountProps) {
  const dispatch = useDispatch<any>();
  const data = useAppSelector((state) => state.discount);
  let newData: any = data.discounts.find((i) => i.id === id);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const confirmationHandler = (id: any) => {
    console.log("newData=", newData);
    console.log("id=", id);

    apiRequests.put(`/discounts/${id}`, {
      discountCode: newData?.discountCode,
      discountPercent: newData?.discountPercent,
      history: newData?.history,
      adminName: newData?.adminName,
      product: newData?.product,
      confirmation: !newData?.confirmation,
    });
  };
  const modalSubmit = () => {
    setIsShowModal(false);
    console.log("remove id", id);

    dispatch(removeDiscounts(id));
    toast.success("! تخفیف مورد نظر با موفقیت حذف شد", {
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
      <ToastContainer />
      <tr className="table-row">
        <td className="table-cell"> {discountCode} </td>
        <td className="table-cell">{discountPercent}</td>
        <td className="table-cell">{history}</td>
        <td className="table-cell">{adminName}</td>
        <td className="table-cell">{product}</td>
        <td className="table-cell">
          <span className={confirmation ? "badge-approved" : "badge-pending"}>
            {confirmation ? "تایید شده" : "در انتظار"}
          </span>
        </td>
        <td className="table-cell">
          <button
            type="button"
            className="btn m-1"
            onClick={() => {
              confirmationHandler(id);
            }}
          >
            {confirmation ? <>کنسل</> : <>تایید</>}
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
        </td>
      </tr>
      {/* modals */}
      {isShowModal && (
        <DeleteModal
          Id={id}
          submitAction={modalSubmit}
          cancelAction={() => setIsShowModal(false)}
          remove={removeDiscounts}
        />
      )}
    </>
  );
}
