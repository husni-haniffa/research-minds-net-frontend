import { useQuery } from "@tanstack/react-query"
import { fetchPlans } from "./plan.api"

export function usePlans() {
    return useQuery({
        queryKey: ["plans"],
        queryFn: async () => {
            return fetchPlans()
        },
    })
}