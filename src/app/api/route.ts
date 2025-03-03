export const POST = (req: Request) => {
  return new Response('Hello, world!', {
    headers: { 'content-type': 'text/plain' },
  })
}
