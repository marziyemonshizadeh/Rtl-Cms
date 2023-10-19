import AddNewProduct from "../../components/addNewProduct/addNewProduct";

const Products: React.FC = () => {
  return (
    <>
      <AddNewProduct />
      <div className="card flex justify-center">
        <table className="w-4/5">
          <thead>
            <tr>
              <th className="py-8">عکس</th>
              <th className="py-8">اسم</th>
              <th className="py-8">قیمت</th>
              <th className="py-8">موجودی</th>
              <th className="py-8"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="https://vihanhamrah.ir/uploads/products/a217b3.png?m=thumb&w=1280&h=800&q=high"
                  alt="hb"
                  className="max-h-40 max-w-lg"
                />
              </td>
              <td className="text-center py-8">هندزفری بلوتوثی</td>
              <td className="text-center py-8">99900 تومان</td>
              <td className="text-center py-8">134</td>
              <td className="flex gap-4 text-center py-8">
                <button type="button" className="btn">
                  جزئیات
                </button>
                <button type="button" className="btn">
                  حذف
                </button>
                <button type="button" className="btn">
                  ویرایش
                </button>
              </td>
            </tr>
            <tr>
              <td className="text-center py-8">
                <img
                  src="https://hento.ir/wp-content/uploads/2022/03/56388241-2EED-4E49-AF49-39A644AE7506-768x768.webp"
                  alt="hb"
                  className="max-h-40 max-w-lg"
                />
              </td>
              <td className="text-center py-8">هدست مخصوص بازی </td>
              <td className="text-center py-8">672000 تومان</td>
              <td className="text-center py-8">99</td>
              <td className="flex gap-4 text-center py-8">
                <button type="button" className="btn">
                  جزئیات
                </button>
                <button type="button" className="btn">
                  حذف
                </button>
                <button type="button" className="btn">
                  ویرایش
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://shenasname.ir/kala/wp-content/uploads/2022/07/headset-product2-600x600.png"
                  alt="hb"
                  className="max-h-40 max-w-lg"
                />
              </td>
              <td className="text-center py-8">هندزفری بلوتوثی</td>
              <td className="text-center py-8">99900 تومان</td>
              <td className="text-center py-8">134</td>
              <td className="flex gap-4 text-center py-8">
                <button type="button" className="btn">
                  جزئیات
                </button>
                <button type="button" className="btn">
                  حذف
                </button>
                <button type="button" className="btn">
                  ویرایش
                </button>
              </td>
            </tr>
            <tr>
              <td className="text-center py-8">
                <img
                  src="https://playstoreopal.com/wp-content/uploads/2023/05/Samsung-EP-DA705B-TypeC-to-TypeC-Fast-Charging-Cable-60W.webp"
                  alt="hb"
                  className="max-h-40 max-w-lg"
                />
              </td>
              <td className="text-center py-8">کابل Type-C</td>
              <td className="text-center py-8">190000 تومان</td>
              <td className="text-center py-8">18</td>
              <td className="flex gap-4 text-center py-8">
                <button type="button" className="btn">
                  جزئیات
                </button>
                <button type="button" className="btn">
                  حذف
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

export default Products;
