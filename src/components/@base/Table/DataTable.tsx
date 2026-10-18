import { useId, type Key, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import ErrorBox from "@/components/errorBox/errorBox";

export interface DataTableColumn<T> {
  id: string;
  header: string;
  render: (record: T) => ReactNode;
}

interface DataTableProps<T> {
  title: string;
  toolbar: ReactNode;
  records: readonly T[];
  columns: readonly DataTableColumn<T>[];
  getRowId: (record: T) => Key;
  renderActions: (record: T) => ReactNode;
  loading: boolean;
  error: string | null;
  emptyMessage: string;
  onRetry: () => void;
  retryDisabled: boolean;
}

export default function DataTable<T>({
  title,
  toolbar,
  records,
  columns,
  getRowId,
  renderActions,
  loading,
  error,
  emptyMessage,
  onRetry,
  retryDisabled,
}: DataTableProps<T>) {
  const id = useId();

  return (
    <section aria-labelledby={`${id}-title`} className="my-6 min-w-0 rounded-lg border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4 sm:px-6">
        <h2 id={`${id}-title`} className="text-lg font-semibold">{title}</h2>
        {toolbar}
      </div>
      <div aria-busy={loading}>
        {loading ? (
          <p role="status" className="p-6 text-center text-muted-foreground">در حال بارگذاری...</p>
        ) : error ? (
          <div className="space-y-3 p-4" role="alert">
            <ErrorBox message={error} />
            <Button type="button" variant="outline" disabled={retryDisabled} onClick={onRetry}>
              تلاش دوباره
            </Button>
          </div>
        ) : records.length === 0 ? (
          <p role="status" className="p-6 text-center text-muted-foreground">{emptyMessage}</p>
        ) : (
          <table role="table" aria-labelledby={`${id}-title`} className="block w-full md:table md:table-fixed">
            <thead role="rowgroup" className="sr-only md:not-sr-only md:table-header-group">
              <tr role="row" className="border-b bg-muted/40">
                {columns.map((column) => (
                  <th key={column.id} id={`${id}-${column.id}`} scope="col" role="columnheader" className="table-header-cell">
                    {column.header}
                  </th>
                ))}
                <th id={`${id}-actions`} scope="col" role="columnheader" className="table-header-cell">عملیات</th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="grid gap-4 p-4 md:table-row-group md:p-0">
              {records.map((record) => (
                <tr key={getRowId(record)} role="row" className="block rounded-lg border p-4 transition-colors hover:bg-muted/40 md:table-row md:rounded-none md:border-x-0 md:border-t-0 md:p-0 md:last:border-b-0">
                  {columns.map((column) => (
                    <td key={column.id} headers={`${id}-${column.id}`} role="cell" className="flex items-start justify-between gap-3 border-b py-3 text-[13px] first:pt-0 md:table-cell md:border-0 md:px-4 md:py-4 md:text-center md:align-middle md:first:pt-4">
                      <span aria-hidden="true" className="shrink-0 text-xs font-medium text-muted-foreground md:hidden">{column.header}</span>
                      <div className="min-w-0 break-words text-end text-foreground md:text-center">{column.render(record)}</div>
                    </td>
                  ))}
                  <td headers={`${id}-actions`} role="cell" className="block pt-3 md:table-cell md:px-4 md:py-4 md:align-middle">
                    {renderActions(record)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
