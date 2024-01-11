import { useEffect } from "react";
// import { useQuery } from "react-query";
// import apiRequests from "../../services/configs";
import ModalsTemplate from "../modalsTemplate/modalsTemplate";

interface DetailsModalProps {
  onHide: () => void;
  product?: string;
  user?: string;
  discount?: string;
  order?: boolean;
  name?: string;
  count?: string;
  price?: string;
  orderDate?: string;
  customer?: string;
  discountPercent?: string;
  discountCode?: string;
  userName?: string;
  password?: string;
  children: React.ReactNode;
  onclick?: () => void;
}
export default function DetailsModal({
  price,
  count,
  name,
  product,
  user,
  order,
  discount,
  orderDate,
  customer,
  discountPercent,
  discountCode,
  userName,
  password,
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
  // const [Data, setData] = useState<any>();

  // useEffect(() => {
  //   apiRequests.get(`http://localhost:3001/${getItem}/${Id}`).then((res) => {
  //     setData(res.data);
  //     console.log("res = ", res.data);
  //   });
  // }, [Id]);
  // console.log("data = ", Data);

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
                  <td className="td">{name}</td>
                  <td className="td"> {price}</td>
                  <td className="td">{count}</td>
                </>
              )}
              {user && (
                <>
                  <td className="td">{customer}</td>
                  <td className="td"> {userName}</td>
                  <td className="td">{password}</td>
                </>
              )}
              {discount && (
                <>
                  <td className="td">{discountCode}</td>
                  <td className="td"> {product}</td>
                  <td className="td">{discountPercent}</td>
                </>
              )}
              {order && (
                <>
                  <td className="td">{product}</td>
                  <td className="td">{customer}</td>
                  <td className="td">{orderDate}</td>
                  <td className="td">{price}</td>
                  <td className="td">{discount}</td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </ModalsTemplate>
  );
}
