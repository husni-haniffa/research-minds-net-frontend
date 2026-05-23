import { Skeleton } from "@/components/ui/skeleton";

const PlanCardSkeleton = () => {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            {/* Plan name */}
            <Skeleton className="h-4 w-24 rounded-md" />

            {/* Price */}
            <div className="mt-4 flex items-end gap-2">
                <Skeleton className="h-8 w-32 rounded-md" />
            </div>

            {/* Trial days */}
            <Skeleton className="mt-4 h-4 w-28 rounded-md" />

            {/* Features */}
            <div className="mt-6 space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 flex-1 rounded-md" />
                    </div>
                ))}
            </div>

            {/* Button */}
            <div className="mt-12">
                <Skeleton className="h-11 w-full rounded-lg" />
            </div>
        </div>
    );
};

export default PlanCardSkeleton;