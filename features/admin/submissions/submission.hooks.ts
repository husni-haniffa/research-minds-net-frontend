import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchSubmissions, submissionApproved, submissionRejected, submissionUnderReview, publishSubmission, deleteSubmission, addSocialMediaLinks, updateSocialMediaLinks } from "./submission.api"
import { toast } from "sonner"
import { submissionRequestChanges } from "@/api/submission"


export function useSubmissions() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["submissions"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchSubmissions(token)
        },
    })
}

export function useSubmissionUnderReview() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async(id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return submissionUnderReview(id, token)
        },
        onSuccess: (_, id) => {
            toast.success("Moved to Under Review")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            queryClient.invalidateQueries({ queryKey: ["submissions", id] })
          
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Update failed")
        },

    })
}


export function useSubmissionRequestChanges() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({
            id,
            message,
        }: {
            id: string;
            message: string;
        }) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return submissionRequestChanges(id, token, message)
        },
        onSuccess: (_, id) => {
            toast.success("Moved to Request Changes")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            queryClient.invalidateQueries({ queryKey: ["submissions", id] })

        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Update failed")
        },

    })
}

export function useSubmissionApproved() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return submissionApproved(id, token)
        },
        onSuccess: (_, id) => {
            toast.success("Moved to Approved")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            queryClient.invalidateQueries({ queryKey: ["submissions", id] })
            
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}

export function useSubmissionReject() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({
            id,
            reason,
        }: {
            id: string;
            reason: string;
        }) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return submissionRejected(id, token, reason)
        },
        onSuccess: (_, id) => {
            toast.success("Moved to Rejected")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            queryClient.invalidateQueries({ queryKey: ["submissions", id] })
            
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}

export function usePublishSubmission() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            accessLevel,
        }: {
            id: string
            accessLevel: "PUBLIC"
        }) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return publishSubmission(id, accessLevel, token)
        },
        onSuccess: (_, id) => {
            toast.success("Submission published")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            queryClient.invalidateQueries({ queryKey: ["submissions", id] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Publish failed")
        },
    })
}

export function useDeleteSubmission(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteSubmission(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: (_, id) => {
            toast.success("Submission deleted")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            queryClient.invalidateQueries({ queryKey: ["submissions", id] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}

export function useAddSocialMediaLinks() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({
            submissionId,
            socialMediaLinks
        }: {
            submissionId: string
            socialMediaLinks: {
                youtube?: string
                facebook?: string
                instagram?: string
                linkedin?: string
            }
        }) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return addSocialMediaLinks(submissionId, socialMediaLinks, token)
        },
        onSuccess: (_, submissionId) => {
            toast.success("Social media links added successfully")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            queryClient.invalidateQueries({ queryKey: ["submissions", submissionId] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Failed to add social media links")
        },
    })
}

export function useUpdateSocialMediaLinks() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({
            submissionId,
            socialMediaLinks
        }: {
            submissionId: string
            socialMediaLinks: {
                youtube?: string
                facebook?: string
                instagram?: string
                linkedin?: string
            }
        }) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return updateSocialMediaLinks(submissionId, socialMediaLinks, token)
        },
        onSuccess: (_, submissionId) => {
            toast.success("Social media links updated successfully")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            queryClient.invalidateQueries({ queryKey: ["submissions", submissionId] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Failed to update social media links")
        },
    })
}