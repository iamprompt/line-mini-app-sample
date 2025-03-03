export const getStatelessToken = async () => {
  const response = await fetch('https://api.line.me/oauth2/v3/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.LINE_CHANNEL_ID,
      client_secret: process.env.LINE_CHANNEL_SECRET,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get access token')
  }

  const json = await response.json()
  return json.access_token as string
}

export const getServiceNotificationToken = async (liffAccessToken: string) => {
  // Get Stateless Channel Access Token
  const statelessToken = await getStatelessToken()

  const response = await fetch(
    'https://api.line.me/message/v3/notifier/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${statelessToken}`,
      },
      body: JSON.stringify({
        liffAccessToken,
      }),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to get service notification token')
  }

  const json = await response.json()

  return json.notificationToken as string
}

export const sendServiceMessage = async (
  notificationToken: string,
  payload: {
    templateName: string
    params: Record<string, string>
  },
) => {
  // Get Stateless Channel Access Token
  const statelessToken = await getStatelessToken()

  const response = await fetch(
    'https://api.line.me/message/v3/notifier/send?target=service',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${statelessToken}`,
      },
      body: JSON.stringify({
        ...payload,
        notificationToken,
      }),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to send service message')
  }

  return response.json()
}

export const verifyAccessToken = async (
  accessToken: string,
  expectedChannelId?: string,
) => {
  const response = await fetch(
    `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`,
  )

  if (!response.ok) {
    throw new Error('Failed to verify access token')
  }

  const json = await response.json()

  if (expectedChannelId && json.client_id !== expectedChannelId) {
    throw new Error('Invalid access token')
  }

  return json
}
