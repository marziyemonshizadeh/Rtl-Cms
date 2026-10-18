import { useEffect, useState } from "react";
import DeleteModal from "@/components/Modals/deleteModal";
import EditModal from "@/components/Modals/editModal";
import usePaginationParams from "@/hooks/usePaginationParams";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AddUser from "./AddUser/AddUser";
import UserDetails from "./UserDetails";
import UsersList from "./UsersList";
import { clearUserMutationError, fetchUser, removeUser, updateUser } from "./store/usersSlice";

type UserDialog = { type: "details" | "edit" | "delete"; id: number } | null;

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.users);
  const { pagination, setPagination } = usePaginationParams();
  const [dialog, setDialog] = useState<UserDialog>(null);
  const selectedUser = data.users.find((user) => user.id === dialog?.id);
  const selectedMutation = dialog ? data.mutations[dialog.id] : undefined;

  useEffect(() => {
    void dispatch(fetchUser());
  }, [dispatch]);

  const openDialog = (type: NonNullable<UserDialog>["type"], id: number) => {
    dispatch(clearUserMutationError(id));
    setDialog({ type, id });
  };
  const closeDialog = () => {
    if (!selectedMutation?.pending) setDialog(null);
  };

  return (
    <>
      <h1 className="header">لیست کاربران</h1>
      <UsersList
        users={data.users}
        loading={data.loading}
        error={data.error}
        pagination={pagination}
        setPagination={setPagination}
        isPending={(user) => !!data.mutations[user.id]?.pending}
        onDetails={(user) => openDialog("details", user.id)}
        onEdit={(user) => openDialog("edit", user.id)}
        onDelete={(user) => openDialog("delete", user.id)}
        onRetry={() => void dispatch(fetchUser())}
        retryDisabled={Object.values(data.mutations).some((mutation) => mutation.pending)}
      />
      {dialog?.type === "details" && selectedUser && (
        <UserDetails user={selectedUser} onClose={closeDialog} />
      )}
      {dialog?.type === "edit" && selectedUser && (
        <EditModal pending={!!selectedMutation?.pending} onClose={closeDialog}>
          <AddUser
            key={selectedUser.id}
            defaultValues={selectedUser}
            pending={!!selectedMutation?.pending}
            error={selectedMutation?.error}
            onCancel={closeDialog}
            onSubmit={async (values) => {
              await dispatch(updateUser({ id: selectedUser.id, changes: values })).unwrap();
              setDialog(null);
            }}
          />
        </EditModal>
      )}
      {dialog?.type === "delete" && selectedUser && (
        <DeleteModal
          pending={!!selectedMutation?.pending}
          error={selectedMutation?.error}
          cancelAction={closeDialog}
          submitAction={async () => {
            try {
              await dispatch(removeUser(selectedUser.id)).unwrap();
              setDialog(null);
            } catch {
              return;
            }
          }}
        />
      )}
    </>
  );
}
