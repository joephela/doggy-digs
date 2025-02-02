import { css } from '@emotion/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import dog from '../assets/dog.svg'
import { Button } from '@radix-ui/themes'

const headingStyles = css`
  margin: 0;
  max-width: 320px;
  font-size: 1.2em;
  font-weight: bold;
  font-variant: petite-caps;
`

const headerWrapperStyle = css`
  background: var(--color-bg);
  color: var(--color-fg);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 16px;
`

const avatarStyle = css`
  border-radius: 100%;
  width: 24px;
  height: 24px;
  background: green;
  border: 1px solid black;
  border-radius: 100%;
`

const imageHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <header css={headerWrapperStyle}>
      <div css={imageHeaderStyle}>
        <Link to="/">
          <img
            src={dog}
            css={avatarStyle}
            alt="Doggy digs logo"
            aria-label="Doggy digs logo"
          />
        </Link>

        <span css={headingStyles}>Doggy Digs</span>
      </div>
      {pathname !== '/' && (
        <Button
          onClick={() => {
            navigate('/')
          }}
        >
          Logout
        </Button>
      )}
    </header>
  )
}
