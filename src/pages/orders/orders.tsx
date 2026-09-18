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
        <div className="table-container mt-5">
          <table className="w-full hidden md:table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">نام محصول خریداری شده</th>
                <th className="table-header-cell">نام خریدار</th>
                <th className="table-header-cell">تاریخ سفارش</th>
                <th className="table-header-cell">ساعت سفارش</th>
                <th className="table-header-cell">مبلغ کل</th>
                <th className="table-header-cell"> تخفیف اعمال شده</th>
                <th className="table-header-cell">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {datas.orders?.map((item: any) => {
                return <Order key={item.id} {...item} />;
              })}
            </tbody>
          </table>
          <div className="md:hidden block p-4">
            {datas.orders?.map((item: any) => (
              <div key={item.id} className="mobile-card">
                <div className="mobile-card-row">
                  <span className="mobile-card-label">محصول</span>
                  <span className="mobile-card-value">{item.product}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">خریدار</span>
                  <span className="mobile-card-value">{item.customer}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">تاریخ</span>
                  <span className="mobile-card-value">{item.orderDate}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">ساعت</span>
                  <span className="mobile-card-value">{item.orderTime}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">مبلغ</span>
                  <span className="mobile-card-value">{item.price}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">تخفیف</span>
                  <span className="mobile-card-value">{item.discount}</span>
                </div>
                <Order {...item} isMobile />
              </div>
            ))}
          </div>
        </div>
      ) : (
        !datas.loading && <ErrorBox message="هیچ سفارشی یافت نشد" />
      )}
    </>
  );
};

export default Orders;
