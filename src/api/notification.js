import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/notification/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function read(id) {
  return request({
    url: '/notification/read',
    method: 'get',
    params: { id }
  })
}
