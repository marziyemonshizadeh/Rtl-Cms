import { useEffect } from "react";
import { useQuery } from "react-query";
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
  const { data } = useQuery("comments", () =>
    fetch(`http://localhost:3001/comments/${id}`).then((res) => res.json())
  );
  console.log(data);
  console.log(id);

  return (
    <ModalsTemplate>
      <div className="text-center text-xl">
        <span className=" text-3xl font-extrabold">{data?.comment}</span>
      </div>
    </ModalsTemplate>
  );
}
