import { ReactNode } from 'react'

export type LIFFContextValue = {
  isReady: boolean
  isLoggedIn: boolean
}

export type LIFFProviderProps = {
  children: ReactNode
  liffId: string
}
