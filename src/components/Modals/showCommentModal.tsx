import type { ReactNode } from "react";
import ModalsTemplate from "@/components/modalsTemplate/modalsTemplate";

interface ShowCommentProps {
  onHide: () => void;
  children: ReactNode;
}

export default function ShowComment({ onHide, children }: ShowCommentProps) {
  return (
    <ModalsTemplate
      title="متن دیدگاه"
      description="متن کامل دیدگاه ثبت‌شده را بخوانید."
      onClose={onHide}
    >
      {children}
    </ModalsTemplate>
  );
}
