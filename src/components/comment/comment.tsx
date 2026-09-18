import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeComment } from "../../redux/store/comments";
import apiRequests from "../../services/configs";
import DeleteModal from "../Modals/deleteModal";
import ShowComment from "../Modals/showCommentModal";

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
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowComment, setIsShowComment] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();

  const dispatch = useDispatch<any>();

  const modalSubmit = () => {
    setIsShowModal(false);
    console.log(id);
    dispatch(removeComment(id));
    toast.success("! کامنت مورد نظر با موفقیت حذف شد", {
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
  const modalCancel = () => {
    setIsShowModal(false);
  };
  return (
    <>
      <ToastContainer />

      <tr className="table-row">
        <td className={`table-cell`}>{name} </td>
        <td className="table-cell"> {product} </td>
        <td className="table-cell">
          <button
            type="button"
            className={`${confirmation ? "btnDisable " : "btn"}`}
            disabled={confirmation}
            onClick={() => {
              setProductId(id);
              setIsShowComment(true);
            }}
          >
            دیدن کامنت
          </button>
        </td>
        <td className="table-cell">{history}</td>
        <td className="table-cell">{time}</td>
        <td className="table-cell">
          <span className={confirmation ? "badge-approved" : "badge-pending"}>
            {confirmation ? "تایید شده" : "در انتظار"}
          </span>
        </td>
        <td className="table-cell">
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
              console.log("this", id, "comments");
              apiRequests.put(`/comments/${id}`, {
                name: name,
                product: product,
                history: history,
                time: time,
                comment: comment,
                confirmation: !confirmation,
              });
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
          cancelAction={modalCancel}
          remove={removeComment}
        />
      )}
      {console.log("id=", productId)}
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
