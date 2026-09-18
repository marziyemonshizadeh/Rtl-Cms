import ErrorBox from "../../components/errorBox/errorBox";
import User from "../../components/user/user";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { fetchUser } from "../../redux/store/users";

const Users: React.FC = () => {
  const dispatch = useDispatch<any>();
  const data = useAppSelector((state) => state.users);
  console.log("data===", data);

  useEffect(() => {
    dispatch(fetchUser("users"));
  }, []);

  return (
    <>
      <h1 className="header">لیست کاربران</h1>
      {data.loading ? (
        <div>لطفا کمی صبر کنید...</div>
      ) : data.users?.length ? (
        <div className="table-container mt-5">
          <table className="w-full hidden md:table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">نام و نام خانوادگی</th>
                <th className="table-header-cell">نام کاربری </th>
                <th className="table-header-cell">رمز عبور</th>
                <th className="table-header-cell">شماره تماس</th>
                <th className="table-header-cell">ایمیل</th>
                <th className="table-header-cell">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {data.users?.map((item: any) => {
                return <User key={item.id} {...item} />;
              })}
            </tbody>
          </table>
          <div className="md:hidden block p-4">
            {data.users?.map((item: any) => (
              <div key={item.id} className="mobile-card">
                <div className="mobile-card-row">
                  <span className="mobile-card-label">نام و نام خانوادگی</span>
                  <span className="mobile-card-value">{item.customer}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">نام کاربری</span>
                  <span className="mobile-card-value">{item.userName}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">رمز عبور</span>
                  <span className="mobile-card-value">{item.password}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">شماره تماس</span>
                  <span className="mobile-card-value">{item.phoneNumber}</span>
                </div>
                <div className="mobile-card-row">
                  <span className="mobile-card-label">ایمیل</span>
                  <span className="mobile-card-value">{item.email}</span>
                </div>
                <User {...item} isMobile />
              </div>
            ))}
          </div>
        </div>
      ) : (
        !data.loading && <ErrorBox message="هیچ کاربری یافت نشد" />
      )}
    </>
  );
};

export default Users;
