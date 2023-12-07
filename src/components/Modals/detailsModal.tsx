import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import apiRequests from "../../services/configs";
import ModalsTemplate from "../modalsTemplate/modalsTemplate";

interface DetailsModalProps {
  onHide: () => void;
  // Get: any;
  product?: boolean;
  user?: boolean;
  discount?: boolean;
  order?: boolean;
  getItem: string;
  Id?: number;
  children: React.ReactNode;
  onclick?: () => void;
}
export default function DetailsModal({
  Id,
  getItem,
  product,
  user,
  order,
  discount,
  // Get,
  onHide,
  children,
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
  const [Data, setData] = useState<any>();
  // const dispatch = useDispatch<any>();

  useEffect(() => {
    apiRequests.get(`http://localhost:3001/${getItem}/${Id}`).then((res) => {
      setData(res.data);
      console.log("res = ", res.data);
    });
  }, [Id]);
  console.log("data = ", Data);

  // const { data } = useQuery("Products", () =>
  //   fetch(`http://localhost:3001/products/${Id}`).then((res) => res.json())
  // );

  return (
    <ModalsTemplate>
      <div className="text-center font-extrabold text-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b">{children}</tr>
          </thead>

          <tbody>
            <tr>
              {product && (
                <>
                  <td className="td">{Data?.name}</td>
                  <td className="td"> {Data?.price}</td>
                  <td className="td">{Data?.count}</td>
                </>
              )}
              {user && (
                <>
                  <td className="td">{Data?.customer}</td>
                  <td className="td"> {Data?.userName}</td>
                  <td className="td">{Data?.password}</td>
                </>
              )}
              {discount && (
                <>
                  <td className="td">{Data?.discountCode}</td>
                  <td className="td"> {Data?.product}</td>
                  <td className="td">{Data?.discountPercent}</td>
                </>
              )}
              {order && (
                <>
                  <td className="td">{Data?.customer}</td>
                  <td className="td">{Data?.product}</td>
                  <td className="td">{Data?.password}</td>
                  <td className="td">{Data?.price}</td>
                  <td className="td">{Data?.discount}</td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </ModalsTemplate>
  );
}
