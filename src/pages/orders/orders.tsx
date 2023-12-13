import { useEffect, useState } from "react";
import DeleteModal from "../../components/Modals/deleteModal";
import DetailsModal from "../../components/Modals/detailsModal";

import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBox from "../../components/errorBox/errorBox";
import Order from "../../components/order/order";
import { useAppSelector } from "../../redux/store";
import { fetchOrders, removeOrders } from "../../redux/store/orders";

const Orders: React.FC = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState<boolean>(false);
  const [orderId, setOrderId] = useState();

  const dispatch = useDispatch<any>();
  const datas = useAppSelector((state) => state.orders);

  const modalSubmit = () => {
    setIsShowModal(false);
    console.log(orderId);
    dispatch(removeOrders(orderId));
    toast.success("! سفارش مورد نظر با موفقیت حذف شد", {
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
                return (
                  <Order
                    key={item.id}
                    {...item}
                    // onClick={() => {
                    //   setOrderId(item.id);
                    //   dispatch(removeOrders(orderId));
                    //   setIsShowModal(true);
                    //   console.log(orderId);
                    // }}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !datas.loading && <ErrorBox message="هیچ سفارشی یافت نشد" />
      )}

      {/* modals */}
      {isShowModal && (
        <DeleteModal
          Id={orderId}
          submitAction={modalSubmit}
          cancelAction={() => setIsShowModal(false)}
          remove={removeOrders}
        />
      )}

      {isShowDetailsModal && (
        <DetailsModal
          Id={orderId}
          order={true}
          getItem="orders"
          onHide={() => setIsShowDetailsModal(false)}
        >
          <th className="py-3">اسم مشتری</th>
          <th className="py-3">محصول</th>
          <th className="py-3">رمز</th>
          <th className="py-3">قیمت</th>
          <th className="py-3">تخفیف</th>
        </DetailsModal>
      )}
    </>
  );
};

export default Orders;
