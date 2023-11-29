import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
// import { removeProduct } from "../../redux/store/products";
import ModalsTemplate from "../modalsTemplate/modalsTemplate";

interface ModalProps {
  submitAction: () => void;
  cancelAction: () => void;
  remove: any;
  productId: any;
  onclick?: () => void;
}
export default function Modal({
  productId,
  remove,
  cancelAction,
  submitAction,
}: ModalProps): JSX.Element {
  const dispatch = useDispatch<any>();

  return ReactDom.createPortal(
    <ModalsTemplate>
      <p className="text-center font-extrabold text-2xl">
        مطمئن هستید می خواهید حذف کنید ؟
      </p>

      <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:justify-center sm:px-6">
        <button
          type="button"
          className="btn m-1"
          onClick={() => {
            submitAction();
            dispatch(remove(productId));
          }}
        >
          بله
        </button>
        <button
          type="button"
          className="btnLight m-1"
          onClick={() => cancelAction()}
        >
          خیر
        </button>
      </div>
    </ModalsTemplate>,
    document.getElementById("modal")!
  );
}
