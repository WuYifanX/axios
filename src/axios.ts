import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import buildURL from './helpers/url'

const axios = (config: AxiosRequestConfig): void => {
  processConfig(config)
  xhr(config)
}

const processConfig = (config: AxiosRequestConfig) => {
  config.url = transformURL(config)
}

const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
