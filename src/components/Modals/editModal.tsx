import { useEffect } from "react";
import ReactDom from "react-dom";

interface EditModalProps {
  onClose: () => void;
  onSubmit: (e: any) => void;
  onclick?: () => void;
  children: React.ReactNode;
}
export default function EditModal({
  onClose,
  onSubmit,
  children,
}: EditModalProps) {
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
    <>
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
                <div className="text-center text-xl">
                  <form className="flex flex-col">
                    <h1 className="font-extrabold">
                      اطلاعات جدید را وارد نمایید
                    </h1>
                    {children}
                    <button type="button" className="btn" onClick={onSubmit}>
                      ثبت اطلاعات جدید
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")!
  );
}
