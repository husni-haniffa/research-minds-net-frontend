import { AlertError } from "@/components/ui/alert-error"
import { useFetchAdminOverview } from "./overview.hooks"
import { AdminOverviewSkeleton } from "./Skeleton"
import AdminOverviewCard from "./Card"

const AdminOverview = () => {
  const { data, isLoading, error } = useFetchAdminOverview()

  if (isLoading) return <AdminOverviewSkeleton />
  if (error instanceof Error) return <AlertError message={error.message} />
  if (!data) return null

  return (
    <div>
      <AdminOverviewCard data={data}/>
    </div>
  )

}

export default AdminOverview