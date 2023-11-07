import { useQuery } from "react-query";
import ErrorBox from "../../components/errorBox/errorBox";

// interface DiscountProps {
//   onclick?: () => void;
// }
const Discount: React.FC = () => {
  const { data, isLoading } = useQuery("discount", () =>
    fetch("http://localhost:3001/discount").then((res) => res.json())
  );

  return (
    <>
      <h1 className="header"> لیست کدهای تخفیف ثبت شده </h1>
      {isLoading && (
        <div className="mx-auto text-gray-500">لطفا کمی صبر کنید...</div>
      )}
      {data?.length ? (
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
              {data?.map((item: any) => {
                return (
                  <tr>
                    <td className="text-center py-8"> {item.discountCode} </td>
                    <td className="text-center py-8">
                      {item.discountPercent}{" "}
                    </td>
                    <td className="text-center py-8">{item.history}</td>
                    <td className="text-center py-8">{item.adminName}</td>
                    <td className="text-center py-8">{item.product}</td>
                    <td className="py-8 text-center">
                      <button type="button" className="btn">
                        تایید
                      </button>
                      <button type="button" className="btn">
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
        <>{!isLoading && <ErrorBox message="هیچ تخفیفی یافت نشد" />}</>
      )}
    </>
  );
};

export default Discount;
