import { useEffect, useId, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/@base/Form/Inputs/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addProduct, clearProductMutationError, updateProduct } from "../store/productsSlice";
import { ProductModel, type Product, type ProductValues } from "./Models/ProductModel";
import ProductSchema from "./Validation/ProductSchema";

interface AddProductProps {
  product?: Product;
  onClose: () => void;
}

function getDefaultValues(product?: Product) {
  const { name, img, price, count } = product ?? ProductModel;
  return { name, img, price, count };
}

export default function AddProduct({ product, onClose }: AddProductProps) {
  //#region ---------- Hooks
  const dispatch = useAppDispatch();
  const formId = useId();
  const selectedId = product?.id;
  const isUpdatedData = selectedId !== undefined;
  const [returnFocusTo] = useState(() =>
    typeof document !== "undefined" && document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  );
  //#endregion

  //#region ---------- Mutation state
  const mutation = useAppSelector((state) => state.products.mutations[selectedId ?? "create"]);
  const isLoading = useAppSelector((state) => state.products.loading);
  //#endregion

  //#region ---------- Form
  const form = useForm<ProductValues>({
    defaultValues: getDefaultValues(product),
    mode: "onTouched",
  });
  const { reset } = form;
  const isPending = !!mutation?.pending || form.formState.isSubmitting;
  const disabled = isLoading || isPending;

  useEffect(() => {
    reset(getDefaultValues(product));
  }, [product, reset]);
  //#endregion

  //#region ---------- Handlers
  function handleReset() {
    reset(getDefaultValues(product));
    dispatch(clearProductMutationError(selectedId ?? "create"));
  }

  async function onSubmit(values: ProductValues) {
    try {
      if (selectedId !== undefined) {
        await dispatch(updateProduct({ id: selectedId, changes: values })).unwrap();
      } else {
        await dispatch(addProduct(values)).unwrap();
      }
      onClose();
    } catch {
      // The mutation error is shown in the dialog so the form can be retried.
    }
  }
  //#endregion

  //#region ---------- JSX
  return (
    <Dialog open onOpenChange={(open) => {
      if (!open && !isPending) onClose();
    }}>
      <DialogContent
        layout="sections"
        pending={isPending}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          const target = returnFocusTo?.isConnected
            && !returnFocusTo.matches(":disabled")
            && returnFocusTo.getClientRects().length
            ? returnFocusTo
            : document.getElementById("main-content");
          target?.focus({ preventScroll: true });
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {isUpdatedData ? "ویرایش محصول" : "افزودن محصول جدید"}
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-muted-foreground">
            {isUpdatedData ? "اطلاعات محصول را ویرایش و تغییرات را ثبت کنید." : "اطلاعات محصول جدید را وارد و ثبت کنید."}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <DialogBody>
            <form id={formId} noValidate aria-busy={isPending} onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={disabled} className="flex min-w-0 flex-col gap-4">
                <FormInput<ProductValues, "name">
                  name="name"
                  label="نام محصول"
                  placeholder="نام محصول را وارد کنید"
                  rules={ProductSchema.name}
                  required
                />
                <FormInput<ProductValues, "img">
                  name="img"
                  label="آدرس تصویر"
                  placeholder="آدرس تصویر محصول را وارد کنید"
                  rules={ProductSchema.img}
                  required
                />
                <FormInput<ProductValues, "price">
                  name="price"
                  label="قیمت"
                  type="number"
                  min={0}
                  step="any"
                  placeholder="قیمت محصول را وارد کنید"
                  rules={ProductSchema.price}
                  required
                />
                <FormInput<ProductValues, "count">
                  name="count"
                  label="موجودی"
                  type="number"
                  min={0}
                  step="1"
                  placeholder="موجودی محصول را وارد کنید"
                  rules={ProductSchema.count}
                  required
                />
              </fieldset>
              {mutation?.error && <p role="alert" className="mt-4 text-destructive">{mutation.error}</p>}
            </form>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={isPending} onClick={onClose}>
              انصراف
            </Button>
            <Button type="button" variant="outline" disabled={disabled} onClick={handleReset}>
              بازنشانی
            </Button>
            <Button type="submit" form={formId} disabled={disabled}>
              {isPending ? "در حال ثبت..." : isUpdatedData ? "ثبت اطلاعات جدید" : "ثبت محصول"}
            </Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
  //#endregion
}
