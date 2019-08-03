import { isPlainObject } from './utils'

export const transformRequest = (data: any) => {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export const transformData = (data: any) => {
  let result
  if (typeof data === 'string') {
    try {
      result = JSON.parse(data)
    } catch (e) {
      //
    }
  }
  return result
}
