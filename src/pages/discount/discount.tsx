const Discount: React.FC = () => {
  return (
    <>
      <h1 className="header"> لیست کدهای تخفیف ثبت شده </h1>
      <div className="w-full bg-red-950 text-gray-50 text-center font-bold p-3">
        هیچ کد تخفیفی یافت نشد
      </div>
      <div className="card my-5">
        <table className="w-full">
          <thead className="border-b-2">
            <tr>
              <th className="py-8">کد تخفیف</th>
              <th className="py-8">درصد تخفیف</th>
              <th className="py-8">تاریخ ثبت</th>
              <th className="py-8">ثبت شده توسط</th>
              <th className="py-8">ساخته شده برای</th>
              <th className="py-8"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center py-8"> macBook78 </td>
              <td className="text-center py-8"> 20%</td>
              <td className="text-center py-8">13 شهریور 1402 </td>
              <td className="text-center py-8">مرضیه منشی زاده</td>
              <td className="text-center py-8">مک بوک</td>
              <td className="py-8">
                <button type="button" className="btn">
                  تایید
                </button>
                <button type="button" className="btn">
                  حذف
                </button>
              </td>
            </tr>
            <tr>
              <td className="text-center py-8"> msi </td>
              <td className="text-center py-8"> 50%</td>
              <td className="text-center py-8">13 شهریور 1402 </td>
              <td className="text-center py-8">مرضیه منشی زاده</td>
              <td className="text-center py-8">msi</td>
              <td className="py-8">
                <button type="button" className="btn">
                  تایید
                </button>
                <button type="button" className="btn">
                  حذف
                </button>
              </td>
            </tr>
            <tr>
              <td className="text-center py-8"> dell2018 </td>
              <td className="text-center py-8"> 10%</td>
              <td className="text-center py-8">13 شهریور 1402 </td>
              <td className="text-center py-8">مرضیه منشی زاده</td>
              <td className="text-center py-8">dell</td>
              <td className="py-8">
                <button type="button" className="btn">
                  تایید
                </button>
                <button type="button" className="btn">
                  حذف
                </button>
              </td>
            </tr>
            <tr>
              <td className="text-center py-8"> asus </td>
              <td className="text-center py-8"> 5%</td>
              <td className="text-center py-8">13 شهریور 1402 </td>
              <td className="text-center py-8">مرضیه منشی زاده</td>
              <td className="text-center py-8">asus</td>
              <td className="py-8">
                <button type="button" className="btn">
                  تایید
                </button>
                <button type="button" className="btn">
                  حذف
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Discount;
