import { BASE_URL } from './base'

export async function getBreeds() {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, {
    method: 'GET',
    credentials: 'include',
  })
  const data = await response.json()
  return response.ok ? data : Promise.reject(data)
}

export async function getZipCodesFromState(state: string) {
  const response = await fetch(`${BASE_URL}/locations/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ states: [state] }),
  })
  const data = await response.json()
  return response.ok
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.results.map((result: any) => result.zip_code)
    : Promise.reject(data)
}

export interface BoundingBox {
  top: Coordinates
  left: Coordinates
  bottom: Coordinates
  right: Coordinates
}

export interface GetZipCodesProps {
  city: string
  states: string
  geoBoundingBox: {
    radius: number
  }
}

export async function getRecommendedDog(favorites: string[]) {
  const response = await fetch(`${BASE_URL}/dogs/match`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favorites),
  })
  const data = await response.json()
  return response.ok ? data : Promise.reject(data)
}

export async function getFavorites({ favorites }: { favorites: string[] }) {
  const response = await fetch(`${BASE_URL}/dogs`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favorites),
  })
  const dogs = await response.json()
  return response.ok ? dogs : Promise.reject(dogs)
}

export async function search({
  breed,
  zipCodes,
  ageMax,
  ageMin,
  size,
  from,
  sort = 'breed:asc',
}: SearchProps) {
  const params = new URLSearchParams()
  const breeds = breed ? [breed] : undefined

  if (breeds) params.append('breeds', breeds.join(','))
  if (zipCodes) params.append('zipCodes', zipCodes.join(','))
  if (ageMin) params.append('ageMin', ageMin)
  if (ageMax) params.append('ageMax', ageMax)
  if (size) params.append('size', size)
  if (from) params.append('from', from)
  if (sort) params.append('sort', sort)

  const response = await fetch(`${BASE_URL}/dogs/search?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()

  if (!response.ok) {
    return Promise.reject(data)
  }

  const dogsResponse = await fetch(`${BASE_URL}/dogs`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.resultIds),
  })
  const dogs = await dogsResponse.json()

  return dogsResponse.ok
    ? { dogs, next: data.next, total: data.total }
    : Promise.reject(dogs)
}

export interface SearchProps {
  breed?: string | null
  zipCodes?: string[]
  ageMin?: string
  ageMax?: string
  size?: string
  from?: string
  sort?: string
}

export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

interface Coordinates {
  lat: number
  lon: number
}
