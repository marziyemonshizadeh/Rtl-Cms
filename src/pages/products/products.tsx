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
        <div className="table-container">
          <table className="w-full hidden md:table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">عکس</th>
                <th className="table-header-cell">اسم</th>
                <th className="table-header-cell">قیمت</th>
                <th className="table-header-cell">موجودی</th>
                <th className="table-header-cell">وضعیت</th>
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
          <div className="md:hidden block p-4">
            {data.products.map((item: any) => (
              <div key={item.id} className="mobile-card">
                <div className="mobile-card-row">
                  <span className="mobile-card-label">عکس</span>
                  <img src={item.img} alt={item.name} className="max-h-24 rounded" />
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">اسم</span>
                  <span className="mobile-card-value">{item.name}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">قیمت</span>
                  <span className="mobile-card-value">{item.price.toLocaleString()} تومان</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">موجودی</span>
                  <span className="mobile-card-value">{item.count}</span>
                </div>
                <Product {...item} isMobile />
              </div>
            ))}
          </div>
        </div>
      ) : (
        !data.loading && <ErrorBox message="هیچ محصولی یافت نشد" />
      )}
    </>
  );
};

export default Products;
