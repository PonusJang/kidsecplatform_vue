import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/ip/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function update(data) {
  return request({
    url: '/ip/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/ip/add',
    method: 'post',
    data
  })
}

export function del(ip) {
  return request({
    url: '/ip/delete',
    method: 'get',
    params: { ip }
  })
}

export function findByIP(page, limit, ip) {
  return request({
    url: '/ip/findByIp',
    method: 'get',
    params: { page, limit, ip }
  })
}

export function findByPort(page, limit, port) {
  return request({
    url: '/ip/findByPort',
    method: 'get',
    params: { page, limit, port }
  })
}

export function findByService(page, limit, service) {
  return request({
    url: '/ip/findByService',
    method: 'get',
    params: { page, limit, service }
  })
}

export function searchIP(data) {
  return request({
    url: '/ip/search',
    method: 'post',
    data
  })
}

export function hostScan(param) {
  return request({
    url: '/ip/hostScan',
    method: 'get',
    params: { param }
  })
}

export function portScan(param) {
  return request({
    url: '/ip/portScan',
    method: 'get',
    params: { param }
  })
}
