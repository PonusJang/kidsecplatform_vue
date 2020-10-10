import request from '@/utils/request'

export function getList() {
  return request({
    url: '/notification/getList',
    method: 'get'

  })
}
