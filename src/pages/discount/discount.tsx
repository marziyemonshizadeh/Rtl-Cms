import Swal from "sweetalert2";
import ErrorBox from "../../components/errorBox/errorBox";

interface DiscountProps {
  onclick?: () => void;
}
const Discount: React.FC<DiscountProps> = () => {
  const swall = () => {
    return Swal.fire({
      title: "Error!",
      text: "Do you want to continue",
      icon: "error",
      confirmButtonText: "Cool",
    });
  };
  return (
    <>
      {/* {swall()} */}
      <h1 className="header"> لیست کدهای تخفیف ثبت شده </h1>
      <ErrorBox message="هیچ کد تخفیفی یافت نشد" />
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
            <tr>
              <td className="text-center py-8"> macBook78 </td>
              <td className="text-center py-8"> 20%</td>
              <td className="text-center py-8">13 شهریور 1402 </td>
              <td className="text-center py-8">مرضیه منشی زاده</td>
              <td className="text-center py-8">مک بوک</td>
              <td className="py-8 text-center">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    swall();
                  }}
                >
                  تایید
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    swall();
                  }}
                >
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
              <td className="py-8 text-center">
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
              <td className="py-8 text-center">
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
              <td className="py-8 text-center">
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
