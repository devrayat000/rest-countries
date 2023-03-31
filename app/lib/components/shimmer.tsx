export default function CountrySkeleton() {
  return (
    <div className="shadow-md hover:shadow-lg rounded-md bg-slate-50 dark:bg-slate-800 overflow-hidden">
      <div className="animate-pulse">
        <div className="h-52 bg-slate-200 dark:bg-slate-700" />

        <div className="p-6 pb-8">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="mt-4">
            <div className="h-3 mt-1 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="h-3 mt-1 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="h-3 mt-1 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonLoader({ count = 12 }: { count?: number }) {
  return (
    <>
      {Array.from(new Array(count).keys()).map((key) => (
        <CountrySkeleton key={key} />
      ))}
    </>
  );
}
