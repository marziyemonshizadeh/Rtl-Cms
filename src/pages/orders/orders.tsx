import { useQuery } from "react-query";
import ErrorBox from "../../components/errorBox/errorBox";
import Order from "../../components/order/order";

const Orders: React.FC = () => {
  const { data, isLoading } = useQuery("orders", () =>
    fetch("http://localhost:3001/orders").then((res) => res.json())
  );
  return (
    <>
      <h1 className="header"> لیست سفارشات ثبت شده </h1>
      {isLoading && (
        <div className="mx-auto text-gray-500">لطفا کمی صبر کنید...</div>
      )}
      {data?.length ? (
        <div className="card mt-5">
          <table className="w-full">
            <thead className="border-b-2">
              <tr>
                <th className="py-8">نام محصول خریداری شده</th>
                <th className="py-8">نام خریدار</th>
                <th className="py-8">تاریخ سفارش</th>
                <th className="py-8">ساعت سفارش</th>
                <th className="py-8">مبلغ کل</th>
                <th className="py-8"> تخفیف اعمال شده</th>
                <th className="py-8">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any) => {
                return <Order key={item.id} {...item} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>{!isLoading && <ErrorBox message="هیچ سفارشی یافت نشد" />}</>
      )}
    </>
  );
};

export default Orders;
