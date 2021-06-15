import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/assets/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function update(data) {
  return request({
    url: '/assets/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/assets/add',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/assets/delete',
    method: 'get',
    params: { id }
  })
}

export function findByOwner(page, limit, owner) {
  return request({
    url: '/assets/findByOwner',
    method: 'get',
    params: { page, limit, owner }
  })
}

export function findByIP(page, limit, ip) {
  return request({
    url: '/assets/findByIP',
    method: 'get',
    params: { page, limit, ip }
  })
}

export function findByName(page, limit, name) {
  return request({
    url: '/assets/findByName',
    method: 'get',
    params: { page, limit, name }
  })
}

export function findByType(page, limit, type) {
  return request({
    url: '/assets/findByType',
    method: 'get',
    params: { page, limit, type }
  })
}

export function addFromExcel(data) {
  return request({
    url: '/assets/addFromExcel',
    method: 'post',
    data
  })
}

export function hostScan(host) {
  return request({
    url: '/assets/hostScan',
    method: 'get',
    params: { host }
  })
}

export function portScan(host) {
  return request({
    url: '/assets/portScan',
    method: 'get',
    params: { host }
  })
}

export function getDetail(host) {
  return request({
    url: '/assets/',
    method: 'get',
    params: { host }
  })
}
