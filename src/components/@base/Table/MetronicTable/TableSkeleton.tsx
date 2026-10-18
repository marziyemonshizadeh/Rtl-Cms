export default function TableSkeleton() {
  return (
    <div role="status" aria-label="در حال بارگذاری" className="flex flex-col gap-2 p-4">
      {Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="mx-2 my-[5.8px] h-5 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
      ))}
    </div>
  );
}
