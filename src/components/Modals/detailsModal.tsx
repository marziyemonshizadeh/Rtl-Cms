import { useEffect } from "react";
import ReactDom from "react-dom";
interface DetailsModalProps {
  onHide: () => void;
  onclick?: () => void;
}
export default function DetailsModal({
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

  return ReactDom.createPortal(
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
                      <td className="td">msi</td>
                      <td className="td"> 30000000</td>
                      <td className="td">50</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
