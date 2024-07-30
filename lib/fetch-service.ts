/**
 * @description InterceptorManage 拦截器，模仿axios实现
 */
type FullFilledHandler<T> = (data: T) => T | Promise<T>
type RejectedHandler = (err: Error) => any
type InterceptorHandler<T> = {
  fulfilled: FullFilledHandler<T>
  rejected?: RejectedHandler
}
class InterceptorManage<T> {
  public handlers: Array<InterceptorHandler<T> | null>
  constructor() {
    this.handlers = []
  }
  use(fulfilled: FullFilledHandler<T>, rejected?: RejectedHandler) {
    this.handlers.push({
      fulfilled,
      rejected,
    })
    return this.handlers.length - 1
  }
  eject(index: number) {
    if (this.handlers[index]) {
      this.handlers[index] = null
    }
  }
}
/**
 * @description FetchService 封装RESTful请求，实现请求、响应的拦截器功能
 */
class FetchService {
  // interceptors
  public interceptors
  constructor() {
    this.interceptors = {
      request: new InterceptorManage<Request>(),
      response: new InterceptorManage<Response>(),
    }
  }
  // GET example: /url/1 or /url?page=1&size=10
  get<T = any>(url: string): Promise<ServiceBasicResponse<T>> {
    return this._request('GET', url)
  }
  // POST example: /url
  post<T = any>(url: string, body: any): Promise<ServiceBasicResponse<T>> {
    return this._request('POST', url, body)
  }
  // PUT example: /url/1
  put<T = any>(url: string, body: any): Promise<ServiceBasicResponse<T>> {
    return this._request('PUT', url, body)
  }
  // PATCH example: /url/1
  patch<T = any>(url: string, body: any): Promise<ServiceBasicResponse<T>> {
    return this._request('PATCH', url, body)
  }
  // DELETE example: /url/1 or /url?ids=1,2,3
  delete<T = any>(url: string): Promise<ServiceBasicResponse<T>> {
    return this._request('DELETE', url)
  }

  // add interceptor for request
  addRequestInterceptor(fulfilled: FullFilledHandler<Request>, rejected?: RejectedHandler) {
    this.interceptors.request.use(fulfilled, rejected)
  }
  // add interceptor for response
  addResponseInterceptor(fulfilled: FullFilledHandler<Response>, rejected?: RejectedHandler) {
    this.interceptors.response.use(fulfilled, rejected)
  }
  private async dispatchRequest(request: Request): Promise<Response> {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  }
  // send request
  private async _request(method: string, url: string, body?: any): Promise<any> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (body) {
      options.body = JSON.stringify(body)
    }
    const request = new Request(url, options)
    const chain: Array<any> = [this.dispatchRequest, undefined]
    this.interceptors.request.handlers.forEach((handler) => {
      if (handler) {
        chain.unshift(handler.fulfilled, handler.rejected)
      }
    })
    this.interceptors.response.handlers.forEach((handler) => {
      if (handler) {
        chain.push(handler.fulfilled, handler.rejected)
      }
    })
    let promise = Promise.resolve(request)
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }
    return promise
  }
}
const fetchService = new FetchService()
fetchService.addRequestInterceptor((request: Request) => {
  return request
})
fetchService.addResponseInterceptor(
  async (response: Response) => {
    const data = await response.json()
    return data
  },
  (err: Error) => {
    return err
  },
)
export { FetchService }
export default fetchService
