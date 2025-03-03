import {
  getServiceNotificationToken,
  sendServiceMessage,
  verifyAccessToken,
} from '@/lib/line/helper'

export const POST = async (req: Request) => {
  // Extract LIFF access token from request headers
  const liffAccessToken = req.headers.get('x-liff-access-token')

  if (!liffAccessToken) {
    return Response.json(
      { error: 'LIFF access token is required' },
      { status: 400 },
    )
  }

  try {
    await verifyAccessToken(liffAccessToken, process.env.LINE_CHANNEL_ID)

    const body = await req.json()

    // Get Service Notification Token
    const notificationToken = await getServiceNotificationToken(liffAccessToken)

    // Send a service message
    const response = await sendServiceMessage(notificationToken, {
      templateName: 'join_d_m_en',
      params: {
        entry_date: new Date().toLocaleDateString(),
        btn1_url: 'https://line.me',
      },
    })

    console.log(response)

    return Response.json({
      message: 'Service message sent successfully',
    })
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 })
  }
}
