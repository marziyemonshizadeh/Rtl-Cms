import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../redux/store/products";
interface ModalProps {
  submitAction: () => void;
  cancelAction: () => void;
  productId: any;
  onclick?: () => void;
}
export default function Modal({
  productId,
  cancelAction,
  submitAction,
}: ModalProps): JSX.Element {
  const dispatch = useDispatch<any>();

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
              <p className="text-center font-extrabold text-2xl">
                مطمئن هستید می خواهید حذف کنید ؟
              </p>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:justify-center sm:px-6">
              <button
                type="button"
                className="btn my-2"
                onClick={() => {
                  submitAction();
                  dispatch(removeProduct(productId));
                }}
              >
                بله
              </button>
              <button
                type="button"
                className="btnLight"
                onClick={() => cancelAction()}
              >
                خیر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
