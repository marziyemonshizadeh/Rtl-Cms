import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import DeleteModal from "@/components/Modals/deleteModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeDiscounts, setDiscountConfirmation } from "@/redux/store/discounts";

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
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const mutation = useAppSelector((state) => state.discount.mutations[id]);
  const pending = !!mutation?.pending;

  const confirmationHandler = () => {
    void dispatch(setDiscountConfirmation({ id, confirmation: !confirmation }));
  };

  const modalSubmit = async () => {
    try {
      await dispatch(removeDiscounts(id)).unwrap();
      setIsShowModal(false);
    } catch {
      return;
    }
  };
  return (
    <>
      <tr className="table-row">
        <td className="table-cell"> {discountCode} </td>
        <td className="table-cell">{discountPercent}</td>
        <td className="table-cell">{history}</td>
        <td className="table-cell">{adminName}</td>
        <td className="table-cell">{product}</td>
        <td className="table-cell">
          <Badge variant={confirmation ? "approved" : "pending"}>
            {confirmation ? "تایید شده" : "در انتظار"}
          </Badge>
        </td>
        <td className="table-cell">
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
          <button
            type="button"
            disabled={pending || confirmation}
            className={`m-1 ${confirmation ? "btnDisable " : "btn"}`}
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            حذف
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
    </>
  );
}
