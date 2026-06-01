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
        .max(21, "Name must not exceed 21 characters")
        .regex(/^[A-Za-z0-9\s:,\-()./]+$/, "Name contains invalid characters"),
});


