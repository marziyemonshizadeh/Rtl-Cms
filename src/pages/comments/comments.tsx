import { useEffect } from "react";
// import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import Comment from "../../components/comment/comment";
import ErrorBox from "../../components/errorBox/errorBox";
import { useAppSelector } from "../../redux/store";
import { fetchComment } from "../../redux/store/comments";

const Comments: React.FC = () => {
  const dispatch = useDispatch<any>();
  const data = useAppSelector((state) => state.comments);
  console.log("data===", data);

  useEffect(() => {
    dispatch(fetchComment("comments"));
  }, []);
  return (
    <>
      <h1 className="header"> کامنت های محصولات</h1>
      {data.loading ? (
        <div>در حال بارگزاری ...</div>
      ) : data.comments?.length ? (
        <div className="card mt-5">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="py-8">اسم کاربر</th>
                <th className="py-8">محصول</th>
                <th className="py-8">کامنت</th>
                <th className="py-8">تاریخ</th>
                <th className="py-8">ساعت</th>
                <th className="py-8">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {data.comments?.map((item: any) => {
                return <Comment key={item.id} {...item} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !data.loading && <ErrorBox message="هیچ کامنتی یافت نشد" />
      )}
    </>
  );
};

export default Comments;
