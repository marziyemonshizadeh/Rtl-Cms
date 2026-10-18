import type { RegisterOptions } from "react-hook-form";
import type { ProductValues } from "../Models/ProductModel";

type ProductRules = { [Field in keyof ProductValues]: RegisterOptions<ProductValues, Field> };

export const ProductFirstStepSchema: Pick<ProductRules, "name" | "img"> = {
  name: { required: "نام محصول الزامی است." },
  img: { required: "آدرس تصویر الزامی است." },
};

export const ProductSecondStepSchema: Pick<ProductRules, "price" | "count"> = {
  price: {
    required: "قیمت الزامی است.",
    valueAsNumber: true,
    min: { value: 0, message: "قیمت نمی‌تواند منفی باشد." },
    validate: (value) => Number.isFinite(value) || "قیمت معتبر وارد کنید.",
  },
  count: {
    required: "موجودی الزامی است.",
    valueAsNumber: true,
    min: { value: 0, message: "موجودی نمی‌تواند منفی باشد." },
    validate: (value) => Number.isInteger(value) || "موجودی باید عدد صحیح باشد.",
  },
};

const ProductSchema: ProductRules = {
  ...ProductFirstStepSchema,
  ...ProductSecondStepSchema,
};

export default ProductSchema;
