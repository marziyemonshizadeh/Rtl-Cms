import FormField from "@/components/@base/Form/FormField";
import { Button } from "@/components/ui/button";
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
type ProductInputs = Pick<productProps, "name" | "img"> & { price: number; count: number };

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
  } = useForm<ProductInputs>();
  const onSubmit: SubmitHandler<ProductInputs> = async (data) => {
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
            onClick={(event) => {
              event.currentTarget.focus();
              setIsShowDetailsModal(true);
            }}
          >
            جزئیات
          </button>
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
          title="جزئیات محصول"
          onHide={() => setIsShowDetailsModal(false)}
          items={[
            { label: "نام محصول", value: name },
            { label: "قیمت", value: price },
            { label: "موجودی", value: count },
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
              <FormField label="نام محصول" error={errors.name?.message}>
                <Input
                  required
                  defaultValue={name}
                  type="text"
                  placeholder="نام محصول را وارد کنید"
                  {...register("name", { required: "نام محصول الزامی است." })}
                />
              </FormField>
              <FormField label="قیمت" error={errors.price?.message}>
                <Input
                  required
                  defaultValue={price}
                  type="number"
                  min={0}
                  step="any"
                  placeholder="قیمت محصول را وارد کنید"
                  {...register("price", {
                    required: "قیمت الزامی است.",
                    valueAsNumber: true,
                    min: { value: 0, message: "قیمت نمی‌تواند منفی باشد." },
                    validate: (value) => Number.isFinite(value) || "قیمت معتبر وارد کنید.",
                  })}
                />
              </FormField>
              <FormField label="موجودی" error={errors.count?.message}>
                <Input
                  required
                  defaultValue={count}
                  type="number"
                  min={0}
                  step="1"
                  placeholder="موجودی محصول را وارد کنید"
                  {...register("count", {
                    required: "موجودی الزامی است.",
                    valueAsNumber: true,
                    min: { value: 0, message: "موجودی نمی‌تواند منفی باشد." },
                    validate: (value) => Number.isInteger(value) || "موجودی باید عدد صحیح باشد.",
                  })}
                />
              </FormField>
              <FormField label="آدرس تصویر" error={errors.img?.message}>
                <Input
                  required
                  defaultValue={img}
                  type="text"
                  placeholder="آدرس تصویر محصول را وارد کنید"
                  {...register("img", { required: "آدرس تصویر الزامی است." })}
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
};
export default Product;
