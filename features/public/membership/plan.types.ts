export interface MembershipPlanResponse {
    _id: string
    name: string
    slug: string
    price: number
    currency: string
    billing_period: "yearly" | "5 years" | "life_time"
    trial_days: number
    features: string[]
    createdAt: string
    updatedAt: string
}