import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/domain/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function update(data) {
  return request({
    url: '/domain/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/domain/add',
    method: 'post',
    data
  })
}

export function del(domain) {
  return request({
    url: '/domain/delete',
    method: 'get',
    params: { domain }
  })
}

export function delAll(domain, option) {
  return request({
    url: '/domain/delete',
    method: 'get',
    params: { domain, option }
  })
}

export function findByOwner(page, limit, owner) {
  return request({
    url: '/domain/findByOwner',
    method: 'get',
    params: { page, limit, owner }
  })
}

export function findByDomain(page, limit, domain) {
  return request({
    url: '/domain/findByDomain',
    method: 'get',
    params: { page, limit, domain }
  })
}

export function webScan(param) {
  return request({
    url: '/domain/webScan',
    method: 'get',
    params: { param }
  })
}

export function getWebInfo(param) {
  return request({
    url: '/domain/getWebInfo',
    method: 'get',
    params: { param }
  })
}
