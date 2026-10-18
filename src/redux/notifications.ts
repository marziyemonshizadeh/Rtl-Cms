import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { removeProduct, addProduct, updateProduct } from "@/pages/Products/store/productsSlice";
import { removeUser, updateUser } from "@/redux/store/users";
import { removeComment, setCommentConfirmation } from "@/redux/store/comments";
import { removeOrders, setOrderConfirmation } from "@/redux/store/orders";
import { removeDiscounts, setDiscountConfirmation } from "@/redux/store/discounts";

const mutations = [
  { thunk: removeProduct, message: "محصول با موفقیت حذف شد." },
  { thunk: addProduct, message: "محصول با موفقیت اضافه شد." },
  { thunk: updateProduct, message: "محصول با موفقیت ویرایش شد." },
  { thunk: removeUser, message: "کاربر با موفقیت حذف شد." },
  { thunk: updateUser, message: "کاربر با موفقیت ویرایش شد." },
  { thunk: removeComment, message: "دیدگاه با موفقیت حذف شد." },
  { thunk: setCommentConfirmation, message: "وضعیت دیدگاه با موفقیت تغییر کرد." },
  { thunk: removeOrders, message: "سفارش با موفقیت حذف شد." },
  { thunk: setOrderConfirmation, message: "وضعیت سفارش با موفقیت تغییر کرد." },
  { thunk: removeDiscounts, message: "تخفیف با موفقیت حذف شد." },
  { thunk: setDiscountConfirmation, message: "وضعیت تخفیف با موفقیت تغییر کرد." },
];
const messages = new Map(mutations.map(({ thunk, message }) => [thunk.fulfilled.type, message]));
const notifications = createListenerMiddleware();

notifications.startListening({
  matcher: isAnyOf(...mutations.map(({ thunk }) => thunk.fulfilled)),
  effect: (action) => {
    toast.success(messages.get(action.type));
  },
});

notifications.startListening({
  matcher: isAnyOf(...mutations.map(({ thunk }) => thunk.rejected)),
  effect: (action) => {
    toast.error(action.payload ?? "درخواست انجام نشد. دوباره تلاش کنید.");
  },
});

export default notifications.middleware;
