import z from "zod"

export interface CategoryRequest {
    name: string
}

export interface CategoryResponse {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface CreateCategoryFormProps {
    onSuccess?: () => void
}

export interface EditCategoryFormProps extends CreateCategoryFormProps {
    categoryId: string
}

export const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Research category is required")
        .max(50, "Research category is too long")
});


