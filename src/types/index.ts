export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'update'
  | 'UPDATE'
  | 'delete'
  | 'DELETE'
  | 'option'
  | 'OPTION'

export interface AxiosRequestConfig {
  url: string
  method: Method
  data: any
  param: any
}
