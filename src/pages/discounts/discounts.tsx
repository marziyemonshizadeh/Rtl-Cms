import { useEffect } from "react";
// import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import ErrorBox from "../../components/errorBox/errorBox";
import { useAppSelector } from "../../redux/store";
import { fetchDiscounts } from "../../redux/store/discounts";

const Discount: React.FC = () => {
  const dispatch = useDispatch<any>();
  const data = useAppSelector((state) => state.discount);
  console.log("data===", data);

  useEffect(() => {
    dispatch(fetchDiscounts("discounts"));
  }, []);
  return (
    <>
      <h1 className="header"> لیست کدهای تخفیف ثبت شده </h1>
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
                      <button type="button" className="btn m-1">
                        تایید
                      </button>
                      <button type="button" className="btn m-1">
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
    </>
  );
};

export default Discount;
