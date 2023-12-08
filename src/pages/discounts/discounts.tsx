import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Discount from "../../components/discount/discount";
import ErrorBox from "../../components/errorBox/errorBox";
import { useAppSelector } from "../../redux/store";
import { fetchDiscounts } from "../../redux/store/discounts";

const Discounts: React.FC = () => {
  const dispatch = useDispatch<any>();
  const data = useAppSelector((state) => state.discount);
  console.log("data===", data);

  useEffect(() => {
    dispatch(fetchDiscounts("discounts"));
  }, []);

  return (
    <>
      <h1 className="header"> لیست کدهای تخفیف ثبت شده </h1>
      {data.loading ? (
        <div>در حال بارگزاری ...</div>
      ) : data.discounts?.length ? (
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
                return <Discount {...item} key={item.id} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !data.loading && <ErrorBox message="هیچ تخفیفی یافت نشد" />
      )}
    </>
  );
};

export default Discounts;
