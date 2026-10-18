import type { ReactElement } from "react";
import MetronicTable, { type MetronicColumn } from "@/components/@base/Table/MetronicTable/MetronicTable";
import TableRowActions, { type TableRowAction } from "@/components/@base/TableRowActions";
import type usePaginationParams from "@/hooks/usePaginationParams";
import type User from "./AddUser/Models/UserModel";

interface UsersListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: ReturnType<typeof usePaginationParams>["pagination"];
  setPagination: ReturnType<typeof usePaginationParams>["setPagination"];
  isPending: (user: User) => boolean;
  onDetails: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onRetry: () => void;
  retryDisabled: boolean;
}

export default function UsersList({
  users, loading, error, pagination, setPagination, isPending, onDetails, onEdit, onDelete, onRetry, retryDisabled,
}: UsersListProps) {
  const actions: TableRowAction<User>[] = [
    { id: "details_edit", action: "edit", label: "ویرایش", props: (user) => ({ onClick: () => onEdit(user), disabled: isPending(user) }) },
    { id: "details_view", action: "view", label: "جزئیات", props: (user) => ({ onClick: () => onDetails(user), disabled: isPending(user) }) },
    { id: "details_delete", action: "delete", label: "حذف", props: (user) => ({ onClick: () => onDelete(user), disabled: isPending(user) }) },
  ];
  const columns: (MetronicColumn<User> | ReactElement)[] = [
    { id: "customer", accessorFn: (user) => user.customer, header: "نام و نام خانوادگی", cell: (info) => String(info.getValue()), sorted: true, size: 190 },
    { id: "userName", accessorFn: (user) => user.userName, header: "نام کاربری", cell: (info) => String(info.getValue()), sorted: true, size: 140 },
    { id: "password", accessorFn: (user) => user.password, header: "رمز عبور", cell: (info) => String(info.getValue()), sorted: true, size: 130 },
    { id: "phoneNumber", accessorFn: (user) => user.phoneNumber, header: "شماره تماس", cell: (info) => <span dir="ltr">{String(info.getValue())}</span>, sorted: true, size: 150 },
    { id: "email", accessorFn: (user) => user.email, header: "ایمیل", cell: (info) => <span dir="ltr">{String(info.getValue())}</span>, sorted: true, size: 220 },
    <TableRowActions key="details_actions" actions={actions} haveSeparateColumns defaultColumnSize={40} />,
  ];

  return (
    <MetronicTable
      data={users}
      columns={columns}
      isLoading={loading}
      pagination={pagination}
      setPagination={setPagination}
      options={{ title: "لیست کاربران", totalCount: users.length, haveFilter: true, havePagination: true, haveStickyHeader: true, haveIndex: true }}
      error={error}
      onRetry={onRetry}
      retryDisabled={retryDisabled}
      emptyMessage="هیچ کاربری یافت نشد"
    />
  );
}
