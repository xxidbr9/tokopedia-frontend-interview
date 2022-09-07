/// <reference types="redux-persist" />

import { Store } from 'redux'

export type ActionRedux<T, P> = {
  type: T
  payload?: P
  error?: Error
}

declare module 'next/dist/shared/lib/utils' {
  export interface NextPageContext<S extends Store = any> {
    store: S
  }
}
