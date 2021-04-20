import request from './network'
import {
  K_config
} from './config'

export function loginByTourist() {
  return request({
    url: K_config.API_touristLogin_URL,
    method: 'GET'
  })
}