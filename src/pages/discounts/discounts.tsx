import { useEffect } from "react";
import Discount from "@/components/discount/discount";
import ErrorBox from "@/components/errorBox/errorBox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchDiscounts } from "@/redux/store/discounts";

const Discounts: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.discount);

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, [dispatch]);

  return (
    <>
      <h1 className="header"> لیست کدهای تخفیف ثبت شده </h1>
      {data.loading ? (
        <div>در حال بارگزاری ...</div>
      ) : data.error ? (
        <div className="space-y-3">
          <ErrorBox message={data.error} />
          <button
            type="button"
            className="btn"
            disabled={Object.values(data.mutations).some((mutation) => mutation.pending)}
            onClick={() => void dispatch(fetchDiscounts())}
          >
            تلاش دوباره
          </button>
        </div>
      ) : data.discounts?.length ? (
        <div className="table-container my-5">
          <table className="w-full hidden md:table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">کد تخفیف</th>
                <th className="table-header-cell">درصد تخفیف</th>
                <th className="table-header-cell">تاریخ ثبت</th>
                <th className="table-header-cell">ثبت شده توسط</th>
                <th className="table-header-cell">ساخته شده برای</th>
                <th className="table-header-cell">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {data.discounts?.map((item) => {
                return <Discount {...item} key={item.id} />;
              })}
            </tbody>
          </table>
          <div className="md:hidden block p-4">
            {data.discounts?.map((item) => (
              <div key={item.id} className="mobile-card">
                <div className="mobile-card-row">
                  <span className="mobile-card-label">کد تخفیف</span>
                  <span className="mobile-card-value">{item.discountCode}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">درصد</span>
                  <span className="mobile-card-value">{item.discountPercent}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">تاریخ</span>
                  <span className="mobile-card-value">{item.history}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">ثبت کننده</span>
                  <span className="mobile-card-value">{item.adminName}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">محصول</span>
                  <span className="mobile-card-value">{item.product}</span>
                </div>
                <Discount {...item} isMobile />
              </div>
            ))}
          </div>
        </div>
      ) : (
        !data.loading && <ErrorBox message="هیچ تخفیفی یافت نشد" />
      )}
    </>
  );
};

export default Discounts;
