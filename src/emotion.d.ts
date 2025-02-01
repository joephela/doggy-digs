import { CSSObject, SerializedStyles } from '@emotion/react'

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?:
      | CSSObject
      | SerializedStyles
      | (CSSObject | SerializedStyles | boolean)[]
  }
}
