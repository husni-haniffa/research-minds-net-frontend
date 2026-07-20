import z from "zod"

export const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;
export const MAX_FILE_SIZE_LABEL = "4MB";

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
        .max(250, "News title is too long"),

    content: z
        .string()
        .trim()
        .min(1, "News content is required")
        .max(10000, "News content is too long"),

    file: z
        .instanceof(File)   
        .refine(
            (file) =>
                !file ||
                ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
            {
                message: "Only JPG, JPEG, or PNG files are allowed",
            }
        )
        .refine(
                    (file) => file.size <= MAX_FILE_SIZE_BYTES,
                    { message: `File must not exceed ${MAX_FILE_SIZE_LABEL}` }
                )
        .optional()
        
});




