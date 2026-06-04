import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { AlertError } from '@/components/ui/alert-error'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { View } from 'lucide-react'
import { useDeleteResearchStudent, useResearchStudents } from './students.hooks'
import StudentsView from './StudentsView'
import { StudentsTableSkeleton } from './Skeleton'
import { formatDate, formatSriLankaDate } from '@/lib/format'
import ButtonLoader from '@/components/ui/button-loader'

const StudentsTable = ({ search }: { search: string }) => {

  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { data, isLoading, error } = useResearchStudents()
  const deleteMutation = useDeleteResearchStudent(setDeletingId)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const isSearchingStudent = search !== debouncedSearch;

  if (isLoading || isSearchingStudent) return <StudentsTableSkeleton />
  if (error instanceof Error) return <AlertError message={error.message} />
  if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No applications submitted yet</p>

  const filtered = data?.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  )

  if (!filtered?.length) return <p className='flex items-center justify-center text-base'>Application not found</p>

  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Degree</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Affiliation</TableHead>
            <TableHead>Research Area</TableHead>
            <TableHead>Applied on</TableHead>
            <TableHead>More Info</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered?.map((student) => (
            <TableRow key={student._id}>
              <TableCell>
                <span className='text-xs mr-1 font-bold'>{student.title}.</span>
                {student.name}
              </TableCell>
              <TableCell>{student.degree}</TableCell>
              <TableCell>{student.designation}</TableCell>
              <TableCell>{student.affiliation}</TableCell>
              <TableCell>{student.categoryId?.name}</TableCell>
              <TableCell>{formatSriLankaDate(student.updatedAt)}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size={'icon'} variant={'secondary'}>
                      <View />
                    </Button>
                  </DialogTrigger>
                  <DialogHeader className='sr-only'>
                    <DialogTitle></DialogTitle>
                  </DialogHeader>
                  <DialogContent>
                    <StudentsView data={student} />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <ConfirmDialog
                  onConfirm={() => deleteMutation.mutate(student._id)}
                  disabled={deletingId === student._id}
                  triggerText={
                    deletingId === student._id ? <ButtonLoader text="Deleting" /> : "Delete"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}

export default StudentsTable
