import ModalsTemplate from "@/components/modalsTemplate/modalsTemplate";
import { Button } from "@/components/ui/button";

interface ModalProps {
  submitAction: () => Promise<void>;
  cancelAction: () => void;
  pending: boolean;
  error?: string | null;
}

export default function Modal({ pending, error, cancelAction, submitAction }: ModalProps) {
  return (
    <ModalsTemplate
      title="تأیید حذف"
      description="مطمئن هستید می‌خواهید این مورد را حذف کنید؟"
      onClose={cancelAction}
      pending={pending}
    >
      {error && <p role="alert" className="text-start text-destructive">{error}</p>}
      <div className="flex flex-wrap justify-end gap-3" aria-busy={pending}>
        <Button type="button" variant="outline" disabled={pending} onClick={cancelAction}>
          خیر
        </Button>
        <Button
          type="button"
          variant="destructive"
          disabled={pending}
          onClick={() => void submitAction()}
        >
          {pending ? "در حال حذف..." : "بله"}
        </Button>
      </div>
    </ModalsTemplate>
  );
}
