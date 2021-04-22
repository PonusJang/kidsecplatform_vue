import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/result2/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function getAllList() {
  return request({
    url: '/result2/getAllList',
    method: 'get'
  })
}

export function findByAssets(page, limit, assets) {
  return request({
    url: '/result2/findByAssets',
    method: 'get',
    params: { page, limit, assets }
  })
}

export function findByIp(page, limit, ip) {
  return request({
    url: '/result2/findByIp',
    method: 'get',
    params: { page, limit, ip }
  })
}

export function findByMonth(page, limit, month) {
  return request({
    url: '/result2/filterByMonth',
    method: 'get',
    params: { page, limit, month }
  })
}
