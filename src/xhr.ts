import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  console.log(config)
  const { data = null, method = 'get', url, headers } = config
  const XMLRequest = new XMLHttpRequest()
  XMLRequest.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    // empty data do not need content-type headers
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      XMLRequest.setRequestHeader(name, headers[name])
    }
  })

  XMLRequest.send(data)
}
