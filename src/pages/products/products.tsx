import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import DeleteModal from "../../components/Modals/deleteModal";
import DetailsModal from "../../components/Modals/detailsModal";
import EditModal from "../../components/Modals/editModal";
import AddNewProduct from "../../components/addNewProduct/addNewProduct";
import ErrorBox from "../../components/errorBox/errorBox";
import { useAppSelector } from "../../redux/store";
import { fetchProduct, removeProduct } from "../../redux/store/products";
import apiRequests from "../../services/configs";
type Inputs = {
  newName: string;
  newPrice: Number;
  newCount: string;
};
const Products: React.FC = () => {
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
  // const editInfosSubmit = (e: any) => {
  //   e.preventDefault();
  //   setIsShowEditModal(false);
  //   console.log(isShowEditModal);
  // };
  const closeDetailsmodal = () => {
    setIsShowDetailsModal(false);
    console.log("مدال جزییات بسته شد");
  };
  // const { data, isLoading, isError } = useQuery("Products", () =>
  //   fetch("http://localhost:3001/products").then((res) => res.json())
  // );
  const dispatch = useDispatch<any>();
  const data = useAppSelector((state) => state.products);
  console.log("data===", data);

  useEffect(() => {
    dispatch(fetchProduct("products"));
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    apiRequests.post("/products/", data).then((res) => {
      console.log("get post called");
      return res.data;
    });
  };
  console.log(watch("newName"));
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
                        className="btn m-1"
                        onClick={() => {
                          setIsShowDetailsModal(true);
                          setProductId(item.id);
                          console.log(item);
                        }}
                      >
                        جزئیات
                      </button>
                      <button
                        type="button"
                        className="btn m-1"
                        onClick={() => {
                          setIsShowModal(true);
                          setProductId(item.id);
                        }}
                      >
                        حذف
                      </button>
                      <button
                        type="button"
                        className="btn m-1"
                        onClick={() => {
                          setIsShowEditModal(true);
                          setProductId(item.id);
                        }}
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
      {isShowDetailsModal && (
        <DetailsModal productId={productId} onHide={closeDetailsmodal} />
      )}
      {isShowEditModal && (
        <EditModal
          onClose={() => {
            console.log("close");
            setIsShowEditModal(false);
          }}
        >
          <form
            className="text-center min-h-64 pt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              // defaultValue="test"
              className="input"
              type="text"
              placeholder="نام جدید محصول را وارد کنید "
              aria-label="newName"
              {...register("newName")}
            />
            {errors.newName && <span>This field is required</span>}
            <input
              className="input"
              type="text"
              placeholder="قیمت جدید محصول را وارد کنید "
              aria-label="newPrice"
              {...register("newPrice")}
            />
            <input
              className="input"
              type="text"
              placeholder="تعداد جدید محصول را وارد کنید "
              aria-label="newCount"
              {...register("newCount")}
            />
            <button type="submit" className="mx-auto block btn my-5">
              ثبت اطلاعات جدید
            </button>
          </form>
        </EditModal>
      )}
    </>
  );
};

export default Products;
