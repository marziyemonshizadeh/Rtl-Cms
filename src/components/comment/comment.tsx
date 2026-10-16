import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { removeComment, setCommentConfirmation } from "@/redux/store/comments";
import DeleteModal from "@/components/Modals/deleteModal";
import ShowComment from "@/components/Modals/showCommentModal";

interface commentProps {
  id: number;
  confirmation: boolean;
  name: string;
  product: string;
  history: string;
  time: string;
  comment: string;
  isMobile?: boolean;
}
export default function Comment({
  id,
  confirmation,
  name,
  product,
  history,
  time,
  comment,
}: commentProps) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const dispatch = useAppDispatch();
  const mutation = useAppSelector((state) => state.comments.mutations[id]);
  const pending = !!mutation?.pending;

  const confirmationHandler = () => {
    void dispatch(setCommentConfirmation({ id, confirmation: !confirmation }));
  };

  const modalSubmit = async () => {
    try {
      await dispatch(removeComment(id)).unwrap();
      setIsShowModal(false);
    } catch {
      return;
    }
  };
  return (
    <>
      <tr className="table-row">
        <td className={`table-cell`}>{name} </td>
        <td className="table-cell"> {product} </td>
        <td className="table-cell">
          <button
            type="button"
            disabled={pending || confirmation}
            className={`${confirmation ? "btnDisable " : "btn"}`}
            onClick={() => {
              setIsShowComment(true);
            }}
          >
            دیدن کامنت
          </button>
        </td>
        <td className="table-cell">{history}</td>
        <td className="table-cell">{time}</td>
        <td className="table-cell">
          <Badge variant={confirmation ? "approved" : "pending"}>
            {confirmation ? "تایید شده" : "در انتظار"}
          </Badge>
        </td>
        <td className="table-cell">
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

      {isShowComment && (
        <ShowComment
          comment={comment}
          onHide={() => {
            setIsShowComment(false);
          }}
        />
      )}
    </>
  );
}
