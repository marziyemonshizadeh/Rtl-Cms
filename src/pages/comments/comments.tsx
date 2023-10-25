import ErrorBox from "../../components/errorBox/errorBox";

const Comments: React.FC = () => {
  return (
    <>
      <h1 className="header"> کامنت های محصولات</h1>
      <ErrorBox message="هیچ کامنتی یافت نشد" />

      <div className="card mt-5">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="py-8">اسم کاربر</th>
              <th className="py-8">محصول</th>
              <th className="py-8">کامنت</th>
              <th className="py-8">تاریخ</th>
              <th className="py-8">ساعت</th>
              <th className="py-8">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center py-8">مرضیه منشی زاده </td>
              <td className="text-center py-8">لپ تاپ msi</td>
              <td className="text-center py-8">
                {" "}
                <button type="button" className="btn">
                  دیدن کامنت
                </button>{" "}
              </td>
              <td className="text-center py-8">13 شهریور 1402 </td>
              <td className="text-center py-8">16:30</td>
              <td className="py-8 text-center">
                <button type="button" className="btn">
                  حذف
                </button>
                <button type="button" className="btn">
                  تایید
                </button>
                <button type="button" className="btn">
                  پاسخ
                </button>
                <button type="button" className="btn">
                  ویرایش
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Comments;
