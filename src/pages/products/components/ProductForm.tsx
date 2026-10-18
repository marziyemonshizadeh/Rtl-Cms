import FormField from "@/components/@base/Form/FormField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addProduct } from "@/redux/store/products";
import type Product from "@/models/productType";

type Inputs = Omit<Product, "id" | "price" | "count"> & { price: number; count: number };

const AddNewProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const mutation = useAppSelector((state) => state.products.mutations.create);
  const loading = useAppSelector((state) => state.products.loading);
  const pending = !!mutation?.pending;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await dispatch(addProduct(data)).unwrap();
      reset();
    } catch {
      return;
    }
  };
  return (
    <>
      <h1 className="header">افزودن محصول جدید</h1>
      <form noValidate className="card min-h-64 pt-5" aria-busy={pending} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={loading || pending} className="min-w-0">
          <div className="grid gap-4 xl:grid-cols-2">
            <FormField label="نام محصول" error={errors.name?.message}>
              <Input
                required
                type="text"
                placeholder="نام محصول را وارد کنید"
                {...register("name", { required: "نام محصول الزامی است." })}
              />
            </FormField>
            <FormField label="قیمت" error={errors.price?.message}>
              <Input
                required
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
                type="text"
                placeholder="آدرس تصویر محصول را وارد کنید"
                {...register("img", { required: "آدرس تصویر الزامی است." })}
              />
            </FormField>
          </div>
          <div className="flex justify-end mt-3">
            <Button type="submit">{pending ? "در حال ثبت..." : "ثبت محصول"}</Button>
          </div>
        </fieldset>
        {mutation?.error && (
          <p role="alert" className="text-destructive">{mutation.error}</p>
        )}
      </form>
    </>
  );
};

export default AddNewProduct;
