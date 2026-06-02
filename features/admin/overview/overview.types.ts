import { EventResponse } from "../events/event.types"

export interface AdminOverviewResponse {
    users: UserStats
    submissions: SubmissionStats
    applications: ApplicationStats
    upcomingEvents: EventResponse[]
}

export interface UserStats {
    total: number
    recentlyJoined: number
}

export interface SubmissionStats {
    pending: number
    underReview: number
    rejected: number
    accepted: number
    published: number
}

export interface ApplicationStats {
    idea: number
    help: number
    supervisor: number
    funding: number
    placement: number
    student: number
}

