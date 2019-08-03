import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import buildURL from './helpers/url'
import { transformRequest, transformData } from './helpers/data'
import { processHeaders } from './helpers/header'

const axios = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config).then(response => {
    return transformResponse(response)
  })
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

const transformResponse = (response: AxiosResponse): AxiosResponse => {
  response.data = transformData(response.data)
  return response
}

export default axios
