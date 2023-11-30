import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeComment } from "../../redux/store/comments";
import DeleteModal from "../Modals/deleteModal";
import ShowComment from "../Modals/showCommentModal";
// import axios from "axios";

interface commentProps {
  id: number;
  confirmation: boolean;
  name: string;
  product: string;
  history: string;
  time: string;
}
export default function Comment({
  id,
  confirmation,
  name,
  product,
  history,
  time,
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

      <tr className={`${confirmation ? `text-slate-400 font-bold` : null} `}>
        <td className={`text-center  py-8`}>{name} </td>
        <td className="text-center py-8"> {product} </td>
        <td className="text-center py-8">
          <button
            type="button"
            className="btn"
            disabled={confirmation}
            onClick={() => {
              setProductId(id);
              setIsShowComment(true);
            }}
          >
            دیدن کامنت
          </button>
        </td>
        <td className="text-center py-8">{history}</td>
        <td className="text-center py-8">{time}</td>
        <td className="py-8 text-center">
          <button
            type="button"
            className="btn m-1"
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
              //   axios.put(` http://localhost:3001/comments`, {
              //     title: "Success",
              //     body: "The record had been successfully updated"
              // }).then ((response) => {setTableData(response.data);})
            }}
            disabled={confirmation}
          >
            تایید
          </button>
        </td>
      </tr>
      {/* modals */}
      {isShowModal && (
        <DeleteModal
          productId={id}
          submitAction={modalSubmit}
          cancelAction={modalCancel}
          remove={removeComment}
        />
      )}
      {console.log("id=", productId)}
      {isShowComment && (
        <ShowComment
          id={productId}
          onHide={() => {
            setIsShowComment(false);
          }}
        />
      )}
    </>
  );
}
