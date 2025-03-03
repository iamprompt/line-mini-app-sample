declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: string
      LIFF_ID: string
      LINE_CHANNEL_ID: string
      LINE_CHANNEL_SECRET: string
    }
  }
}

export {}
