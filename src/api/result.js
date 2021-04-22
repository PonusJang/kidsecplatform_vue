import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/result/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function findByParam(page, limit, param) {
  return request({
    url: '/result/findByParam',
    method: 'get',
    params: { page, limit, param }
  })
}

export function filterByDate(page, limit, minDate, maxDate) {
  return request({
    url: '/result/filterByDate',
    method: 'get',
    params: { page, limit, minDate, maxDate }
  })
}

export function findByStatus(page, limit, status) {
  return request({
    url: '/result/findByStatus',
    method: 'get',
    params: { page, limit, status }
  })
}

