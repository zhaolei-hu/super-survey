const responseResult = (success: boolean, data: any, msg: string | null) => {
  return Response.json({
    success,
    data,
    msg,
  })
}
const successWithMsg = (msg: string | null) => {
  return responseResult(true, null, msg)
}
const successWithData = (data: any, msg: string | null) => {
  return responseResult(true, data, msg)
}
const failWithMsg = (msg: string | null) => {
  return responseResult(false, null, msg)
}
const failWithData = (data: any, msg: string | null) => {
  return responseResult(false, data, msg)
}

export { successWithData, successWithMsg, failWithData, failWithMsg }
