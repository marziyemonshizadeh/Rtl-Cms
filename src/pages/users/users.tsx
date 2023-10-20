const Users: React.FC = () => {
  return (
    <>
      <h1 className="header">لیست کاربران</h1>
      <div className="w-full bg-red-950 text-gray-50 text-center font-bold p-3">
        هیچ کاربری یافت نشد
      </div>
      <div className="card mt-5">
        <table className="w-full">
          <thead className="border-b-2">
            <tr>
              <th className="py-8">نام و نام خانوادگی</th>
              <th className="py-8">نام کاربری </th>
              <th className="py-8">رمز عبور</th>
              <th className="py-8">شماره تماس</th>
              <th className="py-8">ایمیل</th>
              <th className="py-8"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center py-8">مرضیه منشی زاده </td>
              <td className="text-center py-8">Marziii</td>
              <td className="text-center py-8">qaz123</td>
              <td className="text-center py-8">0935555555</td>
              <td className="text-center py-8">marziehmonshizade@yahoo.com</td>
              <td className="py-8">
                <button type="button" className="btn">
                  حذف
                </button>
                <button type="button" className="btn">
                  جزئیات
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

export default Users;
