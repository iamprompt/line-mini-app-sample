import liff from '@line/liff'
import { createContext, useCallback, useEffect, useState } from 'react'

import { LIFFContextValue, LIFFProviderProps } from './types'

const defaultLIFFContextValue: LIFFContextValue = {
  isReady: false,
  isLoggedIn: false,
}

const liffContext = createContext<LIFFContextValue>(defaultLIFFContextValue)

const useLIFFContextValue = ({
  liffId,
}: Omit<LIFFProviderProps, 'children'>) => {
  const [isReady, setIsReady] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const initLIFF = useCallback(async () => {
    await liff.init({ liffId })
    setIsReady(true)

    if (!liff.isLoggedIn()) {
      return liff.login()
    }

    setIsLoggedIn(true)
  }, [liffId])

  useEffect(() => {
    initLIFF()
  }, [initLIFF])

  return {
    isReady,
    isLoggedIn,
  }
}

export const LIFFProvider = ({ children, liffId }: LIFFProviderProps) => {
  if (!liffId) {
    throw new Error('LIFF ID is required for initializing LIFF SDK')
  }

  const value = useLIFFContextValue({ liffId })

  return <liffContext.Provider value={value}>{children}</liffContext.Provider>
}
