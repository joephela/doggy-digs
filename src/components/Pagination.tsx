import { Button, Flex } from '@radix-ui/themes'

export function Pagination({
  searchResults,
  from,
  size,
  setFrom,
}: PaginationProps) {
  return (
    <Flex justify={'center'} align={'center'} gap="2" m="6">
      <Button
        onClick={() => {
          if (parseInt(from) === 0) return
          const newFrom = parseInt(from) - parseInt(size)
          if (newFrom < 0) return

          setFrom(newFrom.toString())
        }}
      >
        Previous
      </Button>

      {searchResults
        ? `Showing ${from} - ${parseInt(size) + parseInt(from)}`
        : 'Loading...'}
      <Button
        onClick={() => {
          setFrom((parseInt(from) + parseInt(size)).toString())
        }}
      >
        Next
      </Button>
    </Flex>
  )
}

export interface PaginationProps {
  searchResults: any
  from: string
  size: string
  setFrom: (from: string) => void
}
