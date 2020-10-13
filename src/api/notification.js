import request from '@/utils/request'

export function getList() {
  return request({
    url: '/notification/getList',
    method: 'get'

  })
}

export function read(id) {
  return request({
    url: '/notification/read',
    method: 'get',
    params: { id }
  })
}
