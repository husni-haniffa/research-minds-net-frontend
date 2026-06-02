import {
  Users,
  Clock,
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  BookOpen,
  Lightbulb,
  HelpCircle,
  DollarSign,
  GraduationCap,
  UserCheck,
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
} from "lucide-react"
import { AdminOverviewResponse } from "./overview.types"

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: number
  colorClass: {
    bg: string
    iconBg: string
    iconText: string
    valuText: string
    border: string
  }
}

const StatCard = ({ icon: Icon, label, value, colorClass }: StatCardProps) => (
  <div
    className={`
      relative flex flex-col gap-3 rounded-2xl border p-5
      transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
      ${colorClass.bg} ${colorClass.border}
    `}
  >
    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClass.iconBg}`}>
      <Icon size={20} className={colorClass.iconText} />
    </div>
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </p>
      <p className={`mt-1 text-3xl font-bold tabular-nums tracking-tight ${colorClass.valuText}`}>
        {value.toLocaleString()}
      </p>
    </div>
  </div>
)

// ─── Section ─────────────────────────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="h-4 w-1 rounded-full bg-indigo-500" />
      <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">{title}</h2>
    </div>
    {children}
  </div>
)

// ─── Colors ──────────────────────────────────────────────────────────────────

const colors = {
  blue: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-600",
    iconText: "text-white",
    valuText: "text-blue-700",
    border: "border-blue-100",
  },
  violet: {
    bg: "bg-violet-50",
    iconBg: "bg-violet-600",
    iconText: "text-white",
    valuText: "text-violet-700",
    border: "border-violet-100",
  },
  amber: {
    bg: "bg-amber-50",
    iconBg: "bg-amber-500",
    iconText: "text-white",
    valuText: "text-amber-700",
    border: "border-amber-100",
  },
  cyan: {
    bg: "bg-cyan-50",
    iconBg: "bg-cyan-600",
    iconText: "text-white",
    valuText: "text-cyan-700",
    border: "border-cyan-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-600",
    iconText: "text-white",
    valuText: "text-emerald-700",
    border: "border-emerald-100",
  },
  red: {
    bg: "bg-red-50",
    iconBg: "bg-red-500",
    iconText: "text-white",
    valuText: "text-red-600",
    border: "border-red-100",
  },
  indigo: {
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-600",
    iconText: "text-white",
    valuText: "text-indigo-700",
    border: "border-indigo-100",
  },
  yellow: {
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-500",
    iconText: "text-white",
    valuText: "text-yellow-700",
    border: "border-yellow-100",
  },
  pink: {
    bg: "bg-pink-50",
    iconBg: "bg-pink-600",
    iconText: "text-white",
    valuText: "text-pink-700",
    border: "border-pink-100",
  },
  teal: {
    bg: "bg-teal-50",
    iconBg: "bg-teal-600",
    iconText: "text-white",
    valuText: "text-teal-700",
    border: "border-teal-100",
  },
}

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminOverviewCard = ({ data }: { data: AdminOverviewResponse }) => {
  const totalSubmissions =
    data.submissions.pending +
    data.submissions.underReview +
    data.submissions.accepted +
    data.submissions.rejected +
    data.submissions.published

  return (
    <div className="space-y-10 py-2">

      {/* ── Users ── */}
      <Section title="Users">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            icon={Users}
            label="Total Users"
            value={data.users.total}
            colorClass={colors.blue}
          />
          <StatCard
            icon={Clock}
            label="Joined in Last 72 Hours"
            value={data.users.recentlyJoined}
            colorClass={colors.violet}
          />
        </div>
      </Section>

      {/* ── Submissions ── */}
      <Section title="Submissions">
        {/* Summary bar */}
        <div className="mb-1 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            <span className="font-semibold text-gray-700">{totalSubmissions.toLocaleString()}</span> total submissions
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <TrendingUp size={12} />
            Live data
          </div>
        </div>

        {/* Progress bar */}
        {totalSubmissions > 0 && (
          <div className="mb-4 flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="bg-amber-400 transition-all"
              style={{ width: `${(data.submissions.pending / totalSubmissions) * 100}%` }}
            />
            <div
              className="bg-cyan-500 transition-all"
              style={{ width: `${(data.submissions.underReview / totalSubmissions) * 100}%` }}
            />
            <div
              className="bg-emerald-500 transition-all"
              style={{ width: `${(data.submissions.accepted / totalSubmissions) * 100}%` }}
            />
            <div
              className="bg-red-400 transition-all"
              style={{ width: `${(data.submissions.rejected / totalSubmissions) * 100}%` }}
            />
            <div
              className="bg-indigo-500 transition-all"
              style={{ width: `${(data.submissions.published / totalSubmissions) * 100}%` }}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard icon={Eye} label="Pending" value={data.submissions.pending} colorClass={colors.amber} />
          <StatCard icon={FileText} label="Under Review" value={data.submissions.underReview} colorClass={colors.cyan} />
          <StatCard icon={CheckCircle} label="Accepted" value={data.submissions.accepted} colorClass={colors.emerald} />
          <StatCard icon={XCircle} label="Rejected" value={data.submissions.rejected} colorClass={colors.red} />
          <StatCard icon={BookOpen} label="Published" value={data.submissions.published} colorClass={colors.indigo} />
        </div>
      </Section>

      {/* ── Research Applications ── */}
      <Section title="Conduct Research Applications">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard icon={Lightbulb} label="Idea" value={data.applications.idea} colorClass={colors.yellow} />
          <StatCard icon={HelpCircle} label="Help" value={data.applications.help} colorClass={colors.cyan} />
          <StatCard icon={DollarSign} label="Funding" value={data.applications.funding} colorClass={colors.emerald} />
          <StatCard icon={GraduationCap} label="Student" value={data.applications.student} colorClass={colors.violet} />
          <StatCard icon={UserCheck} label="Supervisor" value={data.applications.supervisor} colorClass={colors.blue} />
          <StatCard icon={Briefcase} label="Placement" value={data.applications.placement} colorClass={colors.pink} />
        </div>
      </Section>

      {/* ── Upcoming Events ── */}
      <Section title="Upcoming Events — Next 14 Days">
        {(data.upcomingEvents?.upcomingEvents?.length ?? 0) === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-14">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Calendar size={22} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-400">No upcoming events scheduled</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {(data.upcomingEvents?.upcomingEvents ?? []).map((event) => (
              <div
                key={event._id}
                className="group flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
                  <Calendar size={19} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                    {event.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                      <Clock size={11} className="text-indigo-400" />
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      · {event.eventTime}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                      <MapPin size={11} className="text-indigo-400" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  Upcoming
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

    </div>
  )
}

export default AdminOverviewCard