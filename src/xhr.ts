import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { resolve } from 'dns'
import { parseHeaders } from './helpers/header'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, method = 'get', url, headers, responseType } = config
    const XMLRequest = new XMLHttpRequest()

    if (responseType) {
      XMLRequest.responseType = responseType
    }

    XMLRequest.open(method.toUpperCase(), url, true)

    XMLRequest.onreadystatechange = function handleLoad() {
      if (XMLRequest.readyState !== 4) {
        return
      }

      const responseHeader = parseHeaders(XMLRequest.getAllResponseHeaders())

      const responseData =
        XMLRequest.responseType === 'text'
          ? XMLRequest.responseText
          : XMLRequest.response

      const response: AxiosResponse = {
        data: responseData,
        status: XMLRequest.status,
        statusText: XMLRequest.statusText,
        headers: responseHeader,
        config,
        request: XMLHttpRequest
      }

      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      // empty data do not need content-type headers
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        XMLRequest.setRequestHeader(name, headers[name])
      }
    })

    XMLRequest.send(data)
  })
}
