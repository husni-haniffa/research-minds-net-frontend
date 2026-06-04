
import { Card,CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction} from '@/components/ui/card'
import { SubmissionResponse } from './submission.types'

const SubmissionView = ({submission} : {submission: SubmissionResponse})  => {
  return (
    <Card className='w-full border-0 shadow-none' key={submission._id}>
        <CardHeader>
            <CardTitle className='text-slate-800 text-base line-clamp-2 max-w-sm'>
                {submission.title.slice(0,75)}...
            </CardTitle>
            <CardDescription className='text-slate-600 text-xs'>
                {submission.categoryId.name}
            </CardDescription>
            <CardAction className='text-xs text-amber-600'>
                {submission.researchTypeId.name}
            </CardAction>
        </CardHeader>
        <CardContent className='text-sm line-clamp-6 max-w-md'>
            {submission.abstract.slice(0,500)}...
        </CardContent>
        <CardFooter className='text-xs'>
            <span className='font-semibold mr-3 text-xs'>
                Created:
            </span>
            {submission.createdAt}
        </CardFooter>
    </Card>
  )
}

export default SubmissionView