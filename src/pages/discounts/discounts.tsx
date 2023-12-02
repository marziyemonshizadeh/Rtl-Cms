import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../components/Modals/deleteModal";
import ErrorBox from "../../components/errorBox/errorBox";
import { useAppSelector } from "../../redux/store";
import { fetchDiscounts, removeDiscounts } from "../../redux/store/discounts";

const Discount: React.FC = () => {
  const dispatch = useDispatch<any>();
  const data = useAppSelector((state) => state.discount);
  console.log("data===", data);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [discountId, setDiscountId] = useState();

  useEffect(() => {
    dispatch(fetchDiscounts("discounts"));
  }, []);

  const modalSubmit = () => {
    setIsShowModal(false);
    dispatch(removeDiscounts(discountId));
    toast.success("! تخفیف مورد نظر با موفقیت حذف شد", {
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
  return (
    <>
      <h1 className="header"> لیست کدهای تخفیف ثبت شده </h1>
      <ToastContainer />
      {data.discounts?.length ? (
        <div className="card my-5">
          <table className="w-full">
            <thead className="border-b-2">
              <tr>
                <th className="py-8 text-center">کد تخفیف</th>
                <th className="py-8 text-center">درصد تخفیف</th>
                <th className="py-8 text-center">تاریخ ثبت</th>
                <th className="py-8 text-center">ثبت شده توسط</th>
                <th className="py-8 text-center">ساخته شده برای</th>
                <th className="py-8 text-center">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {data.discounts?.map((item: any) => {
                return (
                  <tr>
                    <td className="text-center py-8"> {item.discountCode} </td>
                    <td className="text-center py-8">{item.discountPercent}</td>
                    <td className="text-center py-8">{item.history}</td>
                    <td className="text-center py-8">{item.adminName}</td>
                    <td className="text-center py-8">{item.product}</td>
                    <td className="py-8 text-center">
                      <button
                        type="button"
                        className="btn m-1"
                        onClick={() => {
                          setDiscountId(item.id);
                        }}
                      >
                        تایید
                      </button>
                      <button
                        type="button"
                        className="btn m-1"
                        onClick={() => {
                          setDiscountId(item.id);
                          setIsShowModal(true);
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <ErrorBox message="هیچ تخفیفی یافت نشد" />
      )}
      {/* modals */}
      {isShowModal && (
        <DeleteModal
          Id={discountId}
          submitAction={modalSubmit}
          cancelAction={() => setIsShowModal(false)}
          remove={removeDiscounts}
        />
      )}
    </>
  );
};

export default Discount;
