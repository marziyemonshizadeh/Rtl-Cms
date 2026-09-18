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
        <div className="table-container mt-5">
          <table className="w-full hidden md:table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">اسم کاربر</th>
                <th className="table-header-cell">محصول</th>
                <th className="table-header-cell">کامنت</th>
                <th className="table-header-cell">تاریخ</th>
                <th className="table-header-cell">ساعت</th>
                <th className="table-header-cell">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {data.comments?.map((item: any) => {
                return <Comment key={item.id} {...item} />;
              })}
            </tbody>
          </table>
          <div className="md:hidden block p-4">
            {data.comments?.map((item: any) => (
              <div key={item.id} className="mobile-card">
                <div className="mobile-card-row">
                  <span className="mobile-card-label">اسم کاربر</span>
                  <span className="mobile-card-value">{item.name}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">محصول</span>
                  <span className="mobile-card-value">{item.product}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">تاریخ</span>
                  <span className="mobile-card-value">{item.history}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">ساعت</span>
                  <span className="mobile-card-value">{item.time}</span>
                </div>
                <Comment {...item} isMobile />
              </div>
            ))}
          </div>
        </div>
      ) : (
        !data.loading && <ErrorBox message="هیچ کامنتی یافت نشد" />
      )}
    </>
  );
};

export default Comments;
