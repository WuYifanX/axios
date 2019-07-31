import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  console.log(config)
  const { data = null, method = 'get', url } = config
  const XMLRequest = new XMLHttpRequest()
  XMLRequest.open(method.toUpperCase(), url, true)
  XMLRequest.send(data)
}
