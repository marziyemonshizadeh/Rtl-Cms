import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeUser } from "../../redux/store/users";
import apiRequests from "../../services/configs";
import DeleteModal from "../Modals/deleteModal";
import DetailsModal from "../Modals/detailsModal";
import EditModal from "../Modals/editModal";

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
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();
  const dispatch = useDispatch<any>();

  type Inputs = {
    customer: string;
    userName: string;
    password: string;
    phoneNumber: string;
    email: string;
  };

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

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await apiRequests.put(`/users/${productId}`, {
      customer: data.customer,
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      password: data.password,
      email: data.email,
    });
    reset();
    setIsShowEditModal(false);
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
          {/* delete button */}
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
          {/* Details button */}
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
          {/* edit button */}
          <button
            type="button"
            className="btn m-1"
            onClick={() => {
              setIsShowEditModal(true);
              setProductId(id);
            }}
          >
            ویرایش
          </button>
        </td>
      </tr>
      {/* delete modal */}
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
      {/* details modal */}
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

      {isShowEditModal && (
        <EditModal
          onClose={() => {
            console.log("close");
            setIsShowEditModal(false);
          }}
        >
          <form className="min-h-64 pt-5" onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={customer}
              className="input w-full text-right"
              type="text"
              placeholder="نام را وارد کنید "
              aria-label="customer"
              {...register("customer", { required: true })}
            />
            {errors.customer && <span>This field is required</span>}
            <input
              defaultValue={userName}
              className="input w-full text-right"
              type="text"
              placeholder=" نام کاربری جدید را وارد کنید "
              aria-label="userName"
              {...register("userName", { required: true })}
            />
            {errors.userName && (
              <span className="text-red-500">This field is required</span>
            )}
            <input
              defaultValue={password}
              className="input w-full text-right"
              type="text"
              placeholder="رمز عبور جدید را وارد کنید "
              aria-label="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
            <input
              defaultValue={phoneNumber}
              className="input w-full text-right"
              type="text"
              placeholder="شماره موبایل جدید را وارد کنید "
              aria-label="phoneNumber"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <span className="text-red-500">This field is required</span>
            )}

            <input
              defaultValue={email}
              className="input w-full text-right"
              type="text"
              placeholder="ایمیل جدید را وارد کنید "
              aria-label="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}

            <div className="flex justify-center gap-3">
              <button
                type="submit"
                className="btnLight my-5"
                onClick={() => setIsShowEditModal(false)}
              >
                cancel
              </button>
              <button type="submit" className="btn my-5">
                ثبت اطلاعات جدید
              </button>
            </div>
          </form>
        </EditModal>
      )}
    </>
  );
}
