import MetronicTable, {
  type MetronicColumn,
} from "@/components/@base/Table/MetronicTable/MetronicTable";
import TableRowActions, { type TableRowAction } from "@/components/@base/TableRowActions";
import { Badge } from "@/components/ui/badge";
import type usePaginationParams from "@/hooks/usePaginationParams";
import type Comment from "./models/comment";

interface CommentsListProps extends Pick<ReturnType<typeof usePaginationParams>, "pagination" | "setPagination"> {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  mutations: Record<string, { pending: boolean; error: string | null }>;
  onRetry: () => void;
  retryDisabled: boolean;
  onView: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
  onToggleConfirmation: (comment: Comment) => void;
}

export default function CommentsList({
  comments,
  loading,
  error,
  mutations,
  pagination,
  setPagination,
  onRetry,
  retryDisabled,
  onView,
  onDelete,
  onToggleConfirmation,
}: CommentsListProps) {
  const isPending = (row: Comment) => loading || !!mutations[row.id]?.pending;
  const actions: TableRowAction<Comment>[] = [
    { id: "details_delete", action: "delete", label: "حذف", props: (row) => ({ onClick: () => onDelete(row), disabled: isPending(row) || row.confirmation }) },
    { id: "details_view", action: "view", label: "دیدن کامنت", props: (row) => ({ onClick: () => onView(row), disabled: isPending(row) || row.confirmation }) },
    { id: "details_confirm", action: "confirm", label: (row) => row.confirmation ? "کنسل" : "تایید", props: (row) => ({ onClick: () => onToggleConfirmation(row), disabled: isPending(row) }) },
  ];
  const columns: MetronicColumn<Comment>[] = [
    { id: "name", accessorFn: (comment) => comment.name, header: "اسم کاربر", sorted: true },
    { id: "product", accessorFn: (comment) => comment.product, header: "محصول", sorted: true },
    { id: "history", accessorFn: (comment) => comment.history, header: "تاریخ", sorted: true },
    { id: "time", accessorFn: (comment) => comment.time, header: "ساعت", sorted: true },
    {
      id: "confirmation",
      accessorFn: (comment) => comment,
      header: "وضعیت",
      cell: (info) => {
        const comment = info.getValue() as Comment;
        return (
          <div className="space-y-2">
            <Badge variant={comment.confirmation ? "approved" : "pending"}>
              {comment.confirmation ? "تایید شده" : "در انتظار"}
            </Badge>
            {mutations[comment.id]?.error && (
              <p role="alert" className="text-destructive">{mutations[comment.id].error}</p>
            )}
          </div>
        );
      },
    },
    {
      id: "details_actions",
      header: "عملیات",
      cell: ({ row }) => <TableRowActions actions={actions} row={row.original} />,
      size: 250,
    },
  ];

  return (
    <MetronicTable
      data={comments}
      columns={columns}
      isLoading={loading}
      pagination={pagination}
      setPagination={setPagination}
      options={{
        title: "کامنت های محصولات",
        totalCount: comments.length,
        haveFilter: true,
        havePagination: true,
        haveStickyHeader: true,
        haveIndex: true, isAutoColumnSize: true,
      }}
      error={error}
      onRetry={onRetry}
      retryDisabled={retryDisabled}
      emptyMessage="هیچ کامنتی یافت نشد"
    />
  );
}
