import { useEffect } from "react";
import ReactDom from "react-dom";
import ModalsTemplate from "../modalsTemplate/modalsTemplate";

interface EditModalProps {
  onClose: () => void;
  // onSubmit: (e: any) => void;
  onclick?: () => void;
  children: React.ReactNode;
}
export default function EditModal({ onClose, children }: EditModalProps) {
  useEffect(() => {
    const checkKey = (event: any) => {
      console.log(event);
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });
  return ReactDom.createPortal(
    <ModalsTemplate>
      <div className="text-center text-xl">
        <div className="flex flex-col">
          <h1 className=" text-3xl font-extrabold border-b-2 pb-3">
            اطلاعات جدید را وارد نمایید
          </h1>
          {children}
        </div>
      </div>
    </ModalsTemplate>,
    document.getElementById("modal")!
  );
}
