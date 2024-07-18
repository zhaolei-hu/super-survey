export async function GET() {
  return Response.json({
    message: 'success',
    success: true,
    data: {
      name: '123',
    },
  })
}
