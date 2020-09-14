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

export function findByMonth(page, limit, month) {
  return request({
    url: '/result2/flterByDate',
    method: 'get',
    params: { page, limit, month }
  })
}
