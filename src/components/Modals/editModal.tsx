import type { ReactNode } from "react";
import ModalsTemplate from "@/components/modalsTemplate/modalsTemplate";

interface EditModalProps {
  onClose: () => void;
  pending: boolean;
  children: ReactNode;
}

export default function EditModal({ onClose, pending, children }: EditModalProps) {
  return (
    <ModalsTemplate
      title="ویرایش اطلاعات"
      description="اطلاعات جدید را وارد کنید و تغییرات را ثبت کنید."
      onClose={onClose}
      pending={pending}
    >
      {children}
    </ModalsTemplate>
  );
}
