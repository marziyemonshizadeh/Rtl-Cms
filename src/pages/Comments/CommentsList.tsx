import type { ReactElement } from "react";
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
  const isPending = (comment: Comment) => loading || !!mutations[comment.id]?.pending;
  const actions: TableRowAction<Comment>[] = [
    {
      id: "details_view",
      action: "view",
      label: "دیدن کامنت",
      props: (comment) => ({
        onClick: () => onView(comment),
        disabled: isPending(comment) || comment.confirmation,
      }),
    },
    {
      id: "details_delete",
      action: "delete",
      label: "حذف",
      props: (comment) => ({
        onClick: () => onDelete(comment),
        disabled: isPending(comment) || comment.confirmation,
      }),
    },
    {
      id: "details_confirm",
      action: "confirm",
      label: (comment) => comment.confirmation ? "کنسل" : "تایید",
      props: (comment) => ({
        onClick: () => onToggleConfirmation(comment),
        disabled: isPending(comment),
      }),
    },
  ];
  const columns: (MetronicColumn<Comment> | ReactElement)[] = [
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
    <TableRowActions key="details_actions" actions={actions} haveSeparateColumns defaultColumnSize={40} />,
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
        haveIndex: true,
      }}
      error={error}
      onRetry={onRetry}
      retryDisabled={retryDisabled}
      emptyMessage="هیچ کامنتی یافت نشد"
    />
  );
}
