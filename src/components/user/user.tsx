import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeUser } from "../../redux/store/users";
import DeleteModal from "../Modals/deleteModal";
import DetailsModal from "../Modals/detailsModal";

interface userProps {
  id: number;
  customer: string;
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
}
export default function User({
  id,
  customer,
  userName,
  password,
  phoneNumber,
  email,
}: userProps) {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();
  const dispatch = useDispatch<any>();

  const modalSubmit = () => {
    setIsShowModal(false);
    dispatch(removeUser(id));
    console.log("work", id);

    toast.success("! کاربر مورد نظر با موفقیت حذف شد", {
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

      <tr>
        <td className="text-center py-8"> {customer} </td>
        <td className="text-center py-8">{userName}</td>
        <td className="text-center py-8">{password}</td>
        <td className="text-center py-8">{phoneNumber}</td>
        <td className="text-center py-8">{email}</td>
        <td className="py-8 text-center">
          <button
            type="button"
            className="btn m-1"
            onClick={() => {
              setIsShowModal(true);
              setProductId(id);
            }}
          >
            حذف
          </button>
          <button
            type="button"
            className="btn m-1"
            onClick={() => {
              setIsShowDetailsModal(true);
              setProductId(id);
            }}
          >
            جزئیات
          </button>
          <button type="button" className="btn m-1">
            ویرایش
          </button>
        </td>
      </tr>
      {isShowModal && (
        <DeleteModal
          Id={productId}
          submitAction={modalSubmit}
          cancelAction={() => {
            setIsShowModal(false);
          }}
          remove={removeUser}
        />
      )}

      {isShowDetailsModal && (
        <DetailsModal
          Id={productId}
          user={true}
          // Get={fetchUser}
          getItem="users"
          onHide={() => {
            setIsShowDetailsModal(false);
          }}
        >
          <th className="py-3">اسم</th>
          <th className="py-3">شماره تماس</th>
          <th className="py-3">ایمیل</th>
        </DetailsModal>
      )}
    </>
  );
}
