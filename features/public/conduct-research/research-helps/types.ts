import { z } from "zod";

const phoneRegex = /^\d{10}$/;

export const formSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Please select a title")
        .max(10, "Title is too long"),

    name: z
        .string()
        .trim()
        .min(1, "Full name is required")
        .max(100, "Name is too long"),

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
        .max(250, "Affiliation is too long"),

    degree: z
        .string()
        .min(1, "Please select a degree"),

    categoryId: z
        .string()
        .min(1, "Please select a category"),

    minorResearchArea: z
        .string()
        .trim()
        .min(1, "Minor research area is required")
        .max(1000, "Minor research area is too long"),

    howCanYouContribute: z
        .string()
        .trim()
        .min(1, "Please explain your contribution")
        .max(1000, "Contribution is too long"),
});


export const typeofContributions = [
    {
        id: 1,
        value: "Proposal Development"
    },
    {
        id: 2,
        value: "Methodology Development"
    },
    {
        id: 3,
        value: "Field Works"
    },
    {
        id: 4,
        value: "Lab works"
    },
    {
        id: 5,
        value: "Data Analysis"
    },
    {
        id: 6,
        value: "Data Interpretation"
    },
    {
        id: 7,
        value: "Writing"
    },
    {
        id: 8,
        value: "Publishing"
    },
    {
        id: 9,
        value: "I can contribute in another way"
    },
]

export interface ResearchHelps {
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
    howCanYouContribute: string;
    createdAt: string
    updatedAt: string
}

export interface ResearchHelpsFormProps {
    onSuccess?: () => void
}