"use client"
import { useEffect, useState } from 'react'
import { useSubmissionByUserId } from './submission.hooks'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { AlertError } from '@/components/ui/alert-error'
import { SubmissionTableSkeleton } from './Skeleton'
import StatusBadge from '@/components/ui/status-badge'
import { formatSriLankaDate } from '@/lib/format'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'


const SubmissionsTable = ({ search }: { search: string }) => {

    const { data, isLoading, error } = useSubmissionByUserId()
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
          const timer = setTimeout(() => {
            setDebouncedSearch(search)
          }, 300) 
          return () => clearTimeout(timer)
        }, [search])
    
    const isSearchingSubmission = search !== debouncedSearch;
    
    if (isLoading || isSearchingSubmission) return <SubmissionTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
    if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No Submissions</p>
        
    const filtered = data?.filter((submission) =>
        submission.title.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <p className='flex items-center justify-center text-base'>No submission found</p>

  return (
      <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Research</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>File</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Edit</TableHead>
                      <TableHead>Live</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {filtered?.map((submission) => (
                      <TableRow key={submission._id}>
                          <TableCell>{submission.title.slice(0, 25)}...</TableCell>
                          <TableCell>{submission.researchTypeId.name}</TableCell>
                          <TableCell>{submission.categoryId.name}</TableCell>
                          <TableCell><StatusBadge status={submission.status} /></TableCell>
                          <TableCell>
                              {(submission.status === 'CHANGES_REQUESTED' || submission.status === 'REJECTED') &&
                                  submission.reviewMessage ? (
                                  <Dialog>
                                      <DialogTrigger asChild>
                                          <Button
                                              size="sm"
                                              variant={submission.status === 'REJECTED' ? 'destructive' : 'secondary'}
                                          >
                                              {submission.status === 'REJECTED' ? 'View Reason' : 'View Changes'}
                                          </Button>
                                      </DialogTrigger>
                                      <DialogHeader className='sr-only'>
                                          <DialogTitle>
                                              {submission.status === 'REJECTED' ? 'Rejection Reason' : 'Requested Changes'}
                                          </DialogTitle>
                                      </DialogHeader>
                                      <DialogContent>
                                          <h3 className="font-medium text-sm text-slate-950 mb-2">
                                              {submission.status === 'REJECTED'
                                                  ? 'Why this submission was rejected'
                                                  : 'What needs to change'}
                                          </h3>
                                          <p className="text-sm text-slate-900 whitespace-pre-wrap">
                                              {submission.reviewMessage}
                                          </p>
                                      </DialogContent>
                                  </Dialog>
                              ) : submission.status === 'UNDER_REVIEW' && submission.revisionCount > 0 ? (
                                  <Dialog>
                                      <DialogTrigger asChild>
                                          <Button size="sm" variant="secondary">
                                              Resubmitted
                                          </Button>
                                      </DialogTrigger>
                                      <DialogHeader className='sr-only'>
                                          <DialogTitle>Resubmission confirmed</DialogTitle>
                                      </DialogHeader>
                                      <DialogContent>
                                          <h3 className="font-medium text-sm text-slate-950 mb-2">
                                              You've resubmitted your changes
                                          </h3>
                                          <p className="text-sm text-slate-900 whitespace-pre-wrap">
                                              {submission.reviewMessage}
                                          </p>
                                          <p className="text-xs text-slate-500 mt-3">
                                              This was the feedback you addressed. It's back with the reviewer now — no further edits are needed from you.
                                          </p>
                                      </DialogContent>
                                  </Dialog>
                              ) : (
                                  <span className="text-slate-900 text-xs">—</span>
                              )}
                          </TableCell>

                          <TableCell>
                              <Link href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
                                  <Download />
                              </Link>
                          </TableCell>
                          <TableCell>{formatSriLankaDate(submission.createdAt)}</TableCell>
                          <TableCell>
                              {submission.status === 'PENDING' ||
                                  (submission.status === 'CHANGES_REQUESTED' && submission.revisionCount === 0) ? (
                                  <Link href={`/user/submissions/${submission._id}/edit`}>
                                      <Button size="sm" variant="edit">Edit</Button>
                                  </Link>
                              ) : (
                                  <Button size="sm" variant="edit" disabled>Edit</Button>
                              )}
                          </TableCell>
                          <TableCell>{submission.isPublished ? "Yes" : "No"}</TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </div>
    
  )
}

export default SubmissionsTable