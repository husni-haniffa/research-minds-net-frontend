import z from "zod"

export interface ResearchTypeRequest {
    name: string
}

export interface ResearchTypeResponse {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface CreateResearchTypeFormProps {
    onSuccess?: () => void
}

export interface EditResearchTypeFormProps extends CreateResearchTypeFormProps {
    researchTypeId: string
}

export const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Research type is required")
        .max(30, "Research type must not exceed 30 characters")
        .regex(/^[A-Za-z0-9\s:,\-()./]+$/, "Research type contains invalid characters"),
});


