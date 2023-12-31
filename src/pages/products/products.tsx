import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../components/Modals/deleteModal";
import DetailsModal from "../../components/Modals/detailsModal";
import EditModal from "../../components/Modals/editModal";
import AddNewProduct from "../../components/addNewProduct/addNewProduct";
import ErrorBox from "../../components/errorBox/errorBox";
import Product from "../../components/product/product";
import { useAppSelector } from "../../redux/store";
import { fetchProduct, removeProduct } from "../../redux/store/products";
import apiRequests from "../../services/configs";
type Inputs = {
  newName: string;
  img: string;
  newPrice: Number;
  newCount: string;
};

const Products: React.FC = () => {
  // state
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>();
  const data = useAppSelector((state) => state.products);
  // let m = data.products.filter((item) => item.id === productId)[0];
  // const [editThisProduct, setEditThisProduct] = useState<any>(m);
  const dispatch = useDispatch<any>();
  // console.log("editThisProduct", editThisProduct);

  // funcs

  const modalSubmit = () => {
    setIsShowModal(false);
    console.log(productId);
    dispatch(removeProduct(productId));
    toast.success("! محصول مورد نظر با موفقیت حذف شد", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editInfosSubmit = (id: any) => {
    setIsShowEditModal(true);
    setProductId(id);
    // () => console.log("set product id =", productId);
    // setEditThisProduct(data.products.filter((i) => i.id === productId)[0]);
  };
  {
    console.log("set product id =", productId);
  }
  useEffect(() => {
    dispatch(fetchProduct("products"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    apiRequests.put(`/products/${productId}`, {
      name: data?.newName,
      img: data?.img,
      price: data?.newPrice,
      count: data?.newCount,
    });
  };
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
                  // <tr key={item.id}>
                  //   <td className="md:flex justify-center">
                  //     <img
                  //       src={item.img}
                  //       alt={item.name}
                  //       className="max-h-40"
                  //     />
                  //   </td>
                  //   <td className="md:text-center py-8">{item.name}</td>
                  //   <td className="md:text-center py-8">
                  //     {item.price?.toLocaleString()} تومان
                  //   </td>
                  //   <td className="md:text-center py-8">{item.count}</td>
                  //   <td className="py-8 text-center">
                  //     <button
                  //       type="button"
                  //       className="btn m-1"
                  //       onClick={() => {
                  //         setIsShowDetailsModal(true);
                  //         setProductId(item.id);
                  //       }}
                  //     >
                  //       جزئیات
                  //     </button>
                  //     <button
                  //       type="button"
                  //       className="btn m-1"
                  //       onClick={() => {
                  //         setIsShowModal(true);
                  //         setProductId(item.id);
                  //       }}
                  //     >
                  //       حذف
                  //     </button>
                  //     <button
                  //       type="button"
                  //       className="btn m-1"
                  //       onClick={() => editInfosSubmit(item.id)}
                  //     >
                  //       ویرایش
                  //     </button>
                  //   </td>
                  // </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        !data.loading && <ErrorBox message="هیچ محصولی یافت نشد" />
      )}
      {/* {console.log("seteditThisProduct", editThisProduct)} */}
      {/* modals */}
      {isShowModal && (
        <DeleteModal
          Id={productId}
          submitAction={modalSubmit}
          cancelAction={() => setIsShowModal(false)}
          remove={removeProduct}
        />
      )}

      {isShowDetailsModal && (
        <DetailsModal
          Id={productId}
          // Get={fetchProduct}
          getItem="products"
          onHide={() => setIsShowDetailsModal(false)}
          product={true}
        >
          <th className="py-3">اسم</th>
          <th className="py-3">قیمت</th>
          <th className="py-3">موجودی</th>
        </DetailsModal>
      )}
      {/* {console.log("setEditThisProduct", editThisProduct[0])} */}
      {/* {console.log("m=", m?.name)} */}
      {isShowEditModal && (
        <EditModal
          onClose={() => {
            console.log("close");
            setIsShowEditModal(false);
          }}
        >
          <form className="min-h-64 pt-5" onSubmit={handleSubmit(onSubmit)}>
            {/* {console.log("edit................", editThisProduct)} */}
            <input
              className="input w-full text-right"
              type="text"
              placeholder="نام جدید محصول را وارد کنید "
              aria-label="newName"
              {...register("newName")}
            />
            {errors.newName && <span>This field is required</span>}
            <input
              className="input w-full text-right"
              type="text"
              placeholder=" آدرس جدید محصول را وارد کنید "
              aria-label="img"
              {...register("img")}
            />
            {errors.img && <span>This field is required</span>}
            <input
              // defaultValue="1"
              className="input w-full text-right"
              type="text"
              placeholder="قیمت جدید محصول را وارد کنید "
              aria-label="newPrice"
              {...register("newPrice")}
            />
            <input
              className="input w-full text-right"
              type="text"
              placeholder="تعداد جدید محصول را وارد کنید "
              aria-label="newCount"
              {...register("newCount")}
            />
            <div className="flex justify-center gap-3">
              <button type="submit" className="btnLight my-5">
                cancel
              </button>
              <button type="submit" className="btn my-5">
                ثبت اطلاعات جدید
              </button>
            </div>
          </form>
        </EditModal>
      )}
    </>
  );
};

export default Products;
