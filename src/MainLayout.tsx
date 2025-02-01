import { css } from '@emotion/react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Fragment } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Container } from '@radix-ui/themes'

const FOOTER_HEIGHT = '88px'
const HEADER_HEIGHT = '64px'

const mainStyle = css`
  height: 100%;
  margin-inline: var(--layout-padding);
  min-height: calc(100vh - ${FOOTER_HEIGHT} - ${HEADER_HEIGHT});

  background: linear-gradient(
    60deg,
    white,
    lightgreen,
    rgb(122, 140, 114),
    #72cd4d
  );
  animation: gradient 15s ease infinite;
  background-size: 300% 300%;
`

export function MainLayout() {
  return (
    <Fragment>
      <ScrollRestoration />
      <Header />
      <main css={mainStyle}>
        <Container size="3" css={{ marginInline: '1em' }}>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </Fragment>
  )
}
