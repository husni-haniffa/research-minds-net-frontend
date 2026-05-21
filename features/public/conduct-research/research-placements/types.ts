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

    affiliationType: z
        .string()
        .trim()
        .min(1, "Affiliation type is required")
        .max(200, "Affiliation type is too long"),

    affiliation: z
        .string()
        .trim()
        .min(1, "Affiliation is required")
        .max(200, "Affiliation is too long"),

    categoryId: z
        .string()
        .min(1, "Please select a category"),

    minorResearchIdea: z
        .string()
        .trim()
        .min(1, "Please enter a short summary")
        .max(2500, "Summary is too long"),

    howCanYouContribute: z
        .string()
        .trim()
        .min(1, "Please explain your contribution")
        .max(1000, "Contribution is too long"),
});

export const typeofContributions = [
    {
        id: 1,
        value: "Idea Only"
    },
    {
        id: 2,
        value: "I can be a co-reseacher"
    },
    {
        id: 3,
        value: "I can be the main supervisor"
    },
    {
        id: 4,
        value: "I can be a co-supervisor"
    },
    {
        id: 5,
        value: "I have full funds"
    },
    {
        id: 6,
        value: "I can contribute in another way"
    },
]

export interface ResearchPlacements {
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
    affiliationType: string;
    affiliation: string;
    categoryId: {
        _id: string
        name: string
    }
    minorResearchIdea: string;
    howCanYouContribute: string;
    createdAt: string
    updatedAt: string
}

export interface ResearchPlacementsFormProps {
    onSuccess?: () => void
}