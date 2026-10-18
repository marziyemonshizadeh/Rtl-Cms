import { isValidElement, useId, useMemo, useState, type ReactElement, type ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronsUpDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorBox from "@/components/errorBox/errorBox";
import TableRowActions, { type TableRowActionsProps } from "@/components/@base/TableRowActions";
import type { PaginationParams } from "@/hooks/usePaginationParams";
import { cn } from "@/lib/utils";
import TableSkeleton from "./TableSkeleton";

export type MetronicColumn<T> = ColumnDef<T, unknown> & { sorted?: boolean; hidden?: boolean };

interface MetronicTableProps<T> {
  data: T[];
  columns: (MetronicColumn<T> | ReactElement<TableRowActionsProps<T>>)[];
  pagination: PaginationParams;
  setPagination: (pagination: PaginationParams) => void;
  isLoading: boolean;
  addNewItemBtn?: ReactNode;
  options: {
    title: string;
    totalCount: number;
    haveFilter: boolean;
    havePagination: boolean;
    haveStickyHeader: boolean;
    haveIndex: boolean;
  };
  error: string | null;
  onRetry: () => void;
  retryDisabled: boolean;
  emptyMessage: string;
}

export default function MetronicTable<T extends { id: number | string }>({
  data,
  columns,
  pagination,
  setPagination,
  isLoading,
  addNewItemBtn,
  options,
  error,
  onRetry,
  retryDisabled,
  emptyMessage,
}: MetronicTableProps<T>) {
  const id = useId();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("searchKey") ?? "";
  const filteredData = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fa-IR");
    return query ? data.filter((row) => Object.values(row).some((value) =>
      (typeof value === "string" || typeof value === "number") && String(value).toLocaleLowerCase("fa-IR").includes(query),
    )) : data;
  }, [data, search]);
  const pageCount = Math.max(1, Math.ceil(filteredData.length / pagination.pageSize));
  const pageIndex = Math.min(pagination.pageIndex, pageCount);
  const startIndex = (pageIndex - 1) * pagination.pageSize;

  const processedColumns = useMemo(() => {
    const expanded = columns.flatMap((column): MetronicColumn<T>[] => {
      if (!isValidElement<TableRowActionsProps<T>>(column)) return column.hidden ? [] : [column];
      const { actions, haveSeparateColumns, defaultColumnSize = 40 } = column.props;
      if (haveSeparateColumns) {
        return actions.map((action) => ({
          id: action.id,
          header: "",
          size: defaultColumnSize,
          cell: ({ row }) => <TableRowActions actions={[action]} row={row.original} />,
        }));
      }
      return [{
        id: "details_actions",
        header: "عملیات",
        size: 120,
        cell: ({ row }) => <TableRowActions actions={actions} row={row.original} />,
      }];
    });
    return options.haveIndex ? [
      { id: "_rowIndex", header: "ردیف", size: 60, enableSorting: false },
      ...expanded,
    ] : expanded;
  }, [columns, options.haveIndex]);

  const table = useReactTable({
    data: filteredData,
    columns: processedColumns,
    getRowId: (row) => String(row.id),
    state: { sorting, pagination: { pageIndex: pageIndex - 1, pageSize: pagination.pageSize } },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const current = { pageIndex: pageIndex - 1, pageSize: pagination.pageSize };
      const next = typeof updater === "function" ? updater(current) : updater;
      setPagination({ pageIndex: next.pageSize === current.pageSize ? next.pageIndex + 1 : 1, pageSize: next.pageSize });
    },
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: options.havePagination ? getPaginationRowModel() : undefined,
  });
  const rows = table.getRowModel().rows;
  const updateSearch = (value: string) => setSearchParams((previous) => {
    const next = new URLSearchParams(previous);
    if (value) next.set("searchKey", value);
    else next.delete("searchKey");
    next.set("pageIndex", "1");
    return next;
  }, { replace: true });
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1)
    .filter((page) => page <= 2 || page > pageCount - 2 || Math.abs(page - pageIndex) <= 1);

  return (
    <section aria-labelledby={`${id}-title`} aria-busy={isLoading} className="my-4 min-w-0 overflow-hidden rounded-lg border bg-card shadow-sm">
      <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id={`${id}-title`} className="font-semibold">{options.title}</h2>
          {options.haveFilter && (
            <div className="relative w-full sm:w-60">
              <Input aria-label={`جستجو در ${options.title}`} value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="جستجو کنید ..." className="my-0 h-9 w-full pe-9" />
              {search ? (
                <button type="button" aria-label="پاک کردن جستجو" onClick={() => updateSearch("")} className="absolute end-3 top-1/2 -translate-y-1/2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <X className="size-4 text-muted-foreground" />
                </button>
              ) : <Search aria-hidden="true" className="absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />}
            </div>
          )}
        </div>
        {addNewItemBtn}
      </header>
      {isLoading ? <TableSkeleton /> : error ? (
        <div role="alert" className="space-y-3 p-4">
          <ErrorBox message={error} />
          <Button type="button" variant="outline" disabled={retryDisabled} onClick={onRetry}>تلاش دوباره</Button>
        </div>
      ) : !rows.length ? (
        <p role="status" className="my-10 px-4 text-center text-muted-foreground">{search ? "نتیجه‌ای برای جستجوی شما یافت نشد" : emptyMessage}</p>
      ) : (
        <>
          <div className="hidden max-h-[38rem] overflow-auto sm:block" dir="rtl">
            <table aria-labelledby={`${id}-title`} className="w-full border-collapse text-sm" style={{ minWidth: table.getTotalSize() }}>
              <thead className={cn("bg-muted text-muted-foreground", options.haveStickyHeader && "sticky top-0 z-10")}>
                {table.getHeaderGroups().map((group) => (
                  <tr key={group.id}>
                    {group.headers.map((header) => {
                      const definition = header.column.columnDef as MetronicColumn<T>;
                      const sorted = header.column.getIsSorted();
                      return (
                        <th key={header.id} scope="col" aria-sort={definition.sorted ? sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none" : undefined} style={{ width: header.getSize() }} className="border-b border-e px-3 py-3 text-start text-xs font-medium last:border-e-0">
                          {definition.sorted ? (
                            <button type="button" className="flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => sorted === "asc" ? header.column.toggleSorting(true) : sorted === "desc" ? header.column.clearSorting() : header.column.toggleSorting(false)}>
                              {flexRender(definition.header, header.getContext())}
                              {sorted === "asc" ? <ArrowUp className="size-3" /> : sorted === "desc" ? <ArrowDown className="size-3" /> : <ChevronsUpDown className="size-3" />}
                            </button>
                          ) : flexRender(definition.header, header.getContext())}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} className="transition-colors hover:bg-muted/40">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={cn("border-b border-e px-3 py-3 align-middle text-[13px] last:border-e-0", cell.column.id.startsWith("details_") && "px-1 text-center")}>
                        {cell.column.id === "_rowIndex" ? (startIndex + index + 1).toLocaleString("fa-IR") : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 p-3 sm:hidden" dir="rtl">
            {rows.map((row) => {
              const cells = row.getVisibleCells();
              const actions = cells.filter((cell) => cell.column.id.startsWith("details_"));
              return (
                <article key={row.id} className="rounded-lg border px-3 pb-2 transition-colors hover:bg-muted/40">
                  <dl>
                    {cells.filter((cell) => cell.column.id !== "_rowIndex" && !cell.column.id.startsWith("details_")).map((cell) => (
                      <div key={cell.id} className="flex items-start justify-between gap-4 border-b px-2 py-3">
                        <dt className="max-w-[45%] shrink-0 text-xs font-bold text-muted-foreground">{typeof cell.column.columnDef.header === "string" ? cell.column.columnDef.header : cell.column.id}</dt>
                        <dd className="min-w-0 break-words text-left text-sm font-medium [overflow-wrap:anywhere]">{flexRender(cell.column.columnDef.cell, cell.getContext())}</dd>
                      </div>
                    ))}
                  </dl>
                  {actions.length > 0 && (
                    <div className="flex min-h-12 items-center justify-between gap-3 px-2">
                      <span className="text-xs font-bold text-muted-foreground">عملیات</span>
                      <div className="flex flex-wrap items-center gap-3">{actions.map((cell) => <div key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>)}</div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </>
      )}
      {options.havePagination && !error && !isLoading && (
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t px-4 py-4 text-sm text-muted-foreground" dir="rtl">
          <label className="flex items-center gap-2">نمایش
            <select aria-label="تعداد در هر صفحه" value={pagination.pageSize} onChange={(event) => table.setPageSize(Number(event.target.value))} className="rounded border border-input bg-background px-2 py-1 text-foreground">
              {[5, 10, 20, 50].map((size) => <option key={size} value={size}>{size.toLocaleString("fa-IR")}</option>)}
            </select>
            در هر صفحه
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <span aria-live="polite">{filteredData.length ? `${(startIndex + 1).toLocaleString("fa-IR")}–${Math.min(startIndex + pagination.pageSize, filteredData.length).toLocaleString("fa-IR")}` : "۰"} از {(search ? filteredData.length : options.totalCount).toLocaleString("fa-IR")}</span>
            <nav aria-label="صفحه‌بندی جدول" className="flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" className="size-8" aria-label="صفحه قبل" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}><ChevronRight /></Button>
              {pageNumbers.map((page, index) => (
                <span key={page} className="inline-flex items-center">
                  {index > 0 && page - pageNumbers[index - 1] > 1 && <span className="px-2">…</span>}
                  <Button type="button" variant={page === pageIndex ? "outline" : "ghost"} size="icon" className="size-8" aria-current={page === pageIndex ? "page" : undefined} onClick={() => table.setPageIndex(page - 1)}>{page.toLocaleString("fa-IR")}</Button>
                </span>
              ))}
              <Button type="button" variant="ghost" size="icon" className="size-8" aria-label="صفحه بعد" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}><ChevronLeft /></Button>
            </nav>
          </div>
        </footer>
      )}
    </section>
  );
}
