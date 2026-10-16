import ReactDom from "react-dom";
import ModalsTemplate from "@/components/modalsTemplate/modalsTemplate";
import { Button } from "@/components/ui/button";

interface ModalProps {
  submitAction: () => Promise<void>;
  cancelAction: () => void;
  pending: boolean;
  error?: string | null;
}
export default function Modal({
  pending,
  error,
  cancelAction,
  submitAction,
}: ModalProps): JSX.Element {
  return ReactDom.createPortal(
    <ModalsTemplate>
      <p className="text-center font-extrabold text-2xl">
        مطمئن هستید می خواهید حذف کنید ؟
      </p>
      {error && <p role="alert" className="text-center text-destructive">{error}</p>}

      <div aria-busy={pending} className="bg-card px-4 py-3 sm:flex sm:flex-row-reverse sm:justify-center sm:px-6">
        <Button
          type="button"
          variant="destructive"
          className="m-1"
          disabled={pending}
          onClick={() => void submitAction()}
        >
          {pending ? "در حال حذف..." : "بله"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="m-1"
          disabled={pending}
          onClick={() => cancelAction()}
        >
          خیر
        </Button>
      </div>
    </ModalsTemplate>,
    document.getElementById("modal")!
  );
}
