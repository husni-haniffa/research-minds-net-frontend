import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertError } from '@/components/ui/alert-error'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { View } from 'lucide-react'
import { formatSriLankaDate } from '@/lib/format'
import { useDeleteResearchFunding, useResearchFunding } from './funding.hooks'
import FundingView from './FundingView'
import { FundingTableSkeleton } from './Skeleton'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import ButtonLoader from '@/components/ui/button-loader'

const FundingTable = ({ search }: { search: string }) => {

  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { data, isLoading, error } = useResearchFunding()
  const deleteMutation = useDeleteResearchFunding(setDeletingId)


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const isSearchingFunding = search !== debouncedSearch;

  if (isLoading || isSearchingFunding) return <FundingTableSkeleton />
  if (error instanceof Error) return <AlertError message={error.message} />
  if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No applications submitted yet</p>

  const filtered = data?.filter((funding) =>
    funding.name.toLowerCase().includes(search.toLowerCase())
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
            <TableHead>Funding Amount</TableHead>
            <TableHead>Applied on</TableHead>
            <TableHead>More Info</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered?.map((funding) => (
            <TableRow key={funding._id}>
              <TableCell>
                <span className='text-xs mr-1 font-bold'>{funding.title}.</span>
                {funding.name}
              </TableCell>
              <TableCell>{funding.degree}</TableCell>
              <TableCell>{funding.designation}</TableCell>
              <TableCell>{funding.affiliation}</TableCell>
              <TableCell>{funding.categoryId.name}</TableCell>
              <TableCell>{funding.fundingAmount}</TableCell>
              <TableCell>{formatSriLankaDate(funding.updatedAt)}</TableCell>
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
                    <FundingView data={funding} />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <ConfirmDialog
                  onConfirm={() => deleteMutation.mutate(funding._id)}
                  disabled={deletingId === funding._id}
                  triggerText={
                    deletingId === funding._id ? <ButtonLoader text="Deleting" /> : "Delete"
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

export default FundingTable
