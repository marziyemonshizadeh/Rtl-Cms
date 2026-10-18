import ModalsTemplate from "@/components/modalsTemplate/modalsTemplate";
import type Comment from "./models/comment";

interface CommentDetailsProps {
  comment: Comment;
  onClose: () => void;
}

export default function CommentDetails({ comment, onClose }: CommentDetailsProps) {
  return (
    <ModalsTemplate
      title="متن دیدگاه"
      description="متن کامل دیدگاه ثبت‌شده را بخوانید."
      onClose={onClose}
    >
      <p className="whitespace-pre-wrap break-words text-start text-sm leading-8 [overflow-wrap:anywhere]">
        {comment.comment}
      </p>
    </ModalsTemplate>
  );
}
