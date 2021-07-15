import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/osint/cpe/getList',
    method: 'get',
    params: {page, limit}
  })
}

export function push(id) {
  return request({
    url: '/osint/cpe/push',
    method: 'get',
    params: {id}
  })
}

export function check(id) {
  return request({
    url: '/osint/cpe/check',
    method: 'get',
    params: {id}
  })
}
