import { css } from '@emotion/react'
import { Button, TextField } from '@radix-ui/themes'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { getBreeds } from '../api/search'

const formStyle = css`
  max-width: 320px;
  padding: 2em;
  border: 1px solid var(--color-fg);
  border-radius: 4px;
  display: flex;
  gap: 1em;
  flex-direction: column;
  margin-top: 4em;
  background: var(--color-bg);
  color: var(--color-fg);
`

export function Home() {
  const navigate = useNavigate()

  return (
    <Fragment>
      <h2>Welcome to Doggy Digs</h2>
      <p>
        Your place to match a lucky dog with a new home. Find your match today!
        Log in below to get started.
      </p>
      <form
        css={formStyle}
        onSubmit={(e) => {
          e.preventDefault()
          //@ts-expect-error - we know this is a form element
          login(e.target.name.value, e.target.email.value).then(() => {
            navigate('/search')
          })
        }}
      >
        <div>
          <label htmlFor="nameField">Name</label>
          <TextField.Root
            id="nameField"
            name="name"
            placeholder="Enter your name..."
            required
          />
        </div>
        <div>
          <label htmlFor="emailField">Email</label>
          <TextField.Root
            id="emailField"
            name="email"
            placeholder="Enter your email..."
            type="email"
            required
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Fragment>
  )
}
