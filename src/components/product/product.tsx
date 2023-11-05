interface productProps {
  name: string;
  img: string;
  price: string;
  count: string;
  setIsShowEditModal: (value: React.SetStateAction<boolean>) => void;
  setIsShowDetailsModal: (value: React.SetStateAction<boolean>) => void;
  setIsShowModal: (value: React.SetStateAction<boolean>) => void;
}
export const Product = ({
  name,
  img,
  price,
  count,
  setIsShowEditModal,
  setIsShowDetailsModal,
  setIsShowModal,
}: productProps) => {
  return (
    <tr>
      <td className="md:flex justify-center">
        <img src={img} alt="hb" className="max-h-40" />
      </td>
      <td className="md:text-center py-8">{name}</td>
      <td className="md:text-center py-8">{price.toLocaleString()} تومان</td>
      <td className="md:text-center py-8">{count}</td>
      <td className="py-8 text-center">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setIsShowDetailsModal(true);
          }}
        >
          جزئیات
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setIsShowModal(true);
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
};
