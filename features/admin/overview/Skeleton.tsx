import { Skeleton } from "@/components/ui/skeleton";

export const AdminOverviewSkeleton = () => {
  return (
    <div className="space-y-10">

      {/* DASHBOARD OVERVIEW */}
      <section>
        <div className="space-y-2">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4"
            >
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </section>

      {/* SUBMISSIONS */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6">

        {/* header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>

          <Skeleton className="h-16 w-44 rounded-2xl" />
        </div>

        {/* chips */}
        <div className="mb-6 flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-7 w-28 rounded-full" />
          ))}
        </div>

        {/* status grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-3"
            >
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-10" />
            </div>
          ))}
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6">

        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-3"
            >
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-10" />
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section>
        <div className="space-y-2">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 bg-white p-5"
            >
              <div className="flex justify-between gap-4">

                <div className="space-y-3 flex-1">
                  <Skeleton className="h-5 w-64" />

                  <div className="flex flex-wrap gap-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>

                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}