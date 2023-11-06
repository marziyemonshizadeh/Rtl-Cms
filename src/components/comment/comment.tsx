interface commentProps {
  name: string;
  product: string;
  history: string;
  time: string;
}
export default function Comment({
  name,
  product,
  history,
  time,
}: commentProps) {
  return (
    <tr>
      <td className="text-center py-8">{name} </td>
      <td className="text-center py-8"> {product} </td>
      <td className="text-center py-8">
        <button type="button" className="btn">
          دیدن کامنت
        </button>
      </td>
      <td className="text-center py-8">{history}</td>
      <td className="text-center py-8">{time}</td>
      <td className="py-8 text-center">
        <button type="button" className="btn">
          حذف
        </button>
        <button type="button" className="btn">
          تایید
        </button>
        <button type="button" className="btn">
          پاسخ
        </button>
        <button type="button" className="btn">
          ویرایش
        </button>
      </td>
    </tr>
  );
}
