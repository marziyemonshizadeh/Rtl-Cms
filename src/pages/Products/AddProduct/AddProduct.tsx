import { useForm } from "react-hook-form";
import FormField from "@/components/@base/Form/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductSchema from "./Validation/ProductSchema";
import type { ProductValues } from "./Models/ProductModel";

interface AddProductProps {
  mode: "create" | "edit";
  defaultValues?: ProductValues;
  onSubmit: (values: ProductValues) => Promise<void>;
  onCancel?: () => void;
  pending: boolean;
  disabled?: boolean;
  error?: string | null;
}

export default function AddProduct({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  pending,
  disabled = false,
  error,
}: AddProductProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductValues>({
    defaultValues: {
      name: defaultValues?.name ?? "",
      img: defaultValues?.img ?? "",
      price: defaultValues?.price,
      count: defaultValues?.count,
    },
  });
  const busy = pending || isSubmitting;

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      if (mode === "create") reset();
    } catch {
      return;
    }
  });

  return (
    <form noValidate className="min-h-64" aria-busy={busy} onSubmit={submit}>
      <fieldset disabled={disabled || busy} className="min-w-0 space-y-4">
        <div className={mode === "create" ? "grid gap-4 xl:grid-cols-2" : "grid gap-4"}>
          <FormField label="نام محصول" error={errors.name?.message}>
            <Input
              required
              type="text"
              placeholder="نام محصول را وارد کنید"
              {...register("name", ProductSchema.name)}
            />
          </FormField>
          <FormField label="قیمت" error={errors.price?.message}>
            <Input
              required
              type="number"
              min={0}
              step="any"
              placeholder="قیمت محصول را وارد کنید"
              {...register("price", ProductSchema.price)}
            />
          </FormField>
          <FormField label="موجودی" error={errors.count?.message}>
            <Input
              required
              type="number"
              min={0}
              step="1"
              placeholder="موجودی محصول را وارد کنید"
              {...register("count", ProductSchema.count)}
            />
          </FormField>
          <FormField label="آدرس تصویر" error={errors.img?.message}>
            <Input
              required
              type="text"
              placeholder="آدرس تصویر محصول را وارد کنید"
              {...register("img", ProductSchema.img)}
            />
          </FormField>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              انصراف
            </Button>
          )}
          <Button type="submit">
            {busy ? "در حال ثبت..." : mode === "create" ? "ثبت محصول" : "ثبت اطلاعات جدید"}
          </Button>
        </div>
      </fieldset>
      {error && <p role="alert" className="mt-4 text-destructive">{error}</p>}
    </form>
  );
}
