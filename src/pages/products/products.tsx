import { useState } from "react";
import { useQuery } from "react-query";
import DeleteModal from "../../components/Modals/deleteModal";
import DetailsModal from "../../components/Modals/detailsModal";
import EditModal from "../../components/Modals/editModal";
import AddNewProduct from "../../components/addNewProduct/addNewProduct";
import ErrorBox from "../../components/errorBox/errorBox";
import { Product } from "../../components/product/product";

const Products = () => {
  // state
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);

  // funcs
  const modalCancel = () => {
    setIsShowModal(false);
  };
  const modalSubmit = () => {
    setIsShowModal(false);
  };
  const editInfosSubmit = (e: any) => {
    e.preventDefault();
    setIsShowEditModal(false);
    console.log(isShowEditModal);
  };
  const { data, isLoading, isError } = useQuery("Products", () =>
    fetch("http://localhost:3001/products").then((res) => res.json())
  );
  return (
    <>
      {console.log(data)}
      <AddNewProduct />
      {isLoading && (
        <div className="mx-auto text-gray-500">لطفا کمی صبر کنید...</div>
      )}
      {isError && (
        <div className="text-red-700">
          متاسفانه مشکلی پیش آمده است نمی توانیم داده ها را نمایش دهیم
        </div>
      )}
      {data?.length ? (
        <>
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
                {data?.map(
                  (item: any): JSX.Element => (
                    <Product
                      key={item.id}
                      setIsShowModal={setIsShowModal}
                      setIsShowDetailsModa={setIsShowDetailsModal}
                      setIsShowEditModal={setIsShowEditModal}
                      {...item}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>{!isLoading && <ErrorBox message="هیچ محصولی یافت نشد" />}</>
      )}

      {/* modals */}
      {isShowModal && (
        <DeleteModal submitAction={modalSubmit} cancelAction={modalCancel} />
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={() => setIsShowDetailsModal(false)} />
      )}
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
