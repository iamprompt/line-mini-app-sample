'use client'

import { ReactNode } from 'react'

import { LIFFProvider } from '@/lib/line/liff'

export const Providers = ({
  children,
  liffId,
}: {
  children: ReactNode
  liffId: string
}) => {
  return <LIFFProvider liffId={liffId}>{children}</LIFFProvider>
}
