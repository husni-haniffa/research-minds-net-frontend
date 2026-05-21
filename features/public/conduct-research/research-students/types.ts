import { z } from "zod";

const phoneRegex = /^\d{10}$/;

export const formSchema = z.object({
    title: z
           .string()
           .trim()
           .min(1, "Please select a title")
           .max(20, "Title is too long"),
   
       name: z
           .string()
           .trim()
           .min(1, "Full name is required")
           .max(200, "Name is too long"),
   
       mobile: z
           .string()
           .regex(phoneRegex, "Enter a valid mobile number"),
   
       whatsapp: z
           .string()
           .regex(phoneRegex, "Enter a valid WhatsApp number"),
   
       email: z
           .string()
           .trim()
           .email("Enter a valid email address")
           .max(255, "Email is too long"),
   
       linkedin: z
           .string()
           .trim()
           .url("Enter a valid LinkedIn URL")
           .or(z.literal("")),


    orcid: z
        .string()
        .trim()
        .url("Enter a valid ORCID URL")
        .or(z.literal("")),

    researchgate: z
        .string()
        .trim()
        .url("Enter a valid ResearchGate URL")
        .or(z.literal("")),

    scholar: z
        .string()
        .trim()
        .url("Enter a valid Google Scholar URL")
        .or(z.literal("")),

    designation: z
        .string()
        .trim()
        .min(1, "Designation is required")
        .max(250, "Designation is too long"),

    affiliation: z
        .string()
        .trim()
        .min(1, "Affiliation is required")
        .max(200, "Affiliation is too long"),
    degree: z
        .string()
        .min(1, "Please select a degree"),

    categoryId: z
        .string()
        .min(1, "Please select a category"),

    minorResearchArea: z
        .string()
        .trim()
        .min(1, "Please describe your research idea")
        .max(5000, "Research idea is too long"),

    whereWouldYouLikeToConductResearch: z
        .string()
        .trim()
        .min(1, "Please describe in detail")
        .max(2500, "Too long"),
});

export interface ResearchStudents {
    _id: string
    title: string;
    name: string;
    mobile: string;
    whatsapp: string;
    email: string;
    linkedin: string;
    orcid: string;
    researchgate: string;
    scholar: string;
    designation: string;
    affiliation: string;
    degree: string;
    categoryId: {
        _id: string
        name: string
    }
    minorResearchArea: string;
    whereWouldYouLikeToConductResearch: string;
    createdAt: string
    updatedAt: string
}

export interface ResearchStudentsFormProps {
    onSuccess?: () => void
}