// import { useQuery } from "react-query";
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
      {/* {isLoading && ( */}
      {/* <div className="mx-auto text-gray-500">لطفا کمی صبر کنید...</div>
      )} */}
      {data.loading ? (
        <div>لطفا کمی صبر کنید...</div>
      ) : data.users?.length ? (
        <div className="card mt-5">
          <table className="w-full">
            <thead className="border-b-2">
              <tr>
                <th className="py-8">نام و نام خانوادگی</th>
                <th className="py-8">نام کاربری </th>
                <th className="py-8">رمز عبور</th>
                <th className="py-8">شماره تماس</th>
                <th className="py-8">ایمیل</th>
                <th className="py-8">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {data.users?.map((item: any) => {
                return <User key={item.id} {...item} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !data.loading && <ErrorBox message="هیچ کاربری یافت نشد" />
      )}
    </>
  );
};

export default Users;
