import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { removeProduct, updateProduct } from "@/redux/store/products";
import DeleteModal from "@/components/Modals/deleteModal";
import DetailsModal from "@/components/Modals/detailsModal";
import EditModal from "@/components/Modals/editModal";

interface productProps {
  id: number;
  name: string;
  img: string;
  price: number | string;
  count: number | string;
  isMobile?: boolean;
}
const Product = ({ id, name, img, price, count }: productProps) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const mutation = useAppSelector((state) => state.products.mutations[id]);
  const pending = !!mutation?.pending;

  const modalSubmit = async () => {
    try {
      await dispatch(removeProduct(id)).unwrap();
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
  } = useForm<productProps>();
  const onSubmit: SubmitHandler<productProps> = async (data) => {
    try {
      await dispatch(updateProduct({
        id,
        changes: {
          img: data.img,
          name: data.name,
          price: data.price,
          count: data.count,
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
        <td className="table-cell md:flex justify-center">
          <img src={img} alt="hb" className="max-h-40" />
        </td>
        <td className="table-cell">{name}</td>
        <td className="table-cell">{price.toLocaleString()} تومان</td>
        <td className="table-cell">{count}</td>
        <td className="table-cell">
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
          <button
            type="button"
            disabled={pending}
            className="btn m-1"
            onClick={() => setIsShowEditModal(true)}
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
          name={name}
          count={count}
          price={price}
          product={true}
          onHide={() => {
            setIsShowDetailsModal(false);
          }}
        >
          <th className="py-3">اسم</th>
          <th className="py-3">قیمت</th>
          <th className="py-3">موجودی</th>
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
                defaultValue={name}
                className="text-right"
                type="text"
                placeholder="نام محصول جدید را وارد کنید "
                aria-label="name"
                {...register("name", { required: true })}
              />
              {errors.name && <span>This field is required</span>}
              <Input
                defaultValue={img}
                className="text-right"
                type="text"
                placeholder="آدرس عکس جدید محصول را وارد کنید "
                aria-label="img"
                {...register("img", { required: true })}
              />
              {errors.img && (
                <span className="text-destructive">This field is required</span>
              )}
              <Input
                defaultValue={price}
                className="text-right"
                type="text"
                placeholder=" قیمت جدید محصول را وارد کنید "
                aria-label="price"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-destructive">This field is required</span>
              )}
              <Input
                defaultValue={count}
                className="text-right"
                type="text"
                placeholder=" تعداد جدید محصول را وارد کنید "
                aria-label="count"
                {...register("count", { required: true })}
              />
              {errors.count && (
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
};
export default Product;
