// import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import DeleteModal from "../../components/Modals/deleteModal";
import DetailsModal from "../../components/Modals/detailsModal";
import EditModal from "../../components/Modals/editModal";
import AddNewProduct from "../../components/addNewProduct/addNewProduct";
import ErrorBox from "../../components/errorBox/errorBox";
// import Product from "../../components/product/product";
import { useAppSelector } from "../../redux/store";
import { fetchProduct, removeProduct } from "../../redux/store/products";
const Products = () => {
  // state
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [productId, setProductId] = useState();
  // funcs
  const modalCancel = () => {
    setIsShowModal(false);
  };
  const modalSubmit = () => {
    setIsShowModal(false);
    console.log(productId);
    dispatch(removeProduct(productId));
  };
  const editInfosSubmit = (e: any) => {
    e.preventDefault();
    setIsShowEditModal(false);
    console.log(isShowEditModal);
  };
  const closeDetailsmodal = () => {
    setIsShowDetailsModal(false);
    console.log("مدال جزییات بسته شد");
  };
  // const { data, isLoading, isError } = useQuery("Products", () =>
  //   fetch("http://localhost:3001/products").then((res) => res.json())
  // );
  const dispatch = useDispatch<any>();
  const data = useAppSelector((state) => state.products);
  // console.log("data===", data);

  useEffect(() => {
    dispatch(fetchProduct("products"));
  }, []);

  return (
    <>
      <AddNewProduct />
      {data.products?.length ? (
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
                  <tr key={item.id}>
                    <td className="md:flex justify-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="max-h-40"
                      />
                    </td>
                    <td className="md:text-center py-8">{item.name}</td>
                    <td className="md:text-center py-8">
                      {item.price?.toLocaleString()} تومان
                    </td>
                    <td className="md:text-center py-8">{item.count}</td>
                    <td className="py-8 text-center">
                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          setIsShowDetailsModal(true);
                          console.log(item);
                        }}
                      >
                        جزئیات
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          setIsShowModal(true);
                          setProductId(item.id);
                        }}
                      >
                        حذف
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => setIsShowEditModal(true)}
                      >
                        ویرایش
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <ErrorBox message="هیچ محصولی یافت نشد" />
      )}

      {/* modals */}
      {isShowModal && (
        <DeleteModal
          productId={productId}
          submitAction={modalSubmit}
          cancelAction={modalCancel}
        />
      )}
      {isShowDetailsModal && <DetailsModal onHide={closeDetailsmodal} />}
      {isShowEditModal && (
        <EditModal
          onClose={() => {
            console.log("close");
            setIsShowEditModal(false);
          }}
          onSubmit={editInfosSubmit}
        >
          <input
            className="input mx-auto my-2 text-right font-normal"
            type="text"
            placeholder="نام جدید محصول را وارد کنید "
            aria-label="Full name"
          />
          <input
            className="input mx-auto my-2 text-right font-normal"
            type="text"
            placeholder="قیمت جدید محصول را وارد کنید "
            aria-label="Full name"
          />
          <input
            className="input mx-auto my-2 text-right font-normal"
            type="text"
            placeholder="تعداد جدید محصول را وارد کنید "
            aria-label="Full name"
          />
        </EditModal>
      )}
    </>
  );
};

export default Products;
