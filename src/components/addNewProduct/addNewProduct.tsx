import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addProduct } from "@/redux/store/products";
import type Product from "@/models/productType";

type Inputs = Omit<Product, "id">;

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
      <form className="card min-h-64 pt-5" aria-busy={pending} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={loading || pending} className="min-w-0">
          <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-2">
            <div className="flex flex-col">
              <Input
                type="text"
                placeholder="اسم محصول خود را بنویسید  "
                aria-label="name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-destructive">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                type="text"
                placeholder="قیمت محصول خود را بنویسید  "
                aria-label="price"
                {...register("price", { required: true })}
              />
              {errors.img && (
                <span className="text-destructive">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                type="text"
                placeholder="موجودی محصول خود را بنویسید  "
                aria-label="count"
                {...register("count", { required: true })}
              />
              {errors.price && (
                <span className="text-destructive">This field is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                type="text"
                placeholder="آدرس عکس محصول خود را بنویسید "
                aria-label="img"
                {...register("img", { required: true })}
              />
              {errors.count && (
                <span className="text-destructive">This field is required</span>
              )}
            </div>
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
