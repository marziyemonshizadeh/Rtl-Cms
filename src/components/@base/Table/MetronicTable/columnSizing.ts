import type { ColumnDef } from "@tanstack/react-table";

export type MetronicColumn<T> = ColumnDef<T, unknown> & { sorted?: boolean; hidden?: boolean };
type SizedColumn<T> = MetronicColumn<T> & { size: number; minSize: number; maxSize: number };

export function isActionColumnId(id?: string) {
  const value = id?.toLowerCase();
  return !!value && (value.includes("details_") || ["delete", "view", "edit", "confirm", "actions"].includes(value));
}

function isFixedColumn<T>(column: MetronicColumn<T>) {
  return column.id === "_rowIndex" || column.id === "select" || isActionColumnId(column.id);
}

export function withColumnSizing<T>(column: MetronicColumn<T>): SizedColumn<T> {
  const fixed = isFixedColumn(column);
  const size = column.size ?? (fixed ? 80 : 250);
  return {
    ...column,
    ...(isActionColumnId(column.id) ? { header: "عملیات", sorted: false, enableSorting: false } : {}),
    size,
    minSize: column.minSize ?? (fixed ? size : Math.min(size, 140)),
    maxSize: column.maxSize ?? size,
  };
}

export function getAutoSizedColumns<T>(columns: SizedColumn<T>[], containerWidth: number) {
  const flexible = columns.filter((column) => !isFixedColumn(column));
  if (!flexible.length) return null;

  const fixedWidth = columns.filter(isFixedColumn).reduce((total, column) => total + column.size, 0);
  const available = containerWidth - fixedWidth - 2;
  const minimumWidth = flexible.reduce((total, column) => total + column.minSize, 0);
  if (available < minimumWidth) return null;

  const totalWeight = flexible.reduce((total, column) => total + column.size, 0);
  const scale = available / totalWeight;
  const hitsMinimum = flexible.some((column) => column.size * scale < column.minSize);
  const surplus = available - minimumWidth;
  const widths = new Map<SizedColumn<T>, number>();
  let assigned = 0;

  flexible.forEach((column) => {
    const width = Math.floor(hitsMinimum ? column.minSize + surplus * column.size / totalWeight : column.size * scale);
    widths.set(column, width);
    assigned += width;
  });

  const widest = flexible.reduce((first, second) => first.size >= second.size ? first : second);
  widths.set(widest, widths.get(widest)! + available - assigned);

  return columns.map((column) => {
    const width = widths.get(column);
    return width === undefined ? column : { ...column, size: width, minSize: width, maxSize: width };
  });
}
