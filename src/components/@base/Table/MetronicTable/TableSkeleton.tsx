export default function TableSkeleton() {
  return (
    <div role="status" aria-label="در حال بارگذاری" className="divide-y divide-border/60 px-5 motion-safe:animate-pulse">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="flex items-center gap-5 py-5">
          <div className="size-9 shrink-0 rounded-lg bg-primary/10" />
          <div className="h-3 w-1/4 rounded-full bg-muted" />
          <div className="h-3 w-1/5 rounded-full bg-muted" />
          <div className="ms-auto flex gap-2">
            <div className="size-7 rounded-lg bg-muted" />
            <div className="size-7 rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
