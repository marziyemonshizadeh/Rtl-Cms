import { useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, Inbox, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorBox from "@/components/errorBox/errorBox";
import type { PaginationParams } from "@/hooks/usePaginationParams";
import { cn } from "@/lib/utils";
import TableSkeleton from "./TableSkeleton";
import { getAutoSizedColumns, isActionColumnId, withColumnSizing, type MetronicColumn } from "./columnSizing";

export type { MetronicColumn } from "./columnSizing";

interface MetronicTableProps<T> {
  data: T[];
  columns: MetronicColumn<T>[];
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
    isAutoColumnSize?: boolean;
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
  const tableAreaRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
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
    const visibleColumns = columns.filter((column) => !column.hidden);
    const allColumns: MetronicColumn<T>[] = options.haveIndex ? [
      { id: "_rowIndex", header: "ردیف", size: 60, enableSorting: false },
      ...visibleColumns,
    ] : visibleColumns;
    return allColumns.map(withColumnSizing);
  }, [columns, options.haveIndex]);

  const autoSizeEnabled = !!options.isAutoColumnSize;
  useLayoutEffect(() => {
    const element = tableAreaRef.current;
    if (!autoSizeEnabled || !element) {
      setAvailableWidth(0);
      return;
    }
    const measure = () => setAvailableWidth(element.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [autoSizeEnabled, isLoading, error, filteredData.length]);

  const sizedColumns = useMemo(() =>
    autoSizeEnabled && availableWidth
      ? getAutoSizedColumns(processedColumns, availableWidth) ?? processedColumns
      : processedColumns,
  [autoSizeEnabled, availableWidth, processedColumns]);

  const table = useReactTable({
    data: filteredData,
    columns: sizedColumns,
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
    <section aria-labelledby={`${id}-title`} aria-busy={isLoading} className="metronic-table">
      <header className="metronic-toolbar">
        <h2 id={`${id}-title`} className="text-sm font-semibold text-foreground">{options.title}</h2>
        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          {options.haveFilter && (
            <div className="metronic-search">
              <Search aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input aria-label={`جستجو در ${options.title}`} value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="جستجو در جدول..." className="metronic-search-input" />
              {search ? (
                <button type="button" aria-label="پاک کردن جستجو" onClick={() => updateSearch("")} className="metronic-clear-search">
                  <X className="size-4 text-muted-foreground" />
                </button>
              ) : null}
            </div>
          )}
          {addNewItemBtn}
        </div>
      </header>
      {isLoading ? <TableSkeleton /> : error ? (
        <div role="alert" className="space-y-3 p-4">
          <ErrorBox message={error} />
          <Button type="button" variant="outline" disabled={retryDisabled} onClick={onRetry}>تلاش دوباره</Button>
        </div>
      ) : !rows.length ? (
        <div role="status" className="metronic-empty">
          <span className="metronic-empty-icon"><Inbox aria-hidden="true" className="size-6" /></span>
          <p className="text-sm font-medium text-foreground">{search ? "نتیجه‌ای برای جستجوی شما یافت نشد" : emptyMessage}</p>
          {search && <Button type="button" variant="ghost" size="sm" onClick={() => updateSearch("")}>پاک کردن جستجو</Button>}
        </div>
      ) : (
        <>
          <div ref={tableAreaRef} className="metronic-scroll hidden sm:block" dir="rtl">
            <table aria-labelledby={`${id}-title`} className="metronic-grid" style={{ width: table.getTotalSize(), minWidth: table.getTotalSize() }}>
              <colgroup>
                {table.getVisibleLeafColumns().map((column) => <col key={column.id} style={{ width: column.getSize() }} />)}
              </colgroup>
              <thead className={cn("metronic-head", options.haveStickyHeader && "sticky top-0 z-10")}>
                {table.getHeaderGroups().map((group) => (
                  <tr key={group.id}>
                    {group.headers.map((header) => {
                      const definition = header.column.columnDef as MetronicColumn<T>;
                      const sorted = header.column.getIsSorted();
                      const isAction = isActionColumnId(header.column.id);
                      const width = header.getSize();
                      const numeric = !isAction && typeof table.getPreSortedRowModel().flatRows[0]?.getValue(header.column.id) === "number";
                      return (
                        <th key={header.id} scope="col" colSpan={header.colSpan} aria-sort={definition.sorted ? sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none" : undefined} style={{ width, minWidth: width, maxWidth: width }} className={cn("metronic-th", isAction && "metronic-action-cell", header.column.id === "_rowIndex" && "metronic-row-number")} data-numeric={numeric}>
                          {isAction ? "عملیات" : definition.sorted ? (
                            <button type="button" className="metronic-sort" data-active={!!sorted} onClick={() => sorted === "asc" ? header.column.toggleSorting(true) : sorted === "desc" ? header.column.clearSorting() : header.column.toggleSorting(false)}>
                              <span className="min-w-0 whitespace-normal break-words">{flexRender(definition.header, header.getContext())}</span>
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
                  <tr key={row.id} className="metronic-row">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} style={{ width: cell.column.getSize(), minWidth: cell.column.getSize(), maxWidth: cell.column.getSize() }} className={cn("metronic-cell", cell.column.id === "_rowIndex" && "metronic-row-number", isActionColumnId(cell.column.id) && "metronic-action-cell")} data-numeric={!isActionColumnId(cell.column.id) && typeof cell.getValue() === "number"}>
                        <div className="metronic-cell-content" title={typeof cell.getValue() === "string" ? String(cell.getValue()) : undefined}>
                          {cell.column.id === "_rowIndex" ? (startIndex + index + 1).toLocaleString("fa-IR") : flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="metronic-cards sm:hidden" dir="rtl">
            {rows.map((row, index) => {
              const cells = row.getVisibleCells();
              const actions = cells.filter((cell) => isActionColumnId(cell.column.id));
              return (
                <article key={row.id} className="metronic-card">
                  {options.haveIndex && <div className="metronic-card-index">ردیف {(startIndex + index + 1).toLocaleString("fa-IR")}</div>}
                  <dl>
                    {cells.filter((cell) => cell.column.id !== "_rowIndex" && !isActionColumnId(cell.column.id)).map((cell) => (
                      <div key={cell.id} className="metronic-card-field">
                        <dt className="max-w-[45%] shrink-0 text-xs font-medium text-muted-foreground">{typeof cell.column.columnDef.header === "string" ? cell.column.columnDef.header : cell.column.id}</dt>
                        <dd className="min-w-0 break-words text-left text-sm font-medium [overflow-wrap:anywhere]">{flexRender(cell.column.columnDef.cell, cell.getContext())}</dd>
                      </div>
                    ))}
                  </dl>
                  {actions.length > 0 && (
                    <div className="metronic-card-actions">
                      <span className="text-xs font-medium text-muted-foreground">عملیات</span>
                      <div className="flex flex-wrap items-center gap-2">{actions.map((cell) => <div key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>)}</div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </>
      )}
      {options.havePagination && !error && !isLoading && (
        <footer className="metronic-footer" dir="rtl">
          <label className="flex items-center gap-2.5">نمایش
            <span className="relative">
              <select aria-label="تعداد در هر صفحه" value={pagination.pageSize} onChange={(event) => table.setPageSize(Number(event.target.value))} className="metronic-page-size">
                {[5, 10, 20, 50].map((size) => <option key={size} value={size}>{size.toLocaleString("fa-IR")}</option>)}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute end-2 top-1/2 size-3 -translate-y-1/2" />
            </span>
            در هر صفحه
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <span aria-live="polite">{filteredData.length ? `${(startIndex + 1).toLocaleString("fa-IR")}–${Math.min(startIndex + pagination.pageSize, filteredData.length).toLocaleString("fa-IR")}` : "۰"} از {(search ? filteredData.length : options.totalCount).toLocaleString("fa-IR")}</span>
            <nav aria-label="صفحه‌بندی جدول" className="metronic-pagination">
              <Button type="button" variant="ghost" size="icon" className="metronic-page-button" aria-label="صفحه قبل" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}><ChevronRight /></Button>
              {pageNumbers.map((page, index) => (
                <span key={page} className="inline-flex items-center">
                  {index > 0 && page - pageNumbers[index - 1] > 1 && <span className="px-2">…</span>}
                  <Button type="button" variant="ghost" size="icon" className="metronic-page-button" aria-current={page === pageIndex ? "page" : undefined} aria-label={`صفحه ${page.toLocaleString("fa-IR")}`} onClick={() => table.setPageIndex(page - 1)}>{page.toLocaleString("fa-IR")}</Button>
                </span>
              ))}
              <Button type="button" variant="ghost" size="icon" className="metronic-page-button" aria-label="صفحه بعد" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}><ChevronLeft /></Button>
            </nav>
          </div>
        </footer>
      )}
    </section>
  );
}
