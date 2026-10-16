import FormField from "@/components/@base/Form/FormField";
import { Button } from "@/components/ui/button";
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
type UserInputs = Omit<userProps, "id" | "isMobile">;

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
  } = useForm<UserInputs>();
  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
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
            onClick={(event) => {
              event.currentTarget.focus();
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
            onClick={(event) => {
              event.currentTarget.focus();
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
            onClick={(event) => {
              event.currentTarget.focus();
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
          title="جزئیات کاربر"
          onHide={() => setIsShowDetailsModal(false)}
          items={[
            { label: "نام و نام خانوادگی", value: customer },
            { label: "نام کاربری", value: userName },
            { label: "رمز عبور", value: password },
          ]}
        />
      )}
      {/* edit modal */}
      {isShowEditModal && (
        <EditModal
          pending={pending}
          onClose={() => {
            setIsShowEditModal(false);
          }}
        >
          <form noValidate className="min-h-64 pt-5" aria-busy={pending} onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={pending} className="min-w-0 space-y-4">
              <FormField label="نام و نام خانوادگی" error={errors.customer?.message}>
                <Input
                  required
                  defaultValue={customer}
                  type="text"
                  placeholder="نام و نام خانوادگی را وارد کنید"
                  {...register("customer", { required: "نام و نام خانوادگی الزامی است." })}
                />
              </FormField>
              <FormField label="نام کاربری" error={errors.userName?.message}>
                <Input
                  required
                  defaultValue={userName}
                  type="text"
                  placeholder="نام کاربری را وارد کنید"
                  {...register("userName", { required: "نام کاربری الزامی است." })}
                />
              </FormField>
              <FormField label="رمز عبور" error={errors.password?.message}>
                <Input
                  required
                  defaultValue={password}
                  type="text"
                  placeholder="رمز عبور را وارد کنید"
                  {...register("password", { required: "رمز عبور الزامی است." })}
                />
              </FormField>
              <FormField label="شماره تماس" error={errors.phoneNumber?.message}>
                <Input
                  required
                  defaultValue={phoneNumber}
                  type="text"
                  placeholder="شماره تماس را وارد کنید"
                  {...register("phoneNumber", { required: "شماره تماس الزامی است." })}
                />
              </FormField>
              <FormField label="ایمیل" error={errors.email?.message}>
                <Input
                  required
                  defaultValue={email}
                  type="text"
                  placeholder="ایمیل را وارد کنید"
                  {...register("email", { required: "ایمیل الزامی است." })}
                />
              </FormField>
              <div className="flex flex-wrap justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsShowEditModal(false)}>
                  انصراف
                </Button>
                <Button type="submit">
                  {pending ? "در حال ثبت..." : "ثبت اطلاعات جدید"}
                </Button>
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
