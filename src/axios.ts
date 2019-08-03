import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'
import buildURL from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'

const axios = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config)
}

const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformURL(config)
  config.headers = transformHeader(config)
  config.data = transformRequestData(config)
}

const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url, params)
}

const transformRequestData = (config: AxiosRequestConfig): any => {
  return transformRequest(config.data)
}

const transformHeader = (config: AxiosRequestConfig) => {
  const { headers, data } = config
  return processHeaders(headers, data)
}

export default axios
