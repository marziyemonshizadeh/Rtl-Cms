import { useEffect, useState } from "react";
import AddNewProduct from "../../components/addNewProduct/addNewProduct";
import apiRequests from "../../services/configs";

interface products {
  id: number;
  name: string;
  img: string;
  price: string;
  count: string;
}
const Products = () => {
  const [myProducts, setMyProducts] = useState<products[]>();
  const loadProducts = async () => {
    const res = await apiRequests.get("/products");
    setMyProducts(res?.data);
    console.log("res =>", myProducts);
  };
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <>
      <AddNewProduct />
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3">عکس</th>
              <th className="py-3">اسم</th>
              <th className="py-3">قیمت</th>
              <th className="py-3">موجودی</th>
              <th className="py-3">وضعیت</th>
            </tr>
          </thead>

          <tbody>
            {myProducts?.map((i: any): JSX.Element => {
              return (
                <tr key={i.id}>
                  <td className="md:flex justify-center">
                    <img src={i.img} alt="hb" className="max-h-40" />
                  </td>
                  <td className="md:text-center py-8"> {i.name}</td>
                  <td className="md:text-center py-8">
                    {i.price.toLocaleString()} تومان
                  </td>
                  <td className="md:text-center py-8">{i.count}</td>
                  <td className="py-8 text-center">
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
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
