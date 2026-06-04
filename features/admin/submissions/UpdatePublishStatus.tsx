import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { usePublishSubmission } from "./submission.hooks"
import ButtonLoader from "@/components/ui/button-loader"

type UpdatePublishStatusProps = {
  id: string
  defaultVisibility?: "PUBLIC"
  live: "Yes" | "No"
  currentStatus: string
}

const UpdatePublishStatus = ({id, defaultVisibility = "PUBLIC", live, currentStatus}: UpdatePublishStatusProps) => {

  const [visibility, setVisibility] = React.useState<"PUBLIC">(defaultVisibility)
  const [open, setOpen] = React.useState(false)

  const publishMutation = usePublishSubmission()

  const handleConfirm = () => {
    const onSuccess = () => setOpen(false)
    publishMutation.mutate({id,accessLevel: visibility,}, {onSuccess})
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={'sm'} variant={'publish'} disabled={live === 'Yes' || currentStatus === "REJECTED" || currentStatus === "UNDER_REVIEW" || currentStatus === "PENDING"}>Publish</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Access To
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <RadioGroup
            value={visibility}
            onValueChange={(value) =>
              setVisibility(value as "PUBLIC")}
            >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="PUBLIC" id="public" />
              <Label htmlFor="public">Public</Label>
            </div>
          </RadioGroup>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel  disabled={publishMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={publishMutation.isPending}  className="bg-green-600 hover:bg-green-600">
            {publishMutation.isPending ? <ButtonLoader text="Publishing"/> : "Publish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdatePublishStatus
