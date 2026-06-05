import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { AlertError } from '@/components/ui/alert-error'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { View } from 'lucide-react'
import { useDeleteResearchPlacement, useResearchPlacements } from './placements.hooks'
import PlacementsView from './PlacementsView'
import { PlacementsTableSkeleton } from './Skeleton'
import { formatSriLankaDate } from '@/lib/format'
import ButtonLoader from '@/components/ui/button-loader'

const PlacementsTable = ({ search }: { search: string }) => {

  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { data, isLoading, error } = useResearchPlacements()
  const deleteMutation = useDeleteResearchPlacement(setDeletingId)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const isSearchingPlacements = search !== debouncedSearch;

  if (isLoading || isSearchingPlacements) return <PlacementsTableSkeleton />
  if (error instanceof Error) return <AlertError message={error.message} />
  if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No applications submitted yet</p>

  const filtered = data?.filter((placement) =>
    placement.name?.toLowerCase().includes(search.toLowerCase()) ||
    placement.affiliationType?.toLowerCase().includes(search.toLowerCase())
  )

  if (!filtered?.length) return <p className='flex items-center justify-center text-base'>Application not found</p>

  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Affiliation Type</TableHead>
            <TableHead>Affiliation</TableHead>
            <TableHead>Research Area</TableHead>
            <TableHead>Applied on</TableHead>
            <TableHead>More Info</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered?.map((placement) => (
            <TableRow key={placement._id}>
              <TableCell>
                <span className='text-xs mr-1 font-bold'>{placement.title}.</span>
                {placement.name}
              </TableCell>
              <TableCell>{placement.designation}</TableCell>
              <TableCell>{placement.affiliationType}</TableCell>
              <TableCell>{placement.affiliation}</TableCell>
              <TableCell>{placement.categoryId?.name}</TableCell>
            <TableCell>{formatSriLankaDate(placement.updatedAt)}</TableCell>
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
                    <PlacementsView data={placement} />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <ConfirmDialog
                  onConfirm={() => deleteMutation.mutate(placement._id)}
                  disabled={deletingId === placement._id}
                  triggerText={
                    deletingId === placement._id ? <ButtonLoader text="Deleting" /> : "Delete"
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

export default PlacementsTable
