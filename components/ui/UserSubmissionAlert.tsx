import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertTriangle, Info } from "lucide-react"

export function UserSubmissionEditAlert() {
    return (
        <Alert className="bg-red-50 border border-red-500">
            <AlertTriangle className="h-5 w-5" color="red"/>
            <AlertTitle className="text-red-500 font-bold text-xs xl:text-base">Warning: This action cannot be undone</AlertTitle>
            <AlertDescription className="text-black text-xs xl:text-sm">
                Updating your submission will permanently erase all existing records and replace them with the new data.
            </AlertDescription>
        </Alert>
    )
}

export function UserSubmissionGuideAlert() {
    return (
        <Alert className="bg-amber-50 border border-amber-500">
            <Info className="h-5 w-5 text-amber-600" color="orange" />
            <AlertTitle className="text-amber-500 font-bold text-xs xl:text-base">Before you submit</AlertTitle>
            <AlertDescription className="text-black text-xs xl:text-sm">
                Please review the submission guidelines to ensure your content meets the required format.{" "}
                <a
                    href="/SubmissionGuide.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 hover:no-underline mt-1 mb-2"
                >
                    View Submission Guide
                </a>
            </AlertDescription>
        </Alert>
    )
}