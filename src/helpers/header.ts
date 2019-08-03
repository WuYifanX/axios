import { isPlainObject } from './utils'

const JSON_HEADER = 'application/json;charset=utf-8'
const headerConstant = {
  contentType: 'Content-Type'
}

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (headers === {}) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  if (!headers) {
    headers = {}
  }

  normalizeHeaderName(headers, headerConstant.contentType)

  if (isPlainObject(data)) {
    if (!headers[headerConstant.contentType]) {
      headers[headerConstant.contentType] = JSON_HEADER
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  debugger
  let result = Object.create(null)

  if (!headers) {
    return result
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')

    key = key.trim().toLowerCase()
    if (!key) return

    if (val) {
      val = val.trim()
    }

    result[key] = val
  })
  return result
}
