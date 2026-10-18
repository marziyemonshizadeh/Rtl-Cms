import DetailsModal from "@/components/Modals/detailsModal";
import type User from "./AddUser/Models/UserModel";

interface UserDetailsProps {
  user: User;
  onClose: () => void;
}

export default function UserDetails({ user, onClose }: UserDetailsProps) {
  return (
    <DetailsModal
      title="جزئیات کاربر"
      onHide={onClose}
      items={[
        { label: "نام و نام خانوادگی", value: user.customer },
        { label: "نام کاربری", value: user.userName },
        { label: "رمز عبور", value: user.password },
      ]}
    />
  );
}
