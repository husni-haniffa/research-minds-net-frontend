import z from "zod"

export interface NewsResponse {
    _id: string
    title: string
    content: string
    imageUrl?: string
    imagePath?: string
    createdAt: string
    updatedAt: Date
}

export interface CreateNewsFormProps {
    onSuccess?: () => void
}

export interface EditNewsFormProps extends CreateNewsFormProps {
    newsId: string
}

export const formSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "News title is required")
        .max(2500, "News title is too long"),

    content: z
        .string()
        .trim()
        .min(1, "News content is required")
        .max(10000, "News content is too long"),

    file: z
        .instanceof(File)
        .optional()
        .refine(
            (file) =>
                !file ||
                ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
            {
                message: "Only JPG, JPEG, or PNG files are allowed",
            }
        ),
});




