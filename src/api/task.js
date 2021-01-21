import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/task/getList',
    method: 'get',
    params: {page, limit}
  })
}

export function del(name,isCron) {
  return request({
    url: '/task/delete',
    method: 'get',
    params: {name,isCron}
  })
}

export function findByName(page, limit, name) {
  return request({
    url: '/task/findByIp',
    method: 'get',
    params: {page, limit, name}
  })
}

export function findByService(page, limit, service) {
  return request({
    url: '/task/findByService',
    method: 'get',
    params: {page, limit, service}
  })
}

export function add(data) {
  return request({
    url: '/task/add',
    method: 'post',
    data
  })
}

export function getResultList(page, limit) {
  return request({
    url: '/task/getResultList',
    method: 'get',
    params: {page, limit}
  })
}

export function findResultByIP(page, limit, ip) {
  return request({
    url: '/task/findResultByIP',
    method: 'get',
    params: {page, limit, ip}
  })
}

export function findResultByPort(page, limit, port) {
  return request({
    url: '/task/findResultByPort',
    method: 'get',
    params: {page, limit, port}
  })
}

export function check(data) {
  return request({
    url: '/task/check',
    method: 'post',
    data
  })
}
