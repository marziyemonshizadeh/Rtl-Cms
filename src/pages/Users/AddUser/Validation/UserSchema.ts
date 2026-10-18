import type { RegisterOptions } from "react-hook-form";
import type { UserValues } from "../Models/UserModel";

const UserSchema: { [Field in keyof UserValues]: RegisterOptions<UserValues, Field> } = {
  customer: { required: "نام و نام خانوادگی الزامی است." },
  userName: { required: "نام کاربری الزامی است." },
  password: { required: "رمز عبور الزامی است." },
  phoneNumber: { required: "شماره تماس الزامی است." },
  email: { required: "ایمیل الزامی است." },
};

export default UserSchema;
