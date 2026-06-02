import {
  Users,
  Clock,
  Calendar,
  MapPin,
} from "lucide-react"
import { AdminOverviewResponse } from "./overview.types"

interface KpiCardProps {
  title: string
  value: number
  icon: React.ElementType
}

const KpiCard = ({
  title,
  value,
  icon: Icon,
}: KpiCardProps) => (
  <div className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-lg">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          {value.toLocaleString()}
        </h3>
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
        <Icon size={20} className="text-slate-600" />
      </div>
    </div>
  </div>
)

const SectionHeader = ({
  title,
  description,
}: {
  title: string
  description?: string
}) => (
  <div className="mb-5">
    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
      {title}
    </h2>

    {description && (
      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    )}
  </div>
)

const StatusItem = ({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:border-slate-300">
    <div className={`mb-3 h-2 w-12 rounded-full ${color}`} />

    <p className="text-sm text-slate-500">{label}</p>

    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
      {value.toLocaleString()}
    </p>
  </div>
)

const AdminOverviewCard = ({
  data,
}: {
  data: AdminOverviewResponse
}) => {
  const totalSubmissions =
    data.submissions.pending +
    data.submissions.underReview +
    data.submissions.accepted +
    data.submissions.rejected +
    data.submissions.published

  return (
    <div className="space-y-10">

      {/* DASHBOARD OVERVIEW */}
      <section>
        <SectionHeader
          title="Dashboard Overview"
          description="A snapshot of users, submissions, applications and upcoming activity"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <KpiCard
            title="Total Users"
            value={data.users.total}
            icon={Users}
          />

          <KpiCard
            title="New Users (Last 72 Hours)"
            value={data.users.recentlyJoined}
            icon={Clock}
          />
        </div>
      </section>

      {/* SUBMISSIONS */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6">

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Submission Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              A live breakdown of submission statuses across all stages
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 px-5 py-3 text-white">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-300">
              Total Submissions
            </p>
            <p className="text-2xl font-bold">
              {totalSubmissions.toLocaleString()}
            </p>
          </div>
        </div>

        {/* STATUS CHIPS (replaces progress bar) */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
            Pending · {data.submissions.pending}
          </div>

          <div className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
            Review · {data.submissions.underReview}
          </div>

          <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
            Accepted · {data.submissions.accepted}
          </div>

          <div className="rounded-full bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700">
            Rejected · {data.submissions.rejected}
          </div>

          <div className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
            Published · {data.submissions.published}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatusItem label="Pending" value={data.submissions.pending} color="bg-amber-500" />
          <StatusItem label="Under Review" value={data.submissions.underReview} color="bg-indigo-500" />
          <StatusItem label="Accepted" value={data.submissions.accepted} color="bg-emerald-500" />
          <StatusItem label="Rejected" value={data.submissions.rejected} color="bg-rose-500" />
          <StatusItem label="Published" value={data.submissions.published} color="bg-slate-500" />
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <SectionHeader
          title="Research Applications"
          description="Submitted applications across all research areas"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatusItem label="Idea" value={data.applications.idea} color="bg-indigo-500" />
          <StatusItem label="Help" value={data.applications.help} color="bg-indigo-500" />
          <StatusItem label="Funding" value={data.applications.funding} color="bg-indigo-500" />
          <StatusItem label="Student" value={data.applications.student} color="bg-indigo-500" />
          <StatusItem label="Supervisor" value={data.applications.supervisor} color="bg-indigo-500" />
          <StatusItem label="Placement" value={data.applications.placement} color="bg-indigo-500" />
        </div>
      </section>

      {/* EVENTS */}
      <section>
        <SectionHeader
          title="Upcoming Events"
          description="Stay ahead with events scheduled over the coming 14 days"
        />

        {(data.upcomingEvents?.length ?? 0) === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
            <Calendar size={32} className="mx-auto mb-4 text-slate-400" />
            <p className="text-sm font-medium text-slate-500">
              No upcoming events scheduled
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {event.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>

                      <span>{event.eventTime}</span>

                      <span className="flex items-center gap-2">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
                    Upcoming
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}

export default AdminOverviewCard