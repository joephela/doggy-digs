import { css } from '@emotion/react'

const footerStyle = css`
  background: var(--bg-footer-header);
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--fg-color);
  padding-inline: var(--layout-padding);
  align-items: center;
  padding: 16px;
  color: var(--color-fg);
  background: var(--color-bg);

  a {
    color: var(--color-fg);
  }
`

const footerTextWrapperStyle = css`
  font-size: small;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-block: 8px;

  p {
    font-size: small;
    margin: 0;
    padding: 0;
  }
`

export function Footer() {
  return (
    <footer css={footerStyle}>
      <p>Copyright © 2025 Joseph Phelan.</p>
      <div css={footerTextWrapperStyle}>
        <a
          href="https://github.com/joephela/2024-github-base"
          rel="noreferrer"
          target="_blank"
        >
          Check out the code!
        </a>
      </div>
    </footer>
  )
}
