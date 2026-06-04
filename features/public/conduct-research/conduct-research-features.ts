import {
    Lightbulb,
    GraduationCap,
    UserCog,
    Users,
    HandCoins,
    LifeBuoy
} from "lucide-react";

export const conductResearchFeatures = [
    {
        id: "research-idea",
        icon: Lightbulb,
        label: "Submit a Research Idea",
        description:
            "Share your research concept on the platform to put your ideas out there and get them noticed.",
        href: "/conduct-research/research-idea",
    },
    {
        id: "research-placements",
        icon: GraduationCap,
        label: "Research Placements",
        description:
            "Find and apply for open research positions and placements in universities or organizations.",
        href: "/conduct-research/research-placements",
    },
    {
        id: "research-supervisor",
        icon: UserCog,
        label: "Find a Supervisor",
        description:
            "For students looking for an experienced academic or researcher to supervise and guide their project.",
        href: "/conduct-research/research-supervisor",
    },
    {
        id: "research-students",
        icon: Users,
        label: "Research Students",
        description:
            "For students who want to find other students to collaborate with on research projects.",
        href: "/conduct-research/research-students",
    },
    {
        id: "research-funding",
        icon: HandCoins,
        label: "Research Funding",
        description:
            "Apply for funding for your project, or contribute financial support and grants to ongoing research.",
        href: "/conduct-research/research-funding",
    },
    {
        id: "research-helps",
        icon: LifeBuoy,
        label: "Research Help",
        description:
            "Get direct guidance, access useful tools, and find support to help you complete your work.",
        href: "/conduct-research/research-helps",
    }
];

export const iconStyles: Record<string, string> = {
    "research-idea": "bg-amber-50 group-hover:bg-amber-100 [&>svg]:text-amber-500",
    "research-placements": "bg-violet-50 group-hover:bg-violet-100 [&>svg]:text-violet-500",
    "research-supervisor": "bg-blue-50 group-hover:bg-blue-100 [&>svg]:text-blue-500",
    "research-students": "bg-emerald-50 group-hover:bg-emerald-100 [&>svg]:text-emerald-500",
    "research-funding": "bg-rose-50 group-hover:bg-rose-100 [&>svg]:text-rose-500",
    "research-helps": "bg-cyan-50 group-hover:bg-cyan-100 [&>svg]:text-cyan-500",
}