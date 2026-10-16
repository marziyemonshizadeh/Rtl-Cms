import { useAppDispatch } from "@/redux/hooks";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import ReactDom from "react-dom";
import ModalsTemplate from "@/components/modalsTemplate/modalsTemplate";

interface ModalProps {
  submitAction: () => void;
  cancelAction: () => void;
  remove: (id: number | undefined) => ThunkAction<unknown, RootState, unknown, Action>;
  Id: number | undefined;
  onclick?: () => void;
}
export default function Modal({
  Id,
  remove,
  cancelAction,
  submitAction,
}: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();

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
            dispatch(remove(Id));
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
