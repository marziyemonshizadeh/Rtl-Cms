import { useEffect, useState } from "react";
import DeleteModal from "../../components/Modals/deleteModal";
import DetailsModal from "../../components/Modals/detailsModal";
import EditModal from "../../components/Modals/editModal";
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
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);

  const modalCancel = () => {
    setIsShowModal(false);
  };
  const modalSubmit = () => {
    setIsShowModal(false);
  };
  const loadProducts = async () => {
    const res = await apiRequests.get("/products");
    setMyProducts(res?.data);
    console.log("res =>", myProducts);
  };
  const editInfosSubmit = (e: any) => {
    e.preventDefault();
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
            {myProducts?.map((i): JSX.Element => {
              return (
                //move to product component
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
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setIsShowDetailsModal(true)}
                    >
                      جزئیات
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setIsShowModal((prev) => !prev);
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
              );
            })}
          </tbody>
        </table>
      </div>
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
          onSubmit={() => {
            console.log("submit");
            editInfosSubmit;
          }}
        >
          i am children
        </EditModal>
      )}
    </>
  );
};

export default Products;
