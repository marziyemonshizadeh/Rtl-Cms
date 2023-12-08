import { useEffect } from "react";
// import { useQuery } from "react-query";
import { useAppSelector } from "../../redux/store";
import ModalsTemplate from "../modalsTemplate/modalsTemplate";

interface ShowCommentProps {
  onHide: () => void;
  id?: any;
  onclick?: () => void;
}
export default function ShowComment({
  id,
  onHide,
}: ShowCommentProps): JSX.Element {
  useEffect(() => {
    const checkKey = (event: any) => {
      console.log(event);
      if (event.keyCode === 27) {
        onHide();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });
  const allComments = useAppSelector((state) => state.comments);
  let findMyComment = allComments.comments.find((i) => i.id === id);

  return (
    <ModalsTemplate>
      <div className="text-center text-xl">
        <span className=" text-3xl font-extrabold dark:text-black">
          {findMyComment?.comment}
        </span>
      </div>
    </ModalsTemplate>
  );
}
