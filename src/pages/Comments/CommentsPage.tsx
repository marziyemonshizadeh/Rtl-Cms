import { useEffect, useState } from "react";
import DeleteModal from "@/components/Modals/deleteModal";
import usePaginationParams from "@/hooks/usePaginationParams";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CommentDetails from "./CommentDetails";
import CommentsList from "./CommentsList";
import type Comment from "./models/comment";
import { fetchComment, removeComment, setCommentConfirmation } from "./store/commentsSlice";

export default function CommentsPage() {
  const dispatch = useAppDispatch();
  const { comments, loading, error, mutations } = useAppSelector((state) => state.comments);
  const { pagination, setPagination } = usePaginationParams();
  const [deleteComment, setDeleteComment] = useState<Comment | null>(null);
  const [viewComment, setViewComment] = useState<Comment | null>(null);
  const deleteMutation = deleteComment ? mutations[deleteComment.id] : undefined;
  const hasPendingMutation = Object.values(mutations).some((mutation) => mutation.pending);

  useEffect(() => {
    void dispatch(fetchComment());
  }, [dispatch]);

  const submitDelete = async () => {
    if (!deleteComment) return;
    try {
      await dispatch(removeComment(deleteComment.id)).unwrap();
      setDeleteComment(null);
    } catch {
      return;
    }
  };

  const toggleConfirmation = (comment: Comment) => {
    void dispatch(setCommentConfirmation({ id: comment.id, confirmation: !comment.confirmation }));
  };

  return (
    <>
      <h1 className="header">کامنت های محصولات</h1>
      <CommentsList
        comments={comments}
        loading={loading}
        error={error}
        mutations={mutations}
        pagination={pagination}
        setPagination={setPagination}
        onRetry={() => void dispatch(fetchComment())}
        retryDisabled={hasPendingMutation}
        onView={setViewComment}
        onDelete={setDeleteComment}
        onToggleConfirmation={toggleConfirmation}
      />
      {deleteComment && (
        <DeleteModal
          pending={!!deleteMutation?.pending}
          error={deleteMutation?.error}
          submitAction={submitDelete}
          cancelAction={() => setDeleteComment(null)}
        />
      )}
      {viewComment && (
        <CommentDetails comment={viewComment} onClose={() => setViewComment(null)} />
      )}
    </>
  );
}
