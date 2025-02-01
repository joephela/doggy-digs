import {
  DataList,
  Flex,
  IconButton,
  Inset,
  Card as RadixCard,
} from '@radix-ui/themes'
import { Dog } from '../api/search'
import { css } from '@emotion/react'

const cardStyle = css`
  width: 200px;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
`

const favoriteCardStyle = css`
  border: 2px solid yellow;
`

export function Card({ dog, isFavorite, setFavorite }: CardProps) {
  return (
    <RadixCard size="2" css={[cardStyle, isFavorite && favoriteCardStyle]}>
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src={dog.img}
          alt="dog picture"
          style={{
            display: 'block',
            objectFit: 'contain',
            marginTop: '8px',
            width: '100%',
            height: 140,
          }}
        />
      </Inset>
      <Flex justify="between" align={'center'}>
        <h3>{dog.name}</h3>
        <IconButton
          onClick={() => setFavorite(!isFavorite)}
          css={isFavorite ? { color: 'yellow' } : {}}
          aria-label="Favorite"
          title="Mark as favorite"
        >
          &#9733;
        </IconButton>
      </Flex>
      <DataList.Root>
        <DataList.Item>
          <DataList.Label minWidth="88px">Breed</DataList.Label>
          <DataList.Value>{dog.breed}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Age</DataList.Label>
          <DataList.Value>{dog.age}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Zip code</DataList.Label>
          <DataList.Value>{dog.zip_code}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </RadixCard>
  )
}

export interface CardProps {
  dog: Dog
  isFavorite: boolean
  setFavorite: (isFavorite: boolean) => void
}
