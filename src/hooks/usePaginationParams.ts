import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export interface PaginationParams {
  pageIndex: number;
  pageSize: number;
}

export default function usePaginationParams() {
  const [params, setParams] = useSearchParams();
  const requestedPage = Number(params.get("pageIndex") ?? 1);
  const requestedSize = Number(params.get("pageSize") ?? 10);
  const pagination: PaginationParams = {
    pageIndex: Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
    pageSize: [5, 10, 20, 50].includes(requestedSize) ? requestedSize : 10,
  };
  const setPagination = useCallback((next: PaginationParams) => {
    setParams((previous) => {
      const result = new URLSearchParams(previous);
      result.set("pageIndex", String(next.pageIndex));
      result.set("pageSize", String(next.pageSize));
      return result;
    }, { replace: true });
  }, [setParams]);

  return { pagination, setPagination };
}
