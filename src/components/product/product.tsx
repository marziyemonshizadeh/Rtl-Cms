import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeProduct } from "../../redux/store/products";
import apiRequests from "../../services/configs";
import DeleteModal from "../Modals/deleteModal";
import DetailsModal from "../Modals/detailsModal";
import EditModal from "../Modals/editModal";

interface productProps {
  id?: number;
  name: string;
  img: string;
  price: string;
  count: string;
}
const Product = ({ id, name, img, price, count }: productProps) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const dispatch = useDispatch<any>();

  const modalSubmit = () => {
    setIsShowModal(false);
    dispatch(removeProduct(id));
    console.log("work", id);

    toast.success("! محصول مورد نظر با موفقیت حذف شد", {
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
  } = useForm<productProps>();
  const onSubmit: SubmitHandler<productProps> = async (data) => {
    console.log(data);
    await apiRequests.put(`/products/${id}`, {
      img: data.img,
      name: data.name,
      price: data.price,
      count: data.count,
    });
    reset();
    setIsShowEditModal(false);
  };

  return (
    <>
      <ToastContainer />
      <tr>
        <td className="md:flex justify-center">
          <img src={img} alt="hb" className="max-h-40" />
        </td>
        <td className="md:text-center py-8">{name}</td>
        <td className="md:text-center py-8">{price.toLocaleString()} تومان</td>
        <td className="md:text-center py-8">{count}</td>
        <td className="py-8 text-center">
          <button
            type="button"
            className="btn m-1"
            onClick={() => {
              console.log("clicked");
              console.log(isShowDetailsModal);
              setIsShowDetailsModal(true);
              console.log(setIsShowDetailsModal);
            }}
          >
            جزئیات
          </button>
          <button
            type="button"
            className="btn m-1"
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            حذف
          </button>
          <button
            type="button"
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
          Id={id}
          submitAction={modalSubmit}
          cancelAction={() => {
            setIsShowModal(false);
          }}
          remove={removeProduct}
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
            console.log("close");
            setIsShowEditModal(false);
          }}
        >
          <form className="min-h-64 pt-5" onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={name}
              className="input w-full text-right"
              type="text"
              placeholder="نام محصول جدید را وارد کنید "
              aria-label="name"
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
            <input
              defaultValue={img}
              className="input w-full text-right"
              type="text"
              placeholder="آدرس عکس جدید محصول را وارد کنید "
              aria-label="img"
              {...register("img", { required: true })}
            />
            {errors.img && (
              <span className="text-red-500">This field is required</span>
            )}
            <input
              defaultValue={price}
              className="input w-full text-right"
              type="text"
              placeholder=" قیمت جدید محصول را وارد کنید "
              aria-label="price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500">This field is required</span>
            )}
            <input
              defaultValue={count}
              className="input w-full text-right"
              type="text"
              placeholder=" تعداد جدید محصول را وارد کنید "
              aria-label="count"
              {...register("count", { required: true })}
            />
            {errors.count && (
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
};
export default Product;
