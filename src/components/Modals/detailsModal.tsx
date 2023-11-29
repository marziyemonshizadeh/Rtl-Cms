import { useEffect } from "react";
import { useQuery } from "react-query";
import ModalsTemplate from "../modalsTemplate/modalsTemplate";

interface DetailsModalProps {
  onHide: () => void;
  productId?: any;
  onclick?: () => void;
}
export default function DetailsModal({
  productId,
  onHide,
}: DetailsModalProps): JSX.Element {
  useEffect(() => {
    const checkKey = (event: any) => {
      console.log(event);
      if (event.keyCode === 27) {
        onHide();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });
  const { data } = useQuery("Products", () =>
    fetch(`http://localhost:3001/products/${productId}`).then((res) =>
      res.json()
    )
  );
  console.log(data);

  return (
    <ModalsTemplate>
      <div className="text-center font-extrabold text-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3">اسم</th>
              <th className="py-3">قیمت</th>
              <th className="py-3">موجودی</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="td">{data?.name}</td>
              <td className="td"> {data?.price}</td>
              <td className="td">{data?.count}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ModalsTemplate>
  );
}
