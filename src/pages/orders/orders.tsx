const Orders: React.FC = () => {
  return (
    <>
      <h1 className="header"> لیست سفارشات ثبت شده </h1>
      <div className="w-full bg-red-950 text-gray-50 text-center font-bold p-3">
        هیچ سفارشی یافت نشد
      </div>
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
              <th className="py-8"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center py-8">لپ تاپ msi</td>
              <td className="text-center py-8">مرضیه منشی زاده </td>
              <td className="text-center py-8">13 شهریور 1402 </td>
              <td className="text-center py-8">16:30</td>
              <td className="text-center py-8">35,000,000</td>
              <td className="text-center py-8">0%</td>
              <td className="py-8">
                <button type="button" className="btn">
                  جزئیات
                </button>
                <button type="button" className="btn">
                  حذف
                </button>
                <button type="button" className="btn">
                  بعدا بررسی می شود
                </button>
                <button type="button" className="btn">
                  تایید
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
