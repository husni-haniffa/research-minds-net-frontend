// Note: Go to @lib/conduct-research-legacy-api and have a look at read-me file

import { ResearchFunding, formSchema as fundingFormSchema } from "@/features/public/conduct-research/research-funding/types"
import { ResearchHelps, formSchema as helpsFormSchema } from "@/features/public/conduct-research/research-helps/types"
import { ResearchIdea, formSchema as ideaFormSchema } from "@/features/public/conduct-research/research-idea/types"
import { ResearchPlacements, formSchema as placementsFormSchema } from "@/features/public/conduct-research/research-placements/types"
import { ResearchStudents, formSchema as studentsFormSchema } from "@/features/public/conduct-research/research-students/types"
import { ResearchSupervisor, formSchema as supervisorFormSchema } from "@/features/public/conduct-research/research-supervisor/types"
import { BASE_URL } from "@/types/api"
import { z } from "zod"

type ResearchFundingRequest = z.infer<typeof fundingFormSchema>
type ResearchHelpsRequest = z.infer<typeof helpsFormSchema>
type ResearchIdeaRequest = z.infer<typeof ideaFormSchema>
type ResearchPlacementsRequest = z.infer<typeof placementsFormSchema>
type ResearchStudentsRequest = z.infer<typeof studentsFormSchema>
type ResearchSupervisorRequest = z.infer<typeof supervisorFormSchema>

const parseResponse = async (response: Response) => {
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Network request failed")
    }
    return result
}

const postConductResearch = async (path: string, data: unknown) => {
    const response = await fetch(`${BASE_URL}/conduct-research/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return parseResponse(response)
}

const fetchConductResearch = async <T>(path: string, token: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}/conduct-research/${path}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    const result = await parseResponse(response)
    return result.data
}

const deleteConductResearch = async (path: string, id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/conduct-research/${path}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })
    return parseResponse(response)
}

// Research funding
export const createResearchFunding = (data: ResearchFundingRequest) =>
    postConductResearch("research-funding", data)

export const fetchResearchFunding = (token: string): Promise<ResearchFunding[]> =>
    fetchConductResearch("research-funding", token)

export const deleteResearchFunding = (id: string, token: string) =>
    deleteConductResearch("research-funding", id, token)

// Research help
export const createResearchHelp = (data: ResearchHelpsRequest) =>
    postConductResearch("research-help", data)

export const fetchResearchHelp = (token: string): Promise<ResearchHelps[]> =>
    fetchConductResearch("research-help", token)

export const deleteResearchHelp = (id: string, token: string) =>
    deleteConductResearch("research-help", id, token)

// Research idea
export const createResearchIdea = (data: ResearchIdeaRequest) =>
    postConductResearch("research-idea", data)

export const fetchResearchIdea = (token: string): Promise<ResearchIdea[]> =>
    fetchConductResearch("research-idea", token)

export const deleteResearchIdea = (id: string, token: string) =>
    deleteConductResearch("research-idea", id, token)

// Research placement
export const createResearchPlacement = (data: ResearchPlacementsRequest) =>
    postConductResearch("research-placement", data)

export const fetchResearchPlacement = (token: string): Promise<ResearchPlacements[]> =>
    fetchConductResearch("research-placement", token)

export const deleteResearchPlacement = (id: string, token: string) =>
    deleteConductResearch("research-placement", id, token)

// Research student
export const createResearchStudent = (data: ResearchStudentsRequest) =>
    postConductResearch("research-student", data)

export const fetchResearchStudent = (token: string): Promise<ResearchStudents[]> =>
    fetchConductResearch("research-student", token)

export const deleteResearchStudent = (id: string, token: string) =>
    deleteConductResearch("research-student", id, token)

// Research supervisor
export const createResearchSupervisor = (data: ResearchSupervisorRequest) =>
    postConductResearch("research-supervisor", data)

export const fetchResearchSupervisor = (token: string): Promise<ResearchSupervisor[]> =>
    fetchConductResearch("research-supervisor", token)

export const deleteResearchSupervisor = (id: string, token: string) =>
    deleteConductResearch("research-supervisor", id, token)
