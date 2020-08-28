import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/table/list',
    method: 'get',
    data: { params }
  })
}
