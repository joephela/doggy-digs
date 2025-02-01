import {
  Button,
  Container,
  DataList,
  Dialog,
  Flex,
  Select,
  TextField,
} from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'
import {
  Dog,
  getBreeds,
  getFavorites,
  getRecommendedDog,
  search,
} from '../api/search'
import { Card } from '../components/Card'
import { css } from '@emotion/react'
import { Pagination } from '../components/Pagination'

const ageInputStyle = css`
  max-width: 80px;
`

const FAVORITE_STORAGE_KEY = 'doggy-digs-favorites'

export function Search() {
  const [breed, setBreed] = useState<string | null>(null)
  const [sort, setSort] = useState<string>('breed:asc')
  const [ageMin, setAgeMin] = useState<string>()
  const [ageMax, setAgeMax] = useState<string>()
  const [favorites, setFavorites] = useState<string[]>([])
  const [size, setSize] = useState('25')
  const [from, setFrom] = useState('0')
  const [recommendedDog, setRecommendedDog] = useState<Dog | null>(null)
  const [zipCode, setZipCode] = useState<string>()

  useLayoutEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITE_STORAGE_KEY)
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const { data: breeds } = useQuery({
    queryKey: ['breeds'],
    queryFn: getBreeds,
  })

  const { data: searchResults } = useQuery({
    queryKey: ['search', breed, sort, ageMax, ageMin, size, from, zipCode],
    queryFn: () =>
      search({
        breed,
        sort,
        ageMax,
        ageMin,
        size,
        from,
        zipCodes: zipCode ? [zipCode] : undefined,
      }),
  })

  const { data: favoriteResults } = useQuery({
    queryKey: ['search', ...favorites],
    queryFn: () => getFavorites({ favorites }),
  })

  return (
    <Container size="3">
      <h2>Lets find you a pup.</h2>
      <Flex gap="4" wrap={'wrap'} m="2" justify={'between'}>
        <Flex direction={'column'} gap={'1'}>
          <label htmlFor="breed">Breed</label>
          <Select.Root value={breed ?? ''} onValueChange={setBreed}>
            <Select.Trigger placeholder="Choose a breed" id="breed" />
            <Select.Content>
              <Select.Group>
                <Select.Label>Choose a breed</Select.Label>
                {breeds?.map((breed: string) => (
                  <Select.Item key={breed} value={breed}>
                    {breed}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex direction={'column'} gap={'1'}>
          <label htmlFor="zip">Zip code</label>
          <TextField.Root
            id="zip"
            size="2"
            placeholder="Zip code"
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Flex>

        <Flex direction={'column'} gap={'1'}>
          <label htmlFor="age">Age</label>
          <Flex gap={'1'}>
            <TextField.Root
              id="age"
              css={ageInputStyle}
              size="2"
              placeholder="Min age"
              type="number"
              onChange={(e) => setAgeMin(e.target.value)}
            />{' '}
            -
            <TextField.Root
              css={ageInputStyle}
              size="2"
              placeholder="Max age"
              type="number"
              onChange={(e) => setAgeMax(e.target.value)}
            />
          </Flex>
        </Flex>
        <Flex direction={'column'} gap={'1'}>
          <label htmlFor="sort">Sort by</label>
          <Select.Root value={sort ?? ''} onValueChange={setSort}>
            <Select.Trigger placeholder="Sort by" id="sort" />
            <Select.Content>
              <Select.Group>
                <Select.Label>Sort by</Select.Label>
                <Select.Item value="breed:asc">Breed (A-Z)</Select.Item>
                <Select.Item value="breed:desc">Breed (Z-A)</Select.Item>
                <Select.Item value="age:asc">Age (Youngest)</Select.Item>
                <Select.Item value="age:desc">Age (Oldest)</Select.Item>
                <Select.Item value="name:asc">Name (A-Z)</Select.Item>
                <Select.Item value="name:desc">Name (Z-A)</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
        <Flex direction={'column'} gap={'1'}>
          <label htmlFor="size">Results per page</label>
          <Select.Root value={size ?? ''} onValueChange={setSize}>
            <Select.Trigger placeholder="Results per page" id="size" />
            <Select.Content>
              <Select.Group>
                <Select.Label>Results per page</Select.Label>
                <Select.Item value="25">25</Select.Item>
                <Select.Item value="50">50</Select.Item>
                <Select.Item value="100">100</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
        {recommendedDog ? (
          <Dialog.Root open={recommendedDog !== null}>
            <Dialog.Trigger>
              <Button>Edit profile</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Recommended pup</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                We think you'll love this dog!
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <img
                  src={recommendedDog.img}
                  alt="dog picture"
                  style={{
                    display: 'block',
                    objectFit: 'contain',
                    marginTop: '8px',
                    width: '100%',
                    height: 140,
                  }}
                />
                <DataList.Root>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Breed</DataList.Label>
                    <DataList.Value>{recommendedDog.breed}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Age</DataList.Label>
                    <DataList.Value>{recommendedDog.age}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Zip code</DataList.Label>
                    <DataList.Value>{recommendedDog.zip_code}</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button
                    color="gray"
                    onClick={() => {
                      setRecommendedDog(null)
                    }}
                  >
                    Cancel
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        ) : null}
        {favorites.length > 0 && (
          <p>
            Having a hard time choosing?{' '}
            <Button
              onClick={() => {
                getRecommendedDog(favorites).then((data) => {
                  const recommended = favoriteResults.filter(
                    (dog: Dog) => data.match === dog.id,
                  )[0]
                  setRecommendedDog(recommended)
                })
              }}
            >
              Recommend a match
            </Button>
          </p>
        )}
      </Flex>
      <Flex m="2">
        <p>
          {searchResults ? `${searchResults?.total} dogs found!` : `Loading...`}
        </p>
      </Flex>
      <Pagination
        searchResults={searchResults}
        size={size}
        from={from}
        setFrom={setFrom}
      />
      <Flex gap="4" wrap={'wrap'} m="2" align={'center'}>
        {favoriteResults?.map((dog: Dog) => {
          return (
            <Card
              key={dog.id}
              dog={dog}
              isFavorite={favorites.includes(dog.id)}
              setFavorite={(isFavorite) => {
                const newFavorites = isFavorite
                  ? [...favorites, dog.id]
                  : favorites.filter((favorite) => favorite !== dog.id)

                setFavorites(newFavorites)
                localStorage.setItem(
                  FAVORITE_STORAGE_KEY,
                  JSON.stringify(newFavorites),
                )
              }}
            />
          )
        })}
        {searchResults?.dogs.map((dog: Dog) => {
          return favorites.includes(dog.id) ? null : (
            <Card
              key={dog.id}
              dog={dog}
              isFavorite={favorites.includes(dog.id)}
              setFavorite={(isFavorite) => {
                const newFavorites = isFavorite
                  ? [...favorites, dog.id]
                  : favorites.filter((favorite) => favorite !== dog.id)

                setFavorites(newFavorites)
                localStorage.setItem(
                  FAVORITE_STORAGE_KEY,
                  JSON.stringify(newFavorites),
                )
              }}
            />
          )
        })}
      </Flex>
      <Pagination
        searchResults={searchResults}
        size={size}
        from={from}
        setFrom={setFrom}
      />{' '}
    </Container>
  )
}
