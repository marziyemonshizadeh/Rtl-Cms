import { useEffect } from "react";
// import { useQuery } from "react-query";
import ModalsTemplate from "@/components/modalsTemplate/modalsTemplate";

interface ShowCommentProps {
  comment: string;
  onHide: () => void;
  id?: number;
  onclick?: () => void;
}
export default function ShowComment({
  comment,
  // id,
  onHide,
}: ShowCommentProps): JSX.Element {
  useEffect(() => {
    const checkKey = (event: KeyboardEvent) => {
      console.log(event);
      if (event.keyCode === 27) {
        onHide();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });
  // const allComments = useAppSelector((state) => state.comments);
  // let findMyComment = allComments.comments.find((i) => i.id === id);

  return (
    <ModalsTemplate>
      <div className="text-center text-xl">
        <span className="text-3xl font-extrabold text-foreground">
          {comment}
        </span>
      </div>
    </ModalsTemplate>
  );
}
