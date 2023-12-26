import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewProduct from "../../components/addNewProduct/addNewProduct";
import ErrorBox from "../../components/errorBox/errorBox";
import Product from "../../components/product/product";
import { useAppSelector } from "../../redux/store";
import { fetchProduct } from "../../redux/store/products";

const Products: React.FC = () => {
  const data = useAppSelector((state) => state.products);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchProduct("products"));
  }, []);

  return (
    <>
      <AddNewProduct />
      <ToastContainer />
      {data.loading ? (
        <div>در حال بارگزاری ...</div>
      ) : data.products?.length ? (
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
              {data.products.map(
                (item: any): JSX.Element => (
                  <Product key={item.id} {...item} />
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        !data.loading && <ErrorBox message="هیچ محصولی یافت نشد" />
      )}
    </>
  );
};

export default Products;
