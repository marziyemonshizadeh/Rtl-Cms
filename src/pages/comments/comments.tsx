import { useQuery } from "react-query";
import Comment from "../../components/comment/comment";
import ErrorBox from "../../components/errorBox/errorBox";

const Comments: React.FC = () => {
  const { data, isLoading } = useQuery("comments", () =>
    fetch("http://localhost:3001/comments").then((res) => res.json())
  );
  return (
    <>
      <h1 className="header"> کامنت های محصولات</h1>
      {data?.length ? (
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
              {isLoading && (
                <div className="mx-auto text-gray-500">
                  لطفا کمی صبر کنید...
                </div>
              )}
              {data?.map((item: any) => {
                return <Comment key={item.id} {...item} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <ErrorBox message="هیچ کامنتی یافت نشد" />
      )}
    </>
  );
};

export default Comments;
