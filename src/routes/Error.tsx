import { Container } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

export function Error() {
  return (
    <Container size="3">
      <h2>Oh no!</h2>
      Looks like you tried to visit a route that doesn't exist. Head back{' '}
      <Link to="/">home</Link>.
    </Container>
  )
}
