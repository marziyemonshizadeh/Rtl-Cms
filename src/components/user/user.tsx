import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { removeUser, updateUser } from "@/redux/store/users";
import DeleteModal from "@/components/Modals/deleteModal";
import DetailsModal from "@/components/Modals/detailsModal";
import EditModal from "@/components/Modals/editModal";

interface userProps {
  id: number;
  customer: string;
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
  isMobile?: boolean;
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
  const dispatch = useAppDispatch();
  const mutation = useAppSelector((state) => state.users.mutations[id]);
  const pending = !!mutation?.pending;

  const modalSubmit = async () => {
    try {
      await dispatch(removeUser(id)).unwrap();
      setIsShowModal(false);
    } catch {
      return;
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<userProps>();
  const onSubmit: SubmitHandler<userProps> = async (data) => {
    try {
      await dispatch(updateUser({
        id,
        changes: {
          customer: data.customer,
          userName: data.userName,
          phoneNumber: data.phoneNumber,
          password: data.password,
          email: data.email,
        },
      })).unwrap();
      reset();
      setIsShowEditModal(false);
    } catch {
      return;
    }
  };

  return (
    <>
      <tr className="table-row">
        <td className="table-cell"> {customer} </td>
        <td className="table-cell">{userName}</td>
        <td className="table-cell">{password}</td>
        <td className="table-cell">{phoneNumber}</td>
        <td className="table-cell">{email}</td>
        <td className="table-cell">
          {/* delete button */}
          <button
            type="button"
            disabled={pending}
            className="btn m-1"
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            حذف
          </button>
          {/* Details button */}
          <button
            type="button"
            disabled={pending}
            className="btn m-1"
            onClick={() => {
              setIsShowDetailsModal(true);
            }}
          >
            جزئیات
          </button>
          {/* edit button */}
          <button
            type="button"
            disabled={pending}
            className="btn m-1"
            onClick={() => {
              setIsShowEditModal(true);
            }}
          >
            ویرایش
          </button>
        </td>
      </tr>
      {/* delete modal */}
      {isShowModal && (
        <DeleteModal
          pending={pending}
          error={mutation?.error}
          submitAction={modalSubmit}
          cancelAction={() => {
            setIsShowModal(false);
          }}
        />
      )}
      {/* details modal */}
      {isShowDetailsModal && (
        <DetailsModal
          customer={customer}
          userName={userName}
          password={password}
          user={true}
          onHide={() => {
            setIsShowDetailsModal(false);
          }}
        >
          <th className="py-3">اسم</th>
          <th className="py-3">شماره تماس</th>
          <th className="py-3">ایمیل</th>
        </DetailsModal>
      )}
      {/* edit modal */}
      {isShowEditModal && (
        <EditModal
          onClose={() => {
            if (!pending) setIsShowEditModal(false);
          }}
        >
          <form className="min-h-64 pt-5" aria-busy={pending} onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={pending} className="min-w-0">
              <Input
                defaultValue={customer}
                className="text-right"
                type="text"
                placeholder="نام را وارد کنید "
                aria-label="customer"
                {...register("customer", { required: true })}
              />
              {errors.customer && <span>This field is required</span>}
              <Input
                defaultValue={userName}
                className="text-right"
                type="text"
                placeholder=" نام کاربری جدید را وارد کنید "
                aria-label="userName"
                {...register("userName", { required: true })}
              />
              {errors.userName && (
                <span className="text-destructive">This field is required</span>
              )}
              <Input
                defaultValue={password}
                className="text-right"
                type="text"
                placeholder="رمز عبور جدید را وارد کنید "
                aria-label="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-destructive">This field is required</span>
              )}
              <Input
                defaultValue={phoneNumber}
                className="text-right"
                type="text"
                placeholder="شماره موبایل جدید را وارد کنید "
                aria-label="phoneNumber"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <span className="text-destructive">This field is required</span>
              )}

              <Input
                defaultValue={email}
                className="text-right"
                type="text"
                placeholder="ایمیل جدید را وارد کنید "
                aria-label="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-destructive">This field is required</span>
              )}

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  disabled={pending}
                  className="btnLight my-5"
                  onClick={() => setIsShowEditModal(false)}
                >
                  cancel
                </button>
                <button type="submit" className="btn my-5">
                  ثبت اطلاعات جدید
                </button>
              </div>
            </fieldset>
            {mutation?.error && (
              <p role="alert" className="text-destructive">{mutation.error}</p>
            )}
          </form>
        </EditModal>
      )}
    </>
  );
}
