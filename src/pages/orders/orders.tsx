import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBox from "../../components/errorBox/errorBox";
import Order from "../../components/order/order";
import { useAppSelector } from "../../redux/store";
import { fetchOrders } from "../../redux/store/orders";

const Orders: React.FC = () => {
  const dispatch = useDispatch<any>();
  const datas = useAppSelector((state) => state.orders);
  console.log("datas = ", datas.orders);

  useEffect(() => {
    dispatch(fetchOrders("orders"));
  }, []);

  return (
    <>
      <h1 className="header"> لیست سفارشات ثبت شده </h1>
      <ToastContainer />
      {datas.loading ? (
        <div>در حال بارگزاری ...</div>
      ) : datas.orders?.length ? (
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
              {datas.orders?.map((item: any) => {
                return <Order key={item.id} {...item} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !datas.loading && <ErrorBox message="هیچ سفارشی یافت نشد" />
      )}
    </>
  );
};

export default Orders;
