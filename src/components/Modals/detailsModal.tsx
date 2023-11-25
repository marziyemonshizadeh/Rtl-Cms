import { useEffect } from "react";
import { useQuery } from "react-query";

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
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
