interface commentProps {
  customer: string;
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
}
export default function User({
  customer,
  userName,
  password,
  phoneNumber,
  email,
}: commentProps) {
  return (
    <tr>
      <td className="text-center py-8"> {customer} </td>
      <td className="text-center py-8">{userName}</td>
      <td className="text-center py-8">{password}</td>
      <td className="text-center py-8">{phoneNumber}</td>
      <td className="text-center py-8">{email}</td>
      <td className="py-8 text-center">
        <button type="button" className="btn">
          حذف
        </button>
        <button type="button" className="btn">
          جزئیات
        </button>
        <button type="button" className="btn">
          ویرایش
        </button>
      </td>
    </tr>
  );
}
