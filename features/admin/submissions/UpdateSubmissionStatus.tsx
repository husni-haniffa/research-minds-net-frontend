import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  useSubmissionApproved,
  useSubmissionReject,
  useSubmissionUnderReview,
  useSubmissionRequestChanges,
} from "./submission.hooks"
import ButtonLoader from "@/components/ui/button-loader"

type Status =
  | "PENDING"
  | "UNDER_REVIEW"
  | "CHANGES_REQUESTED"
  | "REJECTED"
  | "ACCEPTED"

type UpdateSubmissionStatusProps = {
  id: string
  currentStatus: Status
  revisionCount: number
}

const statusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Under Review", value: "UNDER_REVIEW" },
  { label: "Changes Requested", value: "CHANGES_REQUESTED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Accepted", value: "ACCEPTED" },
] as const

const UpdateSubmissionStatus: React.FC<UpdateSubmissionStatusProps> = ({
  id,
  currentStatus,
  revisionCount,
}) => {
  const [status, setStatus] = React.useState<Status>(currentStatus)
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const underReviewMutation = useSubmissionUnderReview()
  const approvedMutation = useSubmissionApproved()
  const rejectedMutation = useSubmissionReject()
  const requestChangesMutation = useSubmissionRequestChanges()

  const isLoading =
    underReviewMutation.isPending ||
    approvedMutation.isPending ||
    rejectedMutation.isPending ||
    requestChangesMutation.isPending

  // Which target statuses are actually reachable from the current one.
  const isDisabled = (value: Status) => {
    if (isLoading) return true
    if (value === currentStatus) return true

    if (currentStatus === "PENDING") {
      return value !== "UNDER_REVIEW"
    }

    if (currentStatus === "UNDER_REVIEW") {
      if (value === "PENDING") return true
      if (value === "CHANGES_REQUESTED") return revisionCount > 0 // one chance only
      return false // ACCEPTED, REJECTED always reachable from here
    }

    if (currentStatus === "CHANGES_REQUESTED") {
      // Waiting on the user to resubmit — admin can still approve/reject early,
      // but can't re-trigger under review or changes-requested again.
      return value === "PENDING" || value === "UNDER_REVIEW" || value === "CHANGES_REQUESTED"
    }

    return true // ACCEPTED / REJECTED are terminal — nothing reachable
  }

  const needsMessage = status === "REJECTED" || status === "CHANGES_REQUESTED"
  const canConfirm =
    status !== currentStatus && (!needsMessage || message.trim().length > 0)

  const handleConfirm = () => {
    if (!canConfirm) return
    const onSuccess = () => {
      setOpen(false)
      setMessage("")
    }

    switch (status) {
      case "UNDER_REVIEW":
        underReviewMutation.mutate(id, { onSuccess })
        break
      case "CHANGES_REQUESTED":
        requestChangesMutation.mutate(
          { id, message: message.trim() },
          { onSuccess }
        )
        break
      case "REJECTED":
        rejectedMutation.mutate(
          { id, reason: message.trim() },
          { onSuccess }
        )
        break
      case "ACCEPTED":
        approvedMutation.mutate(id, { onSuccess })
        break
      default:
        break
    }
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      // reset local state when dialog closes without confirming
      setStatus(currentStatus)
      setMessage("")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"updateStatus"}
          disabled={currentStatus === "ACCEPTED" || currentStatus === "REJECTED"}
          size={"sm"}
        >
          Status
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Status</AlertDialogTitle>
        </AlertDialogHeader>

        <RadioGroup
          value={status}
          onValueChange={(value) => setStatus(value as Status)}
          className="space-y-3"
        >
          {statusOptions.map((item) => (
            <div key={item.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={item.value}
                id={item.value}
                disabled={isDisabled(item.value)}
              />
              <Label htmlFor={item.value}>{item.label}</Label>
            </div>
          ))}
        </RadioGroup>

        {needsMessage && (
          <div className="pt-2">
            <Label htmlFor="status-message" className="text-sm text-slate-950">
              {status === "REJECTED" ? "Reason for rejection" : "What needs to change?"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="status-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                status === "REJECTED"
                  ? "Explain why this submission is being rejected..."
                  : "Please add a methodology section and fix the citation format..."
              }
              className="mt-3 text-xs"
            />
            {/* {status === "CHANGES_REQUESTED" && (
              <p className="text-xs text-slate-400 mt-1">
                The user gets one chance to fix this and resubmit. If it&apos;s still
                not right, you&apos;ll only be able to Accept or Reject.
              </p>
            )} */}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading || !canConfirm}
            className="bg-green-600 hover:bg-green-600"
          >
            {isLoading ? <ButtonLoader text="Updating" /> : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateSubmissionStatus