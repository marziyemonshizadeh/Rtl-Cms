import type { RegisterOptions } from "react-hook-form";
import type { ProductValues } from "../Models/ProductModel";

const ProductSchema: { [Field in keyof ProductValues]: RegisterOptions<ProductValues, Field> } = {
  name: { required: "نام محصول الزامی است." },
  img: { required: "آدرس تصویر الزامی است." },
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

export default ProductSchema;
