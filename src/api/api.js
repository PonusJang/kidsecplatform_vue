import request from '@/utils/request'

export function getApiMenu() {
  return request({
    url: '/api/getApiMenu',
    method: 'get'
  })
}
